# Power Harvesting

[Power banks](https://docs.screeps.com/api/#StructurePowerBank) spawn in highways. Each power bank has 2,000,000 hitpoints and contains 500-10,000 units of power. They are not protected by creeps, but will return 50% of the damage dealt. We need to first attack the power bank, then haul the dropped power back to base. This will be a coordinated mission.

## Attacking the Power Bank

Let's begin by assuming we're using unboosted minions.

We'll crack the power bank with `ATTACK` creeps. Each `ATTACK` part deals 30 damage, which means the bank will be returning 15 damage. It will take `2,000,000 / 30 = 66,667` hits from an attack part to finish the job.

Our attackers will be complemented by a healer to balance the power bank's return damage. Heal parts only heal 12 per tick, irritatingly, so we need 5 `HEAL` to compensate for the return damage for every 4 `ATTACK` parts. The attack and heal actions [conflict with each other](https://docs.screeps.com/simultaneous-actions.html), so it works best to have these be separate minions.

The obvious build would try to balance `MOVE` parts to move our duo at one tile per tick, but depending on the range of the power bank, it may be more efficient to move every other tick and have more `ATTACK` parts while the duo remains at work.

Let's say the power bank is 200 tiles away from base. If they have 22A/28H/50M between them, the duo spends 200 ticks traveling, then the remaining 1300 ticks attacking the power bank. `22 ATTACK * 30 dmg * 1300 ticks = 858k dmg` 

If they move at half speed instead, we can distribute the parts as 29A/37H/34M. The duo spends 400 ticks traveling, then the remaining 1100 ticks attacking the power bank. `29 ATTACK * 30 dmg * 1100 ticks = 957k dmg`

If they move at one tile every three ticks, we can distribute the parts as 33A/42H/25M. The duo spends 600 ticks traveling, then the remaining 900 ticks attacking the power bank. `33 ATTACK * 30 dmg * 900 ticks = 891k dmg`

So our actual build will vary depending on the distance of the power bank. We'll also use this to calculate the number of duos we'll need to crack the bank.

## Exfiltrating the Power

We'll need to spawn enough haulers to move the power back to base. This is the easy part; they just need to spawn far enough ahead of time to be on hand when the bank breaks. At most, we'll need eight unboosted haulers to handle 10,000 units of power - again, we'll spawn based on the actual quantity available. The haulers can recycle after depositing power back at base.

## Competition

Other bots also try to harvest power banks. When competition is detected, we can either yield, abandoning our claim; contest it, committing more resources to fight off their harvesters; or scalp it, letting them break the power bank and then swooping in to fight off their haulers and steal the power.

For now, we'll attempt to contest with just the duos we have. If that fails, we'll abandon the claim.

## Cost Estimation

It's fairly straightforward to estimate the cost to crack a power bank - it's just the cost of the duos and haulers (minus whatever can be recovered from the haulers after recycling).

This should be compared with the current market cost of power to determine if a power bank is worth cracking.

If it is, the analysis (including the path distance, the number of duos and haulers to commit, and estimated cost of power recovered) should be converted to an order that can generate SquadMissions.

## Adding Boosts

Currently, cracking a power bank takes 2-4 duos depending on distance. With boosts, we can reduce that to a single duo, depending on distance:

| Boosts | Build       | Damage/tick | Healing/tick | Time to crack |
| ------ | ----------- | ----------- | ------------ | ------------- |
| T1     | 33M/29A/37H | 1,740       | 888          | 1,150 ticks   |
| T2     | 25M/33A/42H | 2,970       | 1,512        | 674 ticks     |
| T3     | 20M/35A/45H | 4,200       | 2,160        | 477 ticks     |

This is without `TOUGH` - but boosts give `TOUGH` parts damage reduction, which means we need fewer `HEAL` parts for the same number of `ATTACK` parts. 

I tried to work out a formula for this, but gave up and wrote a simulator script to calculate the best builds (max attack damage and cheapest body where healing keeps up with power bank return damage) instead. Results:

| Boosts | Build          | Damage/tick (mitigated) | Healing/tick | Time to crack |
| ------ | -------------- | ----------------------- | ------------ | ------------- |
| T1     | 3T/33M/30A/33H | 1,800 (1,671)           | 792          | 1112 ticks    |
| T2     | 3T/24M/34A/35H | 3,060 (2,760)           | 1,260        | 654 ticks     |
| T3     | 2T/20M/38A/38H | 4,560 (4,093)           | 1,824        | 439 ticks     |

This doesn't significantly reduce the time to crack, but it does make our builds more energy-efficient - a HEAL part costs 25 times more than a `TOUGH` part,

What if we boost haulers too?

| Boosts | Build   | Carry capacity | Max haulers |
| ------ | ------- | -------------- | ----------- |
| T1     | 17M/33C | 3,300          | 3 (maybe 4) |
| T2     | 12M/36C | 5,400          | 2           |
| T3     | 10M/40C | 8,000          | 2           |

If the total to haul is greater than 5,400 but less than 8,000, T3 boosts let us send a single hauler instead of two; otherwise, we should aim for at most T2 boosts.

### Counting the Cost

Now, is it *worth* it to spend resources boosting power bank creeps? This depends on the relative value of power, minerals, energy, spawn time, and CPU.

As a hard baseline, if you can sell the energy + minerals it will take to harvest the power for more than it would cost to buy the power, it is obviously not worthwhile to run the mission.

But there are different configurations: we could send multiple unboosted duos, or a single boosted duo with T1, T2, or T3 boosts. Likewise, we could boost the haulers (or not). Boosts may be costly, but will save energy (fewer parts needed) and spawn time.

Let's pick an example based on current market prices. We'll assume the power bank has an average of 5,000 power.

| Resource       | Price     |
| -------------- | --------- |
| Energy         | 15.463cr  |
| UH (Attack)    | 55.646cr  |
| LO (Heal)      | 42.509cr  |
| ZO (Move)      | 34.219cr  |
| GO (Tough)     | 8.828cr   |
| KH (Carry)     | 45.243cr  |
| UH20 (Attack)  | 13.369cr  |
| LHO2 (Heal)    | 100.298cr |
| ZHO2 (Move)    | 74.188cr  |
| GHO2 (Tough)   | 108.048cr |
| KH2O (Carry)   | 13.205cr  |
| XUH20 (Attack) | 68.416cr  |
| XLHO2 (Heal)   | 126.839cr |
| XZHO2 (Move)   | 210.601cr |
| XGHO2 (Tough)  | 177.241cr |
| XKH2O (Carry)  | 371.099cr |
| Power          | 238.662cr |

Three unboosted duos costs 33,780 energy and 900 spawn-ticks. Four unboosted haulers costs 10,000 energy and 600 spawn-ticks. This is a total of 43,780 energy, or a grand total of 676,970.14 credits. This means our 5,000 units of power must be worth more than 135.39 credits per unit - and, indeed, they are.

One T1 boosted duo costs 8,250 energy + 1,980 energy to boost + 42,083.91 credits worth of boosts and 300 spawn-ticks. If we boost the haulers as well (50C/25M total), they'll cost 3,750 energy + 1,500 energy to boost + 93,528.75 credits worth of boosts. This is a total of 17,230 energy, and a grand total of 239,367.24 credits.

One T2 boosted duo costs 12,700 energy + 1,920 energy to boost + 182,088.96 credits worth of boosts and 288 spawn-ticks. If we boost the haulers as well (34C/12M total), they'll cost 2300 energy + 920 energy to boost + 40,176.78 credits worth of boosts and 138 spawn-ticks. This is a total of 17,840 energy, and a grand total of 498,125.66 credits.

One T3 boosted duo costs 13,560 energy + 1,960 energy to boost + 359,585.76 credits worth of boosts and 294 spawn-ticks. If we boost the haulers as well (25C/7M total), they'll cost 1,600 energy + 640 energy to boost + 322,550.46 credits worth of boosts and 96 spawn-ticks. This is a total of 17,760 energy, and a grand total of 956,759.10 credits.

Now, this analysis has some issues - we're assuming that we scale the haulers down to size, but the duos aren't being scaled at all. Depending on how much time we have to crack the power bank (how far away it is, power bank ticks to live) we could get by with smaller duos (and fewer boosts).

T1 boosts still take 1112 ticks to crack the bank. Allowing for 200 ticks to boost the creep, that gives just under 200 ticks of movement. 
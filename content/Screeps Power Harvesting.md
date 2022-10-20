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

Other bots 
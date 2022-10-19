# Power Harvesting

[Power banks](https://docs.screeps.com/api/#StructurePowerBank) spawn in highways. Each power bank has 2,000,000 hitpoints and contains 500-10,000 units of power. They are not protected by creeps, but will return 50% of the damage dealt. We need to first attack the power bank, then haul the dropped power back to base. This will be a coordinated mission.

## Attacking the Power Bank

Let's begin by assuming we're using unboosted minions.

We'll crack the power bank with ATTACK creeps. Each ATTACK part deals 30 damage, which means the bank will be returning 15 damage. It will take `2,000,000 / 30 = 66,667`
# Economy

There are three primary currencies in Screeps: energy, CPU, and spawn time.

**Energy** is harvested from sources and used to spawn creeps, build structures, upgrade the controller, or pay for boosts/terminal transfers/link transfers/etc.

**CPU** is generally a fixed amount, derived from GCL (except on shard3 or some private servers), and limits the number of actions creeps can take (due to the 0.2cpu intent cost).

**Spawn time** is a restriction of the time each creep part takes to spawn and the creep's total lifetime. Assuming perfect efficiency refilling spawns/extensions, each spawn can support `CREEP_LIFE_TIME / CREEP_SPAWN_TIME = 1500 / 3 = 500` creep parts, total.

The goal of the economy system is to maximize the amount of energy being harvested and used given the constraints of CPU and spawn time.

## Economy Phases

There are two primary economy phases: before and after storage. 
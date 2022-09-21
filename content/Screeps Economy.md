# Economy

There are three primary currencies in Screeps: energy, CPU, and spawn time.

**Energy** is harvested from sources and used to spawn creeps, build structures, upgrade the controller, or pay for boosts/terminal transfers/link transfers/etc.

**CPU** is generally a fixed amount, derived from GCL (except on shard3 or some private servers), and limits the number of actions creeps can take (due to the 0.2cpu intent cost).

**Spawn time** is a restriction of the time each creep part takes to spawn and the creep's total lifetime. Assuming perfect efficiency refilling spawns/extensions, each spawn can support `CREEP_LIFE_TIME / CREEP_SPAWN_TIME = 1500 / 3 = 500` creep parts, total.

The goal of the economy system is to maximize the amount of energy being harvested and used given the constraints of CPU and spawn time.

## Economy Phases and Storage

Storage structures can hold up to a million energy. This means that RCL4 changes the game dramatically. The pre-RCL4 economy is a very small part of the game, but may be significant in [BotArena-type competitions.](https://screepspl.us/events/) 

Storage provides a buffer in case energy production significantly outpaces consumption (or vice versa). Until the storage is built, production and consumption need to be balanced. If more energy is produced than used, it will decay, meaning that energy, CPU, and spawn time are being wasted. If not enough energy is being produced, creeps will be unable to work, and energy/CPU/spawn time will again be wasted.

Once the storage is built, this is less of an issue: excess energy can be shunted to storage, and then consumption can be scaled up to use that excess. 


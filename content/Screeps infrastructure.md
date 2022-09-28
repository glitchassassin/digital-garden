# Infrastructure

Structures will be considered from three angles: planning, building, and repairing.

## Room Planning

The goal of room planning is to optimize placement of structures based on the competing priorities of economy and defense.

## Building

Structures should generally be built as soon as they come available at a given RCL. There are a few exceptions:

1. Drop-mining containers (remote or in-room) generally don't need to be built before RCL3. Containers reduce loss, but getting to reservers will boost income and so extensions are a higher priority. Once income is being maximized with reservers, roads & containers at sources will reduce losses and improve hauler efficiency.
2. The initial three labs are not very useful at RCL6 - it's probably worth waiting until RCL7 when you can build six instead. See [discussion in #botarena.](https://discord.com/channels/860665589738635336/865974501505237022/1002953782407221308)

Barriers (walls and ramparts) can have a maximum of 300M hitpoints, but it usually makes sense to maintain these at a lower threshold. A good active defense will repair barriers as they are attacked, so the barrier just needs to hold until a repairer is spawned. A T3 boosted dismantler quad (two dismantlers + two healers) can tear down 12,300 hitpoints per tick, and a correspondingly boosted repairer takes 150 ticks to spawn. Double that to 300 ticks to give some wiggle room to finish the last job and boost the repairer, and we come up with a threshold of about 4 million hits. Triple that for safety (we could be attacked by multiple quads) and 12-15 million hits is probably a reasonable barrier threshold at RCL8.

## Repairing

Some structures decay with time and/or use: roads, containers, and ramparts. Other structures take damage when attacked by enemy creeps, invaders, or nukes.

Maintenance generally ought to be prioritized above new construction. Otherwise, during expensive build phases, roads and ramparts will decay completely, resulting in a loss of efficiency or vulnerability to attack.

Maintenance tasks should also be prioritized:

1. Maintaining barriers - if the enemy can get inside our perimeter, repairing will be the least of our concerns.
2. Maintaining economy structures - these are critical to ongoing energy production, and will hamper repair efforts if not addressed. This includes roads, containers, links, spawns, extensions, etc.
3. Maintaining other structures - Factory, observer, etc. do not directly impact energy production and are relegated to the end of the queue.
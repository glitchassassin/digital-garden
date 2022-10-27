# Fastfiller Logic

A Fastfiller is a stamp with three spawns, a link, two containers, fifteen extensions, and four filler creeps. This makes it easy to rapidly refill extensions to minimize spawn downtime.

![[images/Screeps fastfiller.png]]

Naively, haulers deposit energy in the outside containers, and any source links transfer to the central link; then the filler creeps withdraw from one of the three storages and transfer to adjacent empty extensions/spawns.

Before the fastfiller is complete, however, the right-hand creeps don't have as many extensions to fill. Sometimes the left-hand container will run out of energy first, and although there is energy in the right-hand container, those creeps can't refill the left-hand extensions. So, there's some optimization to be had in balancing the energy across the fastfiller *through* the middle extensions.

In addition, the creeps should deposit energy from the link into the containers, once the extensions are full; this allows more energy to be transferred by link (cheaper than haulers), and lets haulers direct their attention elsewhere.

At their largest, the creeps should have `SPAWN_ENERGY_CAPACITY + EXTENSION_ENERGY_CAPACITY[8]` capacity, so they can withdraw and transfer on the same tick to continuously transfer energy.

So the logic should look something like this:

- If the left container is lower than the right, the leftmost creeps act first; otherwise, the rightmost creeps do.
- For each creep:
	- If an adjacent structure (besides the link) needs energy:
		- If there is unclaimed energy in the link, withdraw and claim the energy.
		- Otherwise, if the opposite container is more than EXTENSION_CAPACITY higher than this container, withdraw from the center extension
		- Otherwise, if the container is not the only structure that needs energy, withdraw and claim the energy from the container.
		- Transfer energy to an adjacent structure, preferring spawns, then extensions with no other filler, then extensions *with* another filler, then the container. If our container has the lowest level, *don't* fill the center extension.

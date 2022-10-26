# Fastfiller Logic

A Fastfiller is a stamp with three spawns, a link, two containers, fifteen extensions, and four filler creeps. This makes it easy to rapidly refill extensions to minimize spawn downtime.

![[Pasted image 20221026161024.png]]

Naively, haulers deposit energy in the outside containers, and any source links transfer to the central link; then the filler creeps withdraw from one of the three storages and transfer to adjacent empty extensions/spawns.

Before the fastfiller is complete, however, the right-hand creeps don't have as many extensions to fill. Sometimes the left-hand container will run out of energy first, and although there is energy in the right-hand container, those creeps can't refill the left-hand extensions. So, there's some optimization to be had in balancing the energy across the fastfiller *through* the middle extensions.


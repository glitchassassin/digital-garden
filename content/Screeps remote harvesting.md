# Remote Harvesting

The standard approach to remote harvesting is to build containers next to the source and drop-harvest into the containers. Roads from the main room to the remote source make dedicated haulers more efficient (the hauiler can move at 1 square/tick with 1M/2C instead of 2M/2C, saving energy and spawn time). If the harvester has 6 work parts, it can use its down time (when not harvesting) to repair the container, saving on sending a dedicated repairer.

An analysis originally posted in the Screeps slack, reposted by [Donatzor in the Discord](https://discord.com/channels/860665589738635336/864238310058754069/885907058581454880):

```
//since I am bored, I would like to audit the cost of remote mining
/*roles involved:
Miner 3M1C6W == 800e (2M1C3W for unreserved mining)
Hauler n*(1M2C) == 150e * n
Reserver 1M2Cl == 1250e (0 for unreserved mining)
Guard 10M8R2H == 2200e
Repairer 10M7C3W == 1150e

structures involved:
roads & containers

ALL CALCULATION ARE BASED ON energy (e) PER TICK BASIS

Cost for each role involved:
Miner == 800e / (1500 - dist);

Hauler == 150e * n; //for 100 carryCapacity every n multiple
100 carryCapacity can serve single source for dist == 5
n == dist / 5;
A hauler can do m times round trip during 1500 ticks
m == Math.floor(1500 / (2 * dist)) == Math.floor(750 / dist);
where the remaining ticks, not enough to make a round trip,
is wasted.
The hauler is then effectively lived for
t == (2 * dist) * Math.floor(750 / dist);
cost == (150e * dist / 5) / ((2 * dist) * Math.floor(750 / dist));
cost == 15e / Math.floor(750 / dist);

Reserver reserves the controller for 2 * (600 - dist) ticks.
cost == 1250e / (2 * (600 - dist));
cost == 625e / (600 - dist);

A guard can guard for 9rooms while standing at the center room.
9 rooms can contain up to 12 sources.
cost == 2200e / (12 * 1500);
cost == 0.122e;

A repairer can repair the roads of 9 rooms while patrolling.
Assume the roads leading to 12 sources has been take care of.
cost == 1150e / (12 * 1500);
cost == 0.064e;

Miner should repair its own container.
Cost of container == 50e / 100 == 0.5e;

Cost of roads:
Number of roads involved == dist;
cost of natural decay == dist;
To calculate total decay, for each creep stepping on it,
The body size is divided by walking interval, times the dist.

Decay of miner stepping on it:
decay == 10 body every (1500 - dist) ticks;
decay == 10 * dist / (1500 - dist);

Decay of hauler stepping on it:
decay == 3 * n every tick
decay == 3 * dist / 5 == 0.6 * dist;

Decay of reserver stepping on it:
decay == 3 * dist every (2 * (600 - dist)) ticks
decay == 1.5 * dist / (600 - dist);

Guard and repairer should use off-road mode,
while performing their duty.
decay == 0;

Total decay == dist + 10 * dist / (1500 - dist) + 
				0.6 * dist + 1.5 * dist / (600 - dist);
Total decay == 1.6 * dist + 10 * dist / (1500 - dist) + 
				1.5 * dist / (600 - dist);
Total road cost == (1.6 * dist + 10 * dist / (1500 - dist) + 
				1.5 * dist / (600 - dist)) * 0.001e;

Summary:
The cost of remote mining per tick versus dist:
cost ==
800e / (1500 - dist) +
15e / Math.floor(750 / dist) +
625e / (600 - dist) +
0.122e +
0.064e +
0.5e +
(1.6 * dist + 10 * dist / (1500 - dist) + 
	1.5 * dist / (600 - dist)) * 0.001e;
	
cost == 
800e / (1500 - dist) +
15e / Math.floor(750 / dist) +
625e / (600 - dist) +
0.686e +
(1.6 * dist + 10 * dist / (1500 - dist) + 
	1.5 * dist / (600 - dist)) * 0.001e;
With hauler being major cost,
and the road costs about half of the miner cost.

Single source room
Dist  Cost   Efficiency
0     2.261  77%
50    3.455  65%
100   4.811  52%
150   5.909  41%
200   8.186  19%
250   8.515  15%
251   11.02  -10%(loss)
*Note: Efficiency is obtained by subtracting the cost from 10e
Mining speed is 10e per source.

Double source room (Reserver cost cut half)
Dist  Cost   Efficiency
0     1.740  82%
50    2.886  71%
100   4.186  58%
150   5.214  48%
200   7.404  26%
250   7.621  24%
251   10.12  -2.4%(loss)

source (without reserving it - doesn't matter single / double!)
Dist  Cost   Efficiency
0     1.019  80%
50    1.596  68%
100   2.245  55%
150   2.752  45%
200   3.832  23%
250   3.912  22%
251   5.164  -3.2%(loss)
*Note: Efficiency is obtained by subtracting the cost from 5e,
since without reserving, the mining speed is 5e.

Notice the great loss between dist == 250 and dist == 251
*/
Well, the conclusion, I leave it to yours
```

## Remote Defense

Invader cores will harass remotes, reserving the controller to lock the sources from being harvested. These are easy to defend against; they do not attack, so a simple guard creep with a pattern of 1A/1M can kill them with no trouble.

Harassment from other bots can be more expensive. If it costs more to defend a remote than the energy it brings in, it may be more economical to simply abandon the remote until it can be safely harvested again.

This can be tracked by measuring the energy spent on a remote (spawning, defense, repairing roads/containers, etc.) and comparing it to the energy brought back 
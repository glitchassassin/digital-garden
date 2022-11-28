# Factory Design

Expanding our factories requires a stock of parts. Ideally, these should be created automatically and dumped into storage containers so we can simply resupply when we're running low. Some of these parts are used to create other parts - Iron Rods to create Screws, Screws and Iron Plates to create Reinforced Iron Plates, etc.

Currently each Miner is producing 60 iron/minute. Two smelters per miner keeps up with this output rate. For now, let's create a compact Miner/Smelter pattern that we can reuse for each mine site.

Then we'll need a pattern for the factory itself to distribute the output of those Miners across Constructors that turn iron into parts. 
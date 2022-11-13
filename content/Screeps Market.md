# Market

Depending on room availability, you may or may not be able to claim and harvest all the minerals you need for your [[Screeps Labs|labs]]. You can instead purchase these (and many other resources) on the Market.

## Mechanics

You can place buy and sell orders, which other bots fill with `deal()`, or you can fill existing orders yourself. Placing an order costs credits and may not be immediate; filling an order with `deal()` is immediate, but in addition to the credit cost (for buying resources from a sell order), you pay the energy cost to transfer the resources.

## Pricing

Market price for resources can be useful for evaluating whether a mission is worthwhile. For example, if it will cost more to crack a power bank than to buy the same amount of power on the Market, then cracking the power bank is a bad investment.
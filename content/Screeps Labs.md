# Labs

Labs (and their most useful output, boosts) are one of the keys to unlocking high-level play. They serve two main functions: reacting, to create compounds from minerals; and boosting, to apply those compounds to creeps to amplify the effectiveness of their parts.

See the [resources](https://docs.screeps.com/resources.html) article for specifics about labs, resources, reactions, and boosts.

## Reactions

Each reaction takes two input labs and one output lab. Once the reaction runs, the output lab (not the input labs) goes on cooldown. That cooldown time varies by reaction, from 5 ticks to 160 ticks.

A simple initial approach is to have two designated input labs, making the rest outputs which the inputs will cycle through as the output labs cool down. In this example, the two central labs are the inputs and the outer ring are the outputs. Every lab can be accessed from the road through the middle:

![[Screeps Labs.png]]

A dedicated hauler can pick up the input resources from terminal/storage, fill the input labs, and then collect the output and haul it back, repeating as necessary.

## Boosts

Once labs have created boosts with reactions, a lab can apply the boost. It takes 30 units of the boost compound and 20 units of energy to boost a single creep part. A given lab can hold 3000 units of boost compound and 2000 units of energy, so it can boost up to 100 body parts with a full store (though it can only hold one type of compound at a time).

## Deciding to Boost

As an aside, it should be noted that boosting is not *always* the right answer. Evaluate the cost of the boosts vs. the extra energy, CPU, and spawn time to send multiple and/or larger creeps to achieve the same goal. If the boosts cost less (or unboosted creeps simply aren't viable), then use them - otherwise, take the cheaper route!
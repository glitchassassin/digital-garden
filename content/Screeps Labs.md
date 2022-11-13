# Labs

Labs (and their most useful output, boosts) are one of the keys to unlocking high-level play. They serve two main functions: reacting, to create compounds from minerals; and boosting, to apply those compounds to creeps to amplify the effectiveness of their parts.

See the [resources](https://docs.screeps.com/resources.html) article for specifics about labs, resources, reactions, and boosts.

## Reactions

Each reaction takes two input labs and one output lab. Once the reaction runs, the output lab (not the input labs) goes on cooldown. That cooldown time varies by reaction, from 5 ticks to 160 ticks.

A simple initial approach is to have two designated input labs, making the rest outputs which the inputs will cycle through as the output labs cool down. In this example, the two central labs are the inputs and the outer ring are the outputs. Every lab can be accessed from the road through the middle:

![](Pasted%20image%2020221113143149.png)

A dedicated hauler can pick up the input resources from terminal/storage, fill the input labs, and then collect the output and haul it back, repeating as necessary.

## Boosts

Once labs have created boosts with reactions, 
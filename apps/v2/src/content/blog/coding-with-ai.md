---
title: 'Coding with AI'
pubDate: '13 Mar 2026'
description: 'How I approach coding with AI'
topics:
  - software-engineering
draft: true
---

Many of difficult decisions of my life that involve high uncertainties are resolved with the question: Is there a way to approach it so that the outcome is positive, regardless what happen of the uncertain factors?

Few examples:

- Should I changed my job as a business analyst to a software engineer after spending four year as a business analyst?

  At that time, it's more common for people to switch from software engineer to be a business analyst as they gain experience, as dealing with client is perceived as a more senior role and often get paid better.

  I chose to switch my career, because I figured that even if I fail as a software engineer, the experience would make me a better business analyst, and I would always regret it if I never try.

- Should I move to Australia?

  I was comfortable living in Malaysia, and I'm someone that's always comfortable staying in the country forever.

  I decided to give it a try, because even if I hate Australia, having an oversea working experience would be valuable for my career.

- Should I use AI to code?

  AI seems like changing a lot recently. At times, it feels like learning how to use them might be a waste of time, because despite knowing they changes everything, how useful it is to learn how to use them _now_? Marketers and influencers are hyping AI, because that's their jobs, just like how they hyped up Web3 and NFT, and I'm so glad that I didn't waste time worry about them.

  But what if being good at using AI also makes me a good engineer? Creating structured documentations, validate technical plans, knowing when to create tests to make sure a logic is behaving as expected. Those are some of the important qualities (not all) of good software engineers. So I'm good at them, I'm making myself a better software engineer, regardless of what is the direction AI is going.

## My early experience

My experience with AI coding started with Cursor. At that time, it's just a smarter auto-complete to me where it would figure out where I want to edit next while I'm typing, so I can move around the code using `Tab` key instead of navigating manually.

Although it's possible to chat with AI to add feature, I seldom used it. Part of the reasons was I always put into a dilemma: how clear I should describe my requirements?

- If I'm not clear enough, the agent might misunderstand and waste a lot time doing something I don't want.
- If I'm spending time to make it clear, which requires me to understand the problem space more and spending more time. Then what's the point of using AI? It might be easier to do it myself.

That dilemma stopped me from using it.

## How it started to click for me

It all started to click for me once I learnt about Plan Mode.

Plan Mode is a special mode with Coding Agent that explicitly restricts them not to make any edit to the code. The only thing coding agent can do in Plan Mode, is to create an implementation plan.

It makes the AI coding experience makes more sense:

- I do not need to worry if I'm giving not enough details. If the agent gets it wrong, I clarifies it.
- The plan also helps to clarify my thoughts. When coding agent creates a plan, it might realizes there is some gap and will prompt me to answer them. This often help me to make me understand my requirements better.
- If there are something missing in the plan, then I can asks the agent to add it.
- With the plan knowing what the agent is going to do, how they do it, AI coding becomes more predictable.

## But there is nothing special about it

But when I contemplate about it, there is nothing special about Plan Mode. Without coding agent tools creating that, technically we can ask AI agent to "chat about it without edit any code".

Which brings to a key point about interacting with AI: it's all about how you approach it.

Just like any modern technology, they should be the tool of our mind, but not replacing our mind.

Deciphering code syntax and inferring out the business rules. Transforming the intention of 'change all the code referring to `x` to `y`' into a grep scripts. Those are the mechanical skills that used to takes time to acquire or few rounds of stack-overflowing.

Now coding agents just abstract that away.

What we have now, is the workflow.

Let's plan and clarify what we wants to do before doing any thing. Let's create some tests that codify our requirements before making any changes. Let's document the learnings of the previous session.

All those are just, jobs as a software engineer.

Coding agents takes away some skills that used to be valuable as a software engineer, like how some vim-fu that allows that hipster engineer edit tons of code in a safe and reliable way, and it makes other skills more prominent.

What is a good abstraction. Useful documentations.

## Choice of AI Tool

At the moment, I'm mainly using Claude Code with VS Code. I'm not sure if it's the best, but my workflow right now is generic enough that I'm pretty confident that if tomorrow other tool is better with Claude Code, the cost of switching is very low.

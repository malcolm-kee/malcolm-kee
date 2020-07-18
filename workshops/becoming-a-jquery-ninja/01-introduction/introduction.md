---
title: Introduction
description: Why learn JQuery even there are modern frontend frameworks
date: '2020-07-18'
objectives:
  - benefits of learning JQuery
  - the pros and cons of using JQuery compared to modern frontend frameworks like React/Angular
---

[JQuery] is a library that has been created more than 10 years ago (2016). Nonetheless, JQuery remains remains as one of the most widely used JavaScript libraries until today. JQuery allows us to add powerful interactivity to a website without much sofware engineering experience.

## Why Learn JQuery

- JQuery is easy to learn while being powerful. It allows you to add useful interactivity to your website even if you're new to web development.
- JQuery remains a marketable job skill. Wordpress (the most widely used CMS) includes JQuery by default, which makes JQuery a useful skill to have if you ever need to work with a CMS.

## But... I thought JQuery is Bad?

You may heard that JQuery is considered bad as it is heavy while being hard to maintain. Nonetheless, in software development everything comes with a tradeoff. I would recommend JQuery for your next project if:

- The website need to serve wide ranges of customers (some may use very old browsers because company seldom upgrade their software). Ensuring the compatibility manually with JavaScript is almost impossible.
- The website doesn't need very dynamic behavior, e.g. just accordion and simple dialog. Most content website will fits into this category. In that case, you don't really need to maintain the code, so hard to maintain is irrelevant.

On the other hand, if your website need very dynamic behavior, like a chat application or site with a lot business logic (such as shopping cart), then you should use a frontend framework instead.

## Why Don't We Just Use React (or Vue/Angular)?

You may continue to ask, while JQuery is fine for some projects, why don't just use React that don't have drawbacks of JQuery?

The answer for that is, modern frameworks like React have their drawback too:

1. modern frameworks have higher learning curve. This may sounds like just inconvenience as you need to learn it but you just need to learn it once. But from business perspective, a technology with lower learning curve means it is easier and cheaper to find someone to support it if you ever leave the project/company.
1. modern frameworks introduce complexity. Modern frameworks requires build tools e.g. webpack and Babel to generates the output to be used in websites. Setting up and maintaining those tools may not be something that the business want to invest in. JQuery just need to add a script tag for a new JS file, which is simple and cheap.
1. for simple logic, it takes more lines of code in modern frameworks to achieve the same functionality than JQuery. The tagline of JQuery is "write less, do more", and JQuery delivers that.

## Scope of This Workshop

This workshop covers

- How to add JQuery to your website
- Overview of JQuery
- How to manipulate HTML using JQuery
- How to respond to user aCtions
- How to do advanced transversal, e.g. filtering and looping
- How to add third-party JQuery plugins

This workshop will not cover the following:

- Fundamentals of HTML/CSS. You should be comfortable with creating a HTML file and style the elements using CSS.
- Fundamentals of JavaScript. You should at least know the basics, e.g. declaring and assigning variables, writing `for` loop.

[jquery]: https://jquery.com/

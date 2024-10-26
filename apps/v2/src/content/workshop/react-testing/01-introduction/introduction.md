---
title: Introduction
description: Why write tests for React applications and objectives of the workshop.
date: '2020-01-24'
updated_at: '2024-10-19'
objectives:
  - benefits and costs of automated testing
  - alternatives of automated testing
---

Every React developer's journey follows a similar path. We start by building UI, manually clicking through them to ensure everything works. As the project grows in complexity, we find ourselves spending more time testing and investigating bugs than coding new features. That's when we wonder if there is a better way. Enter automated testing - a skill that separates novice React developers from the competent ones.

## Automated Testing: Why or Why Not

Let's discuss briefly if automated testing is something that you or your team should introduces, and what are the alternatives if you don't.

However, if you think your team already committed to include automated testing in your project, feel free to skip to [next section](#objectives-of-this-workshop).

### Why We Test Software?

We test software because we want to _catch bugs before users do_.

The fact that automated testing is _automated_ doesn't change the purpose.

If your team think it's acceptable for users to serve as testers, then this workshop is not relevant to you. This isn't meant to be facetious, many companies operate successfully with this approach, provided they have robust systems in place to monitor errors and can quickly revert to previous version when issues arise.

If, however, your team agrees that testing is important but is undecided whether to pursue automated testing, read on.

### Benefits of Automated Tests

Automated tests helps to make application more maintainable by:

- maintain testing coverage as your application scales. As the application grows, the number of potential regressions increases. Unless you hire more testers, having automated tests is probably the only way to maintain testing coverage.
- fast development feedback loop, thus make it easier to change code and fix bug. With automated tests, you can quickly verify that the new code does not break existing functionality. Without it, you have to manually test the changes, and simulate different scenarios in your head to identify possible regressions.
- encourage refactoring to maintain code quality, as developers are more confident to cleanup technical debts, knowing that if they make a mistake, the tests will catch it.

### Costs of Automated Tests

However, there are some costs of automated tests to consider:

- It requires upfront investment of time and efforts to learn and write tests.
- As automated tests are still code, efforts to maintain the tests is needed. This efforts could be higher than expected, especially if the tests are not well-written and serve as a barrier to change.
- Having automated tests requires higher competency of developers and testers, which results in either learning time for developers and testers, or higher hiring requirements, (which usually translate to higher compensation and project cost)

### Alternatives of Automated Tests

Given the benefits and costs, some teams choose to use other methods to test their application:

- plain old manual testing. It may not be sexy, but it works.
- manual testing with helpers like [bookmarklet](https://en.wikipedia.org/wiki/Bookmarklet)

### Automated Tests or Manual Tests? It's a Spectrum, Not a Binary Choice

The discussion above is to highlight the nature of automated tests. In practice, even in teams that prioritize automated tests, there is still a place for manual tests.

For example, by nature exploratory testing is a manual process. While executing the tests, testers may find areas that may be confusing for users. Certain types of setup also lend themselves to manual tests, such as tests that require manual setup like connecting to a VPN.

The ultimate goal of automated tests is not to replace manual tests, but to minimize the amount of tedious, repetitive testing, allowing developers and testers to spend more time on manual tests that require human intelligence to judge.

## Objectives of This Workshop

By the end of this workshop, you'll be able to

- write unit test for single function
- write unit test for single React component
- write integration test for your application
- mock dependencies, api calls, and timer
- discuss principles of maintainable tests: what to test and what to mock
- write end-to-end test using Cypress

You'll learn how to use the following tools effectively:

- [Jest](https://jestjs.io)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- [Cypress](https://www.cypress.io)

However, this workshop does not cover:

- how to setup Jest for your project (we'll use project created with Create React App, which already configure Jest for us)
- how to create replicable end-to-end application for your end-to-end tests, which usually involving using technology like [Docker](https://www.docker.com/).

## About the Project

In this workshop we will add tests to an existing React project.

The site is called Shopit, an E-commerce SPA.

- [Live version](https://shopit.space/)
- [Code repository](https://github.com/malcolm-kee/react-ecomm-site)
- [Branch that we will start with](https://github.com/malcolm-kee/react-ecomm-site/tree/workshop/testing/start)
- [Branch we will aims to target](https://github.com/malcolm-kee/react-ecomm-site/tree/workshop/testing/solution) (use this as reference when you're stuck)

## Setup

To avoid the workshop time being spent on downloading and installing tools, make sure you have the following software installed before the workshop starts:

- Node.js ([Download](https://nodejs.org/en/download/))
- Yarn v1 ([Download](https://classic.yarnpkg.com/en/docs/install))
- git ([Download](https://git-scm.com/downloads))
- VS Code ([Download](https://code.visualstudio.com/Download)) - feel free to use others if you have a preference.

Besides, sign up a [GitHub] account if you doesn't have one yet.

[github]: https://github.com/

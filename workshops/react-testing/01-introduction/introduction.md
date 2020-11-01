---
title: Introduction
description: Why write tests for React applications and objectives of the workshop.
date: '2020-01-24'
updated_at: '2020-02-24'
objectives:
  - benefits and costs of automated testing
  - alternatives of automated testing
---

Testing is one of the essential steps in professional software development.

The question is not whether you test or not, it's how you test it.

Writing automated testing is to automate the testing process.

## Automated Testing: Why or Why Not

Let's discuss briefly if automated testing is something that you or your team should introduces, and what are the alternatives if you don't.

However, if you think your team already commited to include automated testing in your project, feel free to skip to [next section](#objectives-of-this-workshop).

### Purpose of Testing

The primary purpose of testing is to _catch bugs before your users do_.

The fact that automated testing is automated doesn't change the purpose.

If your team think it's fine to let your users become testers, then there is no point of this workshop for you.

If instead, your team agrees that testing is important, but is undecided whether automated testing is something you want to pursue on, read on.

### Benefits of Automated Tests

- maintain testing coverage as your application scales
- fast development feedback loop, thus make code easier to change and bug easier to fixed
- make developers more confident to cleanup technical debts with refactoring by providing a safety net

### Costs of Automated Tests

- more upfront investment of time and efforts
- efforts to maintain the tests
- requires higher competency of developers/testers, which means either time for developers/testers to learn, or hire more skilled developers/testers (which usually ask for higher pays)

### Alternatives of Automated Tests

- manual testing
- manual testing with helpers like [bookmarklet](https://en.wikipedia.org/wiki/Bookmarklet)

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

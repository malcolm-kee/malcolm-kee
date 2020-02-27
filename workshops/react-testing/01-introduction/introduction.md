---
title: Introduction
description: Why write tests for React applications and objectives of the workshop.
date: '2020-01-24'
updated_at: '2020-02-24'
objectives:
  - benefits and costs of writing tests for React applications
---

Testing is one of the essential steps in professional software development.

The question is not whether you test or not, it's how you test it.

Writing automated testing is to automate the testing process.

## Benefits of Writing Tests

- catch bugs before your user do
- avoid regression: maintain your software quality as project grows
- improve confidence of your code
- instant development feedback loop

## Costs of Writing Tests

- more code to write and maintain

## Objectives of This Workshop

By the end of this workshop, you'll be able to

- write unit test for single function
- write unit test for single React component
- write integration test for your application
- mock dependencies, api calls, and timer
- discuss principles of maintainable tests: what to test and what to mock
- write end-to-end test using Cypress

The tools that we'll use:

- [Jest](https://jestjs.io)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- [Cypress](https://www.cypress.io)

## This Workshop Does Not Cover

- how to setup Jest for your project (we'll use project created with Create React App, which already configure Jest for us)

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

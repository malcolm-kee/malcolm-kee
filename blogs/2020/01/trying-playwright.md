---
title: 'Trying Playwright: Cross-Browser Testing'
date: '2020-01-28'
updated_at: '2020-01-30'
summary: 'The testing tools that are easiest to setup are still Jest and Cypress. Playwright has slight advantage over puppeteer as it supports more browsers, but the tooling around it is still lacking at the moment.'
tags: ['testing']
published: true
---

Microsoft recently published a [puppeteer][puppeteer]-like library, [playwright], whose selling point over puppeteer is `playwright` supports 3 browser flavors: Chromium, Firefox, and Webkit.

<aside>

As of 28th January 2020, `puppeteer` supports both Chromium and Firefox while [`cypress`](https://www.cypress.io/) only supports Chromium. Support for Firefox in `cypress` is still under development and tracked by [this issue](https://github.com/cypress-io/cypress/issues/1096).

</aside>

I've tried to set it up with Jest (trying to create something like [`jest-puppeteer`][jest-puppeteer]), and able to make it work somehow. You can see my setup in [this repo](https://github.com/malcolm-kee/react-ecomm-site/tree/redux-ts-playwright).

Some thoughts that comes to me when trying to setup that:

- compared to Cypress, writing and debugging tests is kinda pain-in-the-ass because you can't pause the browser at a particular step. Perhaps this is the same for puppeteer, but I never write test for puppeteer before.
- the key to set it up for Jest is to create a browser instance that will be shared across tests. To do that, you need to launch the browser with Jest `globalSetup` script, and then save the websocket URL for that browser instance in a temp file. Then in your `testEnvironment`, get the websocket URL from the temp file and use it to connect to the shared browser instance.
- now that I have to set the test frameworks up manually, I appreciate the values of Jest and Cypress, which include all the key components of test frameworks (test runner, reporting, and assertion). Tools like `playwright` or `puppeteer` only provide you an API to manipulate browser, it's not really a test framework.
- At the moment Jest tests can only be executed in Node or JSDOM. Even though tools like `jest-puppeteer` exists, you can't run your JavaScript test in browser. `jest-puppeteer` allows you to put your code that manipulates `puppeteer` in a Jest test, but it doesn't inject any arbitrary code into the Chromium environment. There is some discussion going on in [this GitHub issue], but it's still open.

## Conclusion

The testing tools that are easiest to setup are still Jest and Cypress. Playwright has slight advantage over `puppeteer` as it supports more browsers, but the tooling around it is still lacking at the moment.

[puppeteer]: https://github.com/puppeteer/puppeteer
[playwright]: https://github.com/microsoft/playwright
[jest-puppeteer]: https://github.com/smooth-code/jest-puppeteer
[github-issue-jsdom]: https://github.com/facebook/jest/issues/848

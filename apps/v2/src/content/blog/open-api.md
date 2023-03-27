---
title: "OpenAPI: A backend developer's tool, a frontend developer’s friend"
pubDate: 31 Mar 2023
description: Learn about OpenAPI, a tool that is popular for API development, and can be used to help with frontend development.
topics:
  - frontend-tooling
preview: true
---

For frontend development, TypeScript is good. If you accept human inevitably makes mistake, the benefits of introducing static type checking to reduce the chance of error, is hard to deny.

However, there is an apparent limitation of TypeScript once you start using it in your application: it can't type-check beyond your TypeScript codebase. A `fetch` call will always be `any` (or `unknown`) because there is no way for TypeScript to know what could be the response. We can, of course, play pretend by manually declare the type of the response, but it is an ongoing manual work because we have to update it as the API we call changes. And being a programmer, we hate manual works because we accept we make mistake ~~and we’re lazy~~.

There are few ways to solve this, such as using GraphQL (with [GraphQL codegen](https://the-guild.dev/graphql/codegen)) or GRPC (with [tRPC](https://trpc.io/)). Those tools are powerful and easy to setup, but in practice they are hard to adopt because they require a change of the API server tech stack, a privilege many of us do not have.

But if you’re willing to spend some time to do some digging around and assembling few libraries together to fit your use case, there is a tool that could solve this problem without changing backend tech stack: OpenAPI.

## What is OpenAPI

OpenAPI is a specification that aims to standardize how all REST APIs are described, regardless of programming language that powers the API. The specification should be a JSON object, which may be written either in JSON or YAML format. OpenAPI is sometimes also referred to as “Swagger”, as the spec was based on another specification, Swagger Specification by SmartBear Software.

OpenAPI doc is usually created in two ways:

- it is generated with some OpenAPI tools created for the programming language or framework used by the server. For example, NestJS supports generation of the OpenAPI document with its [first-party library](https://docs.nestjs.com/openapi/introduction), [SpringFox](https://github.com/springfox/springfox) generates OpenAPI document for API server built with Spring framework.
- it is handwritten by the API developers and then used to generate stub for the API code

## Common uses of OpenAPI doc

The most common usage of OpenAPI doc is to generate a live HTML page using swagger-ui or similar tools like Redoc, making it easy for everyone to explore the endpoints of the server without digging into code. If you never seen the UI before, you can see an example [here](https://ecomm-service.fly.dev/docs).

The page supports making actual requests to the server, which makes it a cheap way for power users like technical supports to invoke API requests, instead of requiring additional engineering effort to build the UI.

Another use case of OpenAPI doc is to integrate with popular development and testing tools like [Postman](https://www.postman.com/), which then be used for API testing. If the quality of the OpenAPI doc is good (with good description of what each endpoint does), API testing could be done fully “self-service” without manual communication between the tester and the API developer.

## Less common uses of OpenAPI doc

There are more opportunities to use OpenAPI docs that are lesser used, but still very useful:

### Client SDK Generation

SDK (software development kit) usually means a set of tools that is provided by a service that you uses, for example, AWS provides AWS SDK to provides developers a convenient way to access AWS functionalities in different programming languages.

In the context of API, SDK usually means a class or package that calls the API under the hood, but implemented in the client programming language to improve the developer experience, such as type checking.

There are many open-source tools available to convert OpenAPI doc to generate client SDK of different programming languages, including Typescript. For example, you can use [openapi-typescript-codegen](https://github.com/ferdikoomen/openapi-typescript-codegen) to generate Typescript interfaces and API request function calls, so you can properly type check your code related to the network requests. This process can be automated so that every time the API that you’re calling update its OpenAPI doc, the code generation will be rerun and the code will be updated automatically. Breaking changes that affect your usage, such as removing a field that your frontend code is using, will resulted in a type error.

### Mock Server Generation

It is also possible to generate a mock server based on the OpenAPI spec for testing. However, the response of the mock would hugely depends on the quality of the OpenAPI spec, e.g. the examples included in the spec.

### API Gateway rate limiting configuration

API gateway is a common component in microservice architectures, where it sits between the client and all the backend services.

With OpenAPI doc, we can describes the rate limits for a specific operation, and as part of deployment, automatically configures the API gateway rate-limiting rules based on the OpenAPI doc.

### Edge function generation

Edge functions are lambda functions that run at the “edge”, somewhere near to your users. If you’re not familiar with edge functions, one way to think about it is that it is like CDN, but for lambda functions. Edge functions allows us to run code closer to our users, provide faster response.

As authorization requirements and request body schema could be described in OpenAPI doc, we can technically use Open API doc to generate edge functions that validate the request payload at the edge, before the request reaches our server.

### Breaking change detection

When an API is used by many clients, such as in a large company or the API is released to partners, it is crucial to avoid breaking changes without proper planning and announcement. As it is easy to parse OpenAPI spec, there are libraries (such as this [`openapi-diff`](https://bitbucket.org/atlassian/openapi-diff/src/master/) package to detect breaking changes such as:

- addition of required fields in request payload
- removal of fields is response
- removal of path
- removal of method

To make this automation easier, it is one of the [best practices](https://oai.github.io/Documentation/best-practices.html#add-openapi-documents-to-source-control) to commit the OpenAPI doc into your source control.

## Conclusion

OpenAPI is a great tool if your application involves a REST API server. For the developers that maintain the API server, it allows integration with many tools to help with their developments and communications with other stackholders. For frontend developers, it allow us to generate code that we prefer not to write manually.

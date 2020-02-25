---
title: Next Steps
description: How to use what you learnt in your work
date: '2020-02-25'
objectives:
  - how to start introducing test in your work
  - when to write a test
  - generating code coverage report
---

## Generating Code Coverage Report

Add a new npm scripts:

```json fileName=package.json highlightedLines=7
  {
    ...
    "scripts": {
      "start": "react-scripts start",
      "build": "react-scripts build",
      "test": "react-scripts test",
      "test:ci": "react-scripts test --coverage --ci --watchAll=false",
      "eject": "react-scripts eject",
      "start:docs": "styleguidist server",
      "build:docs": "styleguidist build"
    }
    ...
  }
```

---
title: 'Monitoring Government Website for Content Change'
pubDate: 24 Oct 2018
description: 'My experience on developing a web-scraping application that will notify subscribers for any changes of a government website'
---

As a software engineer, the most fulfilling parts of the job is to solve the problem that makes people's life easier.

Recently, upon request from one of my old friends, I've developed a web-scraping applicaton that will check for any changes of a government webiste.

## Problem Statement

In Malaysia, accountants must ensure that they prepare the financial reports based on the latest Companies Law. Unfortunately, the authorities sometimes update the Companies Act without a proper channel to notify accountants.

Accountants can only refer to the [government website][ssm] for any changes, but there are more than 100 of documents there and scanning through them everytime is impractical. As a result, accountants often submit report based on outdated regulations and consequently the report is rejected, causing wasted time and efforts.

## The Solution

The solution consists of three parts:

1.  Scrapping the content
2.  Checking for update and when any change is detected:
    - email subscribers about it
    - trigger the build of static site with the latest data
3.  Scheduling for step 1 and step 2 to run daily

### 1. Scraping the content

Web-scraping nowadays is pretty easy and there are plenty ways to do it. However, as the saying goes, "when you're a hammer everything looks like a nail", I opt for NodeJS as it is the server-side platform I'm most familiar with.

I uses the following npm libraries to scrap the content:

- `request`: to make the http request to the site
- `cheerio`: to parse the content of the page

With that, by inspecting the html on the page and write the selector accordingly, I able to extract out the information of all the Company Acts on the page.

The result is then saved to MongoDB database.

### 2. Checking for update and notify/build site

As the content are saved in previous step, checking for update as just the matter of comparing the result of today and yesterday for any difference.

If there is any difference,

1.  email will be sent via [sendgrid][sendgrid].
2.  the nodejs script will also make a post request to [Netlify build hooks][netlify-build-hooks], which will trigger a build of the static site.

The static site is generated with [Gatsby][gatsby], which is configured to make a http request in build time to get the list of differences and output static html files.

The static site can be viewed [here][ssm-update]. (You may not see any data as the app is only up for few days, thus no data is available yet)

### 3. Scheduling

As I host my nodejs app at my own server instance where I have full access, I utilize unix crontab to schedule the 2 steps.

This is my first time to setup a crontab myself, I was pretty thrilled when they worked! :)

## Conclusion

Even though the application seems fine, the best solution would be for the government website provide newletter/RSS feed subscription to the accountants for any changes. Nonetheless, the experience of developing this application are both fun and satisfying, as I can help others while learning technologies that are new to me.

## Source Code

[NodeJS app repo](https://github.com/malcolm-kee/msia-company-act-change)

[Gatsby site](https://github.com/malcolm-kee/ssm-update)

[sendgrid]: https://sendgrid.com/
[netlify-build-hooks]: https://www.netlify.com/docs/webhooks/
[gatsby]: https://www.gatsbyjs.org/
[ssm]: http://www.ssm.com.my/Pages/Legal_Framework/Companies-Act-2016.aspx
[ssm-update]: https://ssm-update.netlify.com/

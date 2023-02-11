---
title: "Debounce Versus Throttle"
description: "While they might seem the same, debounce and throttle actually have different use cases. Let's learn what they are! 🔥"
imageUrl: /images/blog/debounce-versus-throttle/hello-sign.webp
dateWritten: "2023-02-10"
dateUpdated: "2023-02-10"
isDraft: false
tags:
  - TypeScript
---

<img alt="Neon 'Hello' sign on a black background" src="/images/blog/debounce-versus-throttle/hello-sign.webp" width="1446" height="964">

# Debounce Versus Throttle

> I wrote this article because debounce and throttle are super annoying to keep straight. I hope this will help you in your learning journey.

## Introduction

When I was trying to learn the difference between what a `debounce` function (like this one from [lodash](https://lodash.com/docs/4.17.15#debounce)) and `throttle` function (again, from [lodash](https://lodash.com/docs/4.17.15#throttle)) were, I found it hard to find materials that were crystal clear on _exactly_ how they functioned.

This article is going to correct that for you so you don't suffer the same fate. 😌

The main source of confusion is that, at face value, the two of them seem to even behave a little bit the same. If you're reading this, I'm sure you've noticed the same thing.

What we're going to do is take them one at a time and walk through some **real** code examples that will show you exactly what they do (and how they're different).

By the end, you'll be a pro.

Sound good?

Nice. Let's get started.

## Debounce

At it's core, `debounce` is a process for calling a function _exactly_ once for any group of calls (the term `debounce` was [coined by John Hann](http://unscriptable.com/2009/03/20/debouncing-javascript-methods/)). What this means is that, for a given group of actions (such as typing a lot of characters in an input), the `debounce` function will be called exactly once (typically either at the start or the end of the group).

For instance, let's say we have this custom `debounce` function:

```typescript
const TIMEOUT_MS = 250;

function debounce(callback: (...args: unknown) => unknown) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => callback(), TIMEOUT_MS);
  };
}
```

I know, that's a lot to digest.

But don't worry w're going to walk through it together.

First off, I've defined a variable called `TIMEOUT_MS`. A `debounce` function will typically allow you to set your _own_ timeout, but I'm just hard-coding it to make things easier. 👍🏻

Next, we have our very own custom `debounce` function. For its parameter, notice that it takes in a `callback` which can be a function that takes in any number of `args` of `unknown` type and returns an `unknown` type (we might want to change this for a production application, but it works for us here):

```typescript
function debounce(callback: (...args: unknown) => unknown) {
  // ... code goes here
}
```

This `callback` function is what will eventually be called by our `debounce` function (and is the root action we want performed exactly **once** for any group of attempted calls to it).

Next, we have this line of code which will track a `timeoutId`:

```typescript
let timeoutId: ReturnType<typeof setTimeout> | null = null;
```

Don't get distracted by the TypeScript types here. All this is doing is declaring a `timeoutId` variable, saying it can either by the type of the returned value of any `setTimeout` call or `null`, and then we set it to `null`.

The next thing we're going to do is return a function with the guts of our logic:

```typescript
return () => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  timeoutId = setTimeout(() => callback(), TIMEOUT_MS);
};
```

The first thing it's doing is checking if `timeoutId` is truthy (e.g. not `null`). If it is, that means our `debounce` has previously been called. We will go ahead and clear the `timeoutId` (for reasons that will become apparent in just a few sentences).

Next, we want to call `setTimeout` and assign the return value to `timeoutId`. This `setTimeout` will call `callback` whenever it times out (which should happen after `TIMEOUT_MS` which we created earlier).

This was a lot.

The TLDR for the code above is that

Let's walk through an example of it being used.

First, let's go ahead and set up our `debounce` function:

```typescript
function handleDebouncedLog() {
  debounce(() => console.log("Hello World!"));
}
```

From here, we can write a quick loop to run 100 times and call our `handleDebouncedLog` function each time:

```typescript
for (let i = 0; i < 100; i++) {
  handleDebouncedLog();
}
```

If we were to check the dev console, we'd see _exactly_ one log of "Hello World!" when this code was done running.

This is because we're only running our debounced function (the logger) once the group of functions has finished running (defined by a gap of `TIMEOUT_MS`).

## Throttle

## Conclusion

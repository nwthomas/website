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

> I wrote this article because debounce and throttle are super hard to keep straight and visualize in your head. I hope this will help you in your learning journey.

## Introduction

When I was trying to learn the difference between what a `debounce` function (like this one from [lodash](https://lodash.com/docs/4.17.15#debounce)) and `throttle` function were (again, here's one from [lodash](https://lodash.com/docs/4.17.15#throttle)), it turned out to be annoying to find materials that were crystal clear on _exactly_ how they functioned.

This article is going to correct that for you so you don't suffer the same fate. 😌

The main source of confusion is that, at face value, the two of them seem to even behave a little bit the same. If you're reading this, I'm sure you've noticed the same thing.

What we're going to do is take them one at a time and walk through some **real** code examples that will show you exactly what they do (and how they're different).

By the end, you'll be a pro.

Sound good?

Nice. Let's get started.

## Debounce

At it's core, `debounce` is a process for calling a function _exactly_ once for any group of calls (the term `debounce` was [coined by John Hann](http://unscriptable.com/2009/03/20/debouncing-javascript-methods/)). What this means is that, for a given group of actions (such as typing a lot of characters in an input), the `debounce` function will be called exactly once (typically either at the start or the end of the group).

Here's a nifty little diagram that might explain this concept:

<img alt="A cluster of function calls with the words 'Function is repeatedly called' over if with a 250ms wait and then a box symbolizing a funciton call that says 'When the function actually runs'" src="/images/blog/debounce-versus-throttle/debounce.webp" width="852" height="639">

For instance, let's say we have this custom `debounce` function written in TypeScript:

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

I have good news for you! If you were able to make it through the `debounce` section with your sanity in tact, you're home free.

The `throttle` function is, by comparison, really easy to grasp. This is because `throttle` merely calls a `callback` function _exactly_ once within a time span (which we'll set using our `TIMEOUT_MS` variable).

It's basically saying, "Hey function. You're doing too much. Let's just dial that activity back to one function call every **X** amount of time to tone things down a little bit."

Does that make sense?

Another way of thinking about it is that using `throttle` is like a stoplight that only lets a single car through for every **X** amount of time (even if there are thousands of cars that tried to get through the intersection at the same time).

A picture is worth a lot of words, so here's another diagram:

<img alt="A cluster of function calls where the function is only allowed to actually run once within the timeout time" src="/images/blog/debounce-versus-throttle/throttle.webp" width="932" height="409">

And, right on schedule, here's a TypeScript example of one of these bad boys:

```typescript
const TIMEOUT_MS = 250;

function throttle(callback: (...args: Array<unknown>) => unknown) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return () => {
    if (timeoutId) {
      return;
    }

    timeoutId = setTimeout(() => {
      callback();
    }, TIMEOUT_MS);
  };
}
```

The first part of this function is set up exactly like before (the `TIMEOUT_MS` variable, `callback` function parameter, and `timeoutId` variable). We'll skip over those.

Once again, I'm hard-coding the timeout time to be 250 milliseconds.

The part where our `throttle` differs from `debounce` is that we just return early if we have a `timeoutId` set already inside the anonymous arrow function that we're creating and returning.

Wait. What? 🤨

I know. It seems a bit off. But what we're essentially doing is building a function that will set a timeout and save a `timeoutId` the first time it runs. Thereafter (until the timeout finishes and calls the `callback`), any further attempts to call our `throttle`-ed function will merely return and not run.

Nice, right?

This works like a charm, and it means that we are gauranteed that our `throttle`-ed function will only be called once per `TIMEOUT_MS`.

## Conclusion

Now that you have a great idea of the difference between `debounce` and `throttle`, you can go one step further.

What happens if you want the function call at the _end_ of your `throttle`-ed function to run instead of the _start_ (called the "trailing edge" call rather than the "leading edge" which is what this article talked you through)?

What happens if you're `debounce`-ing a function for user input on a search bar and you want the eventual function call to run with the _newest_ data from the _last_ function call (again, "trailing edge" versus "leading edge")?

These are all possible with code, and I have a sneaking supicion that you'll be able to implement them now!

In any case, I hope this article helped you grasp the differences between these two types of functions.

As always, thanks for reading my articles.

Nathan ☕️

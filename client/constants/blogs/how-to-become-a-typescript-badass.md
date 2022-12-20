---
title: "How to Become a TypeScript Badass"
metaTitle: "How to Become a TypeScript Badass"
slug: "how-to-become-a-typescript-badass"
metaDescription: "Have you always wanted to learn how to master TypeScript? In that case, this one is for you."
imageUrl: /blog-assets/how-to-become-a-typescript-badass/typescript-on-wall.webp
date: "2020-08-20"
tags:
  - TypeScript
---

![Typescript log on a white wall background](/blog-assets/how-to-become-a-typescript-badass/typescript-on-wall.webp)

# How to Become a TypeScript Badass

---

> This article originally appeared on [HackerNoon](https://hackernoon.com/how-to-become-a-typescript-badass-0o213e4v). It has received slight edits (since we all get better at our hobbies - like writing - with time), but it's still true to its original vision.

---

## Why TypeScript?

If you're a member of the JavaScript community, you have likely at least heard about the new(ish) popular kid on the block - [TypeScript](https://www.typescriptlang.org/).

When I was learning JavaScript several years ago, I distinctly remember thinking, "Why would I ever need to strongly type out JavaScript? That sounds like a lot of extra work, and I already know what my JavaScript types are doing."

Don't be like past Nate.

If you invest some time up-front into learning TypeScript, you'll discover that typing out your JavaScript prevents errors in your code and saves you from being angrily strangled by your coworkers (also, it's becoming an in-demand job skill for engineers).

Let's hop into some code so you can learn for yourself why TypeScript is so awesome. By the end of this article, you'll know how to setup TypeScript, work with the basic (and some complex) types, and why you should explore this world even more.

Let's begin. 🎉

---

> “Hustle beats talent when talent doesn’t hustle”
>
> – Ross Simmonds

---

## Firing Up TypeScript

The first thing we're going to do is go ahead and install TypeScript on your machine by running this commend in your terminal:

```bash
npm install -g typescript
```

After that, the next thing you need to do is clone down a [repository](https://github.com/nwthomas/typescript-article-code) I've made for you to practice the rest of the code in this article.

After that, open up the repo in your text editor or Integrated Development Environment (IDE) of choice.

I've created a `solution` folder for you in that repo that you can peak into if you get stuck at any step of the way. Try not to look in it though, because it's a lot more fun to write out the code yourself. Do your work in the `problem` folder. I've made files there in advance that you can fill out as we go through the article.

What I want you to do first is to `cd` into the `problem/initial-setup` folder. Go ahead and open up the file inside called `initialSetup.ts`.

Next, I want you to write a `console.log` inside this file that prints out some string. It can be anything you want. Make it something fun.

Finally, in your terminal (which should still be "inside" the `problem/initial-setup` directory), run this command:

```bash
tsc initialSetup.ts
```

Notice how, after just one second, a file called initialSetup.js appears alongside your TypeScript file in the directory?

You just transpiled your first TypeScript file to JavaScript. 🎉

This is how you can do things like write server code in TypeScript and have it run in production as JavaScript.

Congrats. In ~5 minutes, you've gone from not knowing anything about TypeScript to having it installed and knowing how to transpile it into JavaScript.

I'm going to grab a snack from the fridge to celebrate. You should too. 🍪

---

> “Courage is the most important of all the virtues because without courage, you can't practice any other virtue consistently.”
>
> – Maya Angelou

---

## Learning the Basics

Now that we now how to transpile code into JavaScript, we can start digging into syntax.

First, let's go ahead and open up the file inside `problem/types` called `simpleDataTypes.ts`.

The first thing you need to know about types in TypeScript is how to type out JavaScript's 5 basic primitives (excluding `symbols`, the 6th type, which we won't be talking about in this article since they are rarely used by most developers):

1. `boolean`
2. `string`
3. `number`
4. `undefined`
5. `null`

Note that the TypeScript type `any` can be used when you want to accept any value (although this is not good practice since it defeats the whole point of using types).

Go ahead and write out the following in your `simpleDataTypes.ts` file:

```typescript
const exampleNumber: string = 100;
```

This new syntax, specifically the colon `:` and the `string` word, are ways of telling TypeScript what the variable is supposed to be. It's supposed to be a `string`.

However, there's a problem here. 😞 You probably already noticed it.

Since we assigned a `number` type (`100`) to a variable that's supposed to be of type `string`, TypeScript is unhappy. You should get an error that looks very close to this:

![VS Code screenshot of TypeScript error](/blog-assets/how-to-become-a-typescript-badass/vscode-typescript-error.jpg "(Sorry for the junky screenshot)")

This is what it looks like when TypeScript is trying to tell us that we're doing something dumb, like [tucking a caffe latte under our shirt](https://www.youtube.com/watch?v=TysjNDTWEBc).

Go ahead and change that `string` type to use `number`:

```typescript
const exampleNumber: number = 100;
```

Notice how the error clears up right away?

This is the benefit of TypeScript - Immediate, precise feedback on your types. This might not seem like such an advantage in a small file with one line of code. In fact, this might even seem like it's a little annoying to have to write.

But just imagine how nice this type checking might be in a massive codebase when dozens of people are working on the same code. 😰

What if you could ensure that other developers would have an error if they tried to accidentally assign the wrong type to a variable imported from a different area of the application? That's exactly where the power of TypeScript comes in.

Let's go ahead and try out a few more types.

Write the following lines of code in your `simpleDataTypes.ts` file:

```typescript
const exampleString: string = "Test";

const exampleBoolean: boolean = true;

const exampleNull: null = null;

const exampleUndefined: undefined = undefined;

const exampleVoid: void = null;
```

These nicely demonstrate the remaining primitive types that you might use in JavaScript.

However, the really cool next step is that we don't _always_ have to define the types of our variables. If it's a primitive value, we can actually just leave them off if we want. TypeScript will _infer_ it from the assigned value.

Here's the same code with TypeScript inferring the type from the assigned initial value:

```typescript
const exampleNumberTwo = 100;

const exampleStringTwo = "Test";

const exampleBooleanTwo = true;

const exampleNullTwo = null;

const exampleUndefinedTwo = undefined;

const exampleVoidTwo = undefined;
```

The obvious next question is, "Why would we ever use types on a variable if TypeScript can just infer them?"

I'm glad you asked.

First, sometimes you'll want to declare a variable before you assign it a value (e.g. like `let value: string;`). Adding the type when the variable is defined will explicitly set it for the future even if an initial value hasn't been added yet.

Second, stating specific types allows us to type out more complex data types (like objects and arrays). Let's go ahead and take a look at that in the next section.

Now's a great time to refill that nice beverage you've been sipping on. ☕️

---

> “Success is stumbling from failure to failure with no loss of enthusiasm.”
>
> \- Winston Churchill

---

## Objects, Arrays, and TypeScript

Now that we know how the primitive data types get typed out in TypeScript (that was a very repetitive line to write out), it's time to learn how to set up typing for some more complex scenarios (like objects and arrays).

The first thing you need to know is that TypeScript has something called an interface, and you can use it to define objects. It is, in fact, a "keyword" restricted to that purpose. If that doesn't make sense, it will in just a second.

Go ahead and open up the file called `complexDataTypes.ts` in the `types` folder for the next few examples.

For instance, suppose you have a function like this:

```typescript
function printLabel(labeledObj: { label: string }) {
  console.log(labeledObj.label);
}
```

Notice how we have a parameter (`labeledObj`) and we've defined a type on it inside the parentheses? That's how we can type out an object!

While this will run as valid TypeScript, having the type inside the parentheses looks a little messy. Let's try to clean up the typing by doing this:

```typescript
interface LabeledObjWithInterfaceKeyword {
  label: string;
}

function printLabelWithInterfaceKeyword(
  labeledObj: LabeledObjWithInterfaceKeyword
) {
  console.log(labeledObj.label);
}
```

We've just abstracted the parameter's type out into it's own "thing," the interface called `LabeledValue` defined above the function `printLabel`. We then assign that interface as the type of the parameter with the `labeledObj: LabeledValue`.

We can then easily add more key-value pairs to this object like so:

```typescript
interface LabeledObjWithInterfaceKeyword {
  label: string;
  value: number;
}

function printLabelWithInterfaceKeyword(
  labeledObj: LabeledObjWithInterfaceKeyword
) {
  console.log(labeledObj.label, labeledObj.value);
}
```

In addition to using the `interface` keyword, the second way that we can type an object is through the `type` keyword.

Here's an example of the same code above but using `type`:

```typescript
type LabeledObjWithTypeKeyword = {
  label: string;
  value: number;
};

function printLabelWithTypeKeyword(labeledObj: LabeledObjWithTypeKeyword) {
  console.log(labeledObj.label, labeledObj.value);
}
```

It's almost exactly the same because it's an [alias](<https://en.wikipedia.org/wiki/Aliasing_(computing)>) of `interface`. There are some subtle differences between `type` and `interface` (like not being able to use [merging interfaces](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) with the `type` keyword), but they really aren't relevant to our discussion today and will honestly be too confusing.

Don't worry about them.

For now, choose one that you like (I'd recommend `interface` if you're on the fence) and roll with it. 👍🏻

Finally, let's briefly look through the two ways that you can define arrays in TypeScript. They're both quite straightforward, and it's again down to your preference on which one you should use:

```typescript
// First way of typing out arrays
const arrayOfNumbers1: number[] = [1, 2, 3, 4, 5];

// Second way of typing out arrays
const arrayOfNumbers2: Array<number> = [1, 2, 3, 4, 5];
```

Note that the second way is probably cleaner if you want to designate that it's something more complex like an array of objects:

```typescript
// Object type
interface ExampleObject {
  label: string;
  value: number;
}

// Array of object types
const arrayOfExampleObjects: Array<ExampleObject> = [
  { label: "label1", value: 1 },
  { label: "label2", value: 2 },
  { label: "label3", value: 3 },
];
```

As you can see, we've already reached a nice point where we've built up to some interesting type combinations. Let's take it one step further with typing out classes.

Go ahead and refill that delicious drink you made earlier.

We're going into the home stretch. ✌🏻

![White wall with ivy to the left side of it](/blog-assets/how-to-become-a-typescript-badass/ivy-wall.webp)

## Classes: Complex and Beautiful

The last thing we're going to do is learn the fundamentals of working with classes in TypeScript. Then, I'll leave you with a bunch of resources that you can use to continue your journey.

I want you to go ahead and go into the `classes` folder and open up the `classes.ts` file. Then, create a `class` and `interface` that look like this:

```typescript
interface Movie {
  year: number;
  name: string;
}

class Movie {
  year: number;
  name: string;

  constructor(movie: Movie) {
    this.year = movie.year;
    this.name = movie.name;
  }

  getMovieYear() {
    return this.name + " was made in " + this.year;
  }
}
```

There's a few things to notice here. First, we have two class variables called `year` and `name` inside our `Movie` class that we've defined as `number` and `string` types. Second, we have an `interface` that defines the object type that the class' constructor function is taking in, and we are then assigning values from inside that object to the class' variables.

Finally, we have a new method that uses both of these class variables to return a string.

Can you see how everything you've learned so far about TypeScript meshes nicely into the existing class syntax in JavaScript?

Go ahead and try running the command `tsc classes.ts` in this folder to transpile this file. When the `classes.js` file is created, take a look in the file to see what this class transpiles to in JavaScript. 👍🏻

We can use TypeScript's type definitions on our class variables and parameters in the constructor and methods, ensuring that we always know types they will be expecting and using.

You can find out more about classes and how they relate to TypeScript by reading up on them [here](https://www.typescriptlang.org/docs/handbook/classes.html).

---

> "Beautiful things don’t ask for attention."
>
> \- Unknown

---

## Other Resources

There's lots of interesting things in TypeScript that we haven't discussed yet in this article. It was meant to give you a quick intro, but this is where the real fun begins for you.

For instance, have you been wondering what that mysterious little `tsconfig.json` file is in the repo you've been working in for this article?

Well, you can now jump in feet-first into TypeScript's powerful and passionate community to learn about customizing that file and much more.

While there are limitless resources out there on Google, here are three interesting points to start the rest of your journey into a statically-typed future:

1. [TypeScript Docs](https://www.typescriptlang.org/) - The official documentation on TypeScript is excellent and will save your butt if you use it
2. [TS-Node](https://github.com/TypeStrong/ts-node) - This runs a development server and can auto-transpile on save for you
3. [Deno](https://deno.land/) - A new JavaScript and TypeScript runtime that's a competitor for Node.js (in other words, no transpilation needed like we've been doing in this article

---

## Conclusion

I hope you’ve enjoyed this article on using TypeScript. It's such powerful tool that will supercharge your development process (especially if you're working with others).

Best of luck.

Thanks for reading. 🔥

Nathan

---
title: "Building Your First GraphQL Server"
metaTitle: "Building Your First GraphQL Server"
slug: "building-your-first-graphql-server"
metaDescription: "This article will teach you GraphQL as well as how to build a small JavaScript server."
imageUrl: /blog-assets/building-your-first-graphql-server/graphql-logo.webp
date: "2019-08-18"
tags:
  - GraphQL
---

<img alt="GraphQL logo on a cloud background" src="/blog-assets/building-your-first-graphql-server/graphql-logo.webp" width="1050" height="525">

# Building Your First GraphQL Server

---

> This article originally appeared on HackerNoon. It has received some edits (e.g. I had to rewrite the database section to use Supabase), but it's still true to its original vision.

---

## Getting Started with GraphQL

I don’t know if you’ve heard, but there's an awesome technology you can use for data fetching — it's called GraphQL.

It’s super fancy. 🎉

If you’re anything like me, you’ve built lots of RESTful servers. When you finally take a break to squash your existential dread and document 150 new endpoints, you might start wondering if there’s a better way to live your life.

On top of that, you might start to notice that your server often delivers too much information that’s unneeded for a given request. When the client makes a request from your server, it ends up getting the entire forest along with the single tree of data (I know, my examples need work).

This is where GraphQL comes in. GraphQL is fast replacing RESTful APIs everywhere you might look, and more-and-more companies are [claiming](https://medium.com/airbnb-engineering/how-airbnb-is-moving-10x-faster-at-scale-with-graphql-and-apollo-aa4ec92d69e2) that it’s sped up their applications significantly.

As always, grab a cup of something good. ☕️

Strap in. This one’s crazy, but I think you’ll find it‘s worth it in the end.

---

## It's Time to Start Thinking in Edges

Graphs are all around us in life, and yet we never notice them. When you travel on public transit, discuss your family tree, or look at the stars and try to make out a bull or a large goat person shooting an arrow (like how I showed off my astronomy knowledge there?), we are unknowingly thinking in terms of graphs.

In computer science, graphs are connected points, and these points are traditionally called _nodes_ or _vertices_. The lines that connect these graphs together are called _edges_. Here’s an example of a simple graph:

<img alt="Example graph" height="3168" src="/blog-assets/building-your-first-graphql-server/example-graph.webp" width="4752">

The graph above has five _nodes_ (or _vertices_) and eight _edges_. Make sense, right?

Without getting into the nitty gritty of in-depth graph theory, we can access various _nodes_ that are connected through _edges_ by traveling along that edge to another _node_. In our data, this means that we connect different data tables together in a way that has significant meaning (this will make more sense later in the article).

This was one of the ways of thinking that allowed GraphQL to be born. Coupled with a general dissatisfaction for the current state of RESTful APIs in today’s data-heavy applications, [Facebook](https://engineering.fb.com/2015/09/14/core-data/graphql-a-data-query-language/?ref=hackernoon.com) decided to pioneer a new way to fetch data from their servers back in 2012 (and finally open-sourced it in 2015). By focusing on the data connections (instead of thinking in endpoints), they developed a new process for obtaining information from their servers.

GraphQL is, at its core, a protocol disguised as a data-querying language. It is a layer that sits on top of your server and interfaces with both the server and the client. Here’s an example of a query from the front-end that we could write later once we have the server built out:

```graphql
query {
  getAllUsers {
    id
    username
    phone
  }
}
```

When we fire this off (which we’ll see how to do soon), we get the following JSON data back:

```json
{
  "data": {
    "getAllUsers": [
      {
        "id": "1",
        "username": "admin",
        "phone": "(777) 777-7777"
      },
      {
        "id": "2",
        "username": "Chadrick54",
        "phone": "1-213-614-0707 x94837"
      },
      {
        "id": "3",
        "username": "Eva27",
        "phone": "396-178-0064"
      },
      {
        "id": "4",
        "username": "Audreanne_Luettgen65",
        "phone": "1-208-921-9879 x9843"
      },
      {
        "id": "5",
        "username": "Ahmed56",
        "phone": "(675) 410-7905 x6909"
      }
    ]
  }
}
```

Notice how the data directly parallels the query that we made? That’s super declarative code. We’ll talk more about that in a bit. For now, let’s hop directly into the deep end and set up a server. 🔥

---

> “Whatever affects one directly, affects all indirectly.”
>
> — Martin Luther King Jr.

---

## Setting Up the Server and Postgres Database

We’ll be starting from a mid-way point with our server this time around, and I have something all ready to go for you. 👍

Go ahead and clone [this repository](https://github.com/nwthomas/graphql-article-server?ref=hackernoon.com) for the starter files. This will catch you up to exactly where you need to be to follow along with this walkthrough. Once you clone it and open it up in your editor of choice (I’ll be using [VS Code](https://code.visualstudio.com/?ref=hackernoon.com)), you should have something very much like this:

<img alg="screenshot of VS Code setup for this article" height="931" src="/blog-assets/building-your-first-graphql-server/vs-code-1.webp" width="1200">

Make sure to use the command `yarn` to install all of your node modules as well. Once these have finished downloading, feel free to poke through the repository a bit and see what code is already finished for you.

We’ll be building out our API to allow us to work with users and their corresponding favorite candy. I’ve already built out a lot of the core functionality along with the migrations and dummy seed data files, and we’ll just be focusing on implementing GraphQL. 👍

Go ahead and run the command `yarn server` in the root directory. You should see something much like this:

<img alg="screenshot of VS Code running the example server" height="924" src="/blog-assets/building-your-first-graphql-server/vs-code-2.webp" width="1200">

However, our server isn’t fully wired up yet. Before we go any further, let’s head into our next section and hook up some good old-fashioned `PostgreSQL`.

---

> “We are all now connected by the Internet, like neurons in a giant brain.”
>
> — Stephen Hawking

---

## Setting Up Supabase ⚡️

We’ll be using Supabase today for our database (purely because it’s super easy to grab a full instance of `PostgreSQL`), although you’re free to use a local instance of it if you want.

If you haven’t already done so in the past, create a Supabase account ([website here](https://app.supabase.com)). Next, you'll find yourself in the initial dashboard which will look like this:

<img alg="Screenshot of the Supabase starting dashboard" height="1009" src="/blog-assets/building-your-first-graphql-server/supabase-initial-dashboard.webp" width="1473">

Next, click the "New Project" button. After you do that, you'll find yourself on a modal for details about your project. You can call it whatever you want, but here's what I filled it in with:

<img alg="Screenshot of the Supabase new project setup modal" height="1009" src="/blog-assets/building-your-first-graphql-server/supabase-new-project-setup.webp" width="1473">

Remember your password. You'll need it later.

Next, you'll find yourself on the main page for your current project. You'll want to click on the "Project Settings" sidebar option right here:

<img alg="Screenshot of the Supabase new project dashboard with an arrow indicating where to click for Project Settings" height="1009" src="/blog-assets/building-your-first-graphql-server/supabase-new-project.webp" width="1473">

From there, you'll find yourself on the "Project Settings" page. Click on the "Database" option on the inner sidebar and then scroll down until you see a "Connection string" area as shown here:

<img alg="Screenshot of the Supabase new project dashboard with an arrow indicating where to click for Project Settings" height="1009" src="/blog-assets/building-your-first-graphql-server/supabase-grab-database-url.webp" width="1473">

Copy the `NodeJS` URL. We'll use that in just a second. Here’s a fake link to demonstrate what it should look like:

```
postgresql://postgres:[YOUR-PASSWORD]@db.fxmmbuowzzhryfwwprao.supabase.co:5432/postgres
```

Next, go to the repository that you cloned from me. Create a file called `.env` in your root directory and paste the following in:

```
PORT=4000
NODE_TLS_REJECT_UNAUTHORIZED='0'
DATABASE_URL=<your database URI link goes here>
```

You'll want to replace the portion of the database url that says `[YOUR-PASSWORD]` with your password that you created just a second ago. Make sure never to push this url up to GitHub.

This gives the boilerplate I made for you access to the PostgreSQL instance that you just set up, and we’re also assigning a custom port for your server.

With all of that out of the way, we can finally get to work on GraphQL. Go ahead and take a break to step outside. Grab some more coffee or tea.

Ready?

Let’s go. 💪

---

<img alg="Orange sky with clouds" height="800" src="/blog-assets/building-your-first-graphql-server/orange-clouds.webp" width="1200">

---

## GraphQL Structure

In a normal RESTful API, we have our typical `GET`, `POST`, `PUT`, and `DELETE` requests. These have been the gold standard for HTTP requests for years, and with good reason; they work, and they work well.

However, modern applications keep running into situations where developers have to build out an excessive number of endpoints. This can create a burden on the development process, and it certainly expands the amount of documentation that is required for the API.

In contrast, GraphQL simplifies everything down to one endpoint, `/graphql`. Open up the `server.js` file inside the api directory and look for the following code snippet:

```javascript
server.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: false,
  })
);
```

This is the single endpoint, a gateway into our server. It will allow us to perform all of our queries and mutations (which replace our `GET`, `POST`, `PUT`, and `DELETE` requests). In order for our server to work, our next step needs to be to flesh out the schema that we use in the code snippet above. Notice that there’s already an import statement in our `server.js` file for it that looks like this:

```javascript
const schema = require("../schema/schema.js");
```

Additionally, check out the `expressPlayground` middleware import that is also contained in our `server.js` file. The import statement looks like this:

```javascript
const expressPlayground =
  require("graphql-playground-middleware-express").default;
```

Out of the box, GraphQL comes with `GraphiQL`, an IDE to practice server calls in your browser. I’ve replaced it with `GraphQL Playground` (and turned off `GraphiQL` with the `graphiql: false` statement in the snippet at the beginning of this section) as it is much more robust and better looking (which is obviously the most important quality in the development process 💅).

The configuration for this is also in the server.js file with the following code:

```javascript
server.get("/playground", expressPlayground({ endpoint: "/graphql" }));
```

This allows us to use our new `GraphQL Playground` IDE. With your server running (which, just in case you shut it down, can be done with the command `yarn server`), got to `localhost:4000/playground` link in your browser. Your preferred browser will open up and you’ll be taken to a page that looks like this:

<img alg="Initial screen when firing up GraphQL Playground" height="1009" src="/blog-assets/building-your-first-graphql-server/graphql-playground-initial.webp" width="1473">

Doesn’t that dark mode in `GraphQL Playground` look amazing? If you’re seeing this, you’re in the right place. However, our server has a problem — We have an error (visible in the image above) that says that the server can’t be reached. It’s currently doing that because we still need to build out our queries, schemas, and migrate over our tables and data.

Let’s flip over to the next section and get to work on our GraphQL server structure.

---

> “When one tugs at a single thing in nature, he finds it attached to the rest of the world.”
>
> — John Muir

---

## GraphQL Types

GraphQL is a strongly-typed querying language. This means that it validates the types of data that we are manipulating while using it. In order for this to work, we have to define `Types` — These will correspond directly to the tables in our SQL database (although you are certainly free to use no-SQL databases like MongoDB with GraphQL), and correlate to the use of objects or structs in Object Oriented Programming with languages like Java, Golang, and C.

In order to define a type, you must use imports from the `graphql` dependency to define strings, integers, and other data types that you expect to receive through GraphQL for each field (username, email, etc.). Here’s an example of a `UserType` that we’ll be using in our server:

```javascript
const graphql = require("graphql");

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLNonNull } = graphql;

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    pictureUrl: { type: GraphQLString },
    street1: { type: GraphQLString },
    street2: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    zip: { type: GraphQLString },
    type: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

module.exports = {
  UserType,
};
```

Notice how we’re requiring the package `graphql` and then destructuring out our types from it (strings, ID, object, etc.). We can then define a schema, or group of fields, of what we expect to receive for a given object of data (in this case, our users). Finally, we’re exporting our `UserType` out to use later in our server.

Go ahead and make a file called `types.js` in the `schema` directory of the server in your server files. Look over the code below, and then put the following code into the file:

```javascript
const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
} = graphql;

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    pictureUrl: { type: GraphQLString },
    street1: { type: GraphQLString },
    street2: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    zip: { type: GraphQLString },
    type: { type: GraphQLString },
    phone: { type: GraphQLString },
    candy: {
      type: new GraphQLList(CandyType),
      resolve(parent, args) {
        return Candy.findByUserId(parent.id);
      },
    },
  }),
});

module.exports = {
  UserType,
};
```

See that field called `candy`? That’s interesting, right?

Remember how we were talking earlier about `edges` and how they connect `nodes`, or `vertices`, together? Well, this is where we’re defining an `edge` that will connect us along our graph in our database to another `node`. Notice that we define the `candy` field as being a `GraphQLList` (which means it will essentially show up as an array of candy in our `JSON`) of `CandyType`. Furthermore, the resolver function returns a database query where we search `PostgreSQL` for the parent’s `id` property (essentially the user’s `id` from the fields above).

We’ll use this field later to access data about the `candy` table associated with each user in the `user` table.

However, we have a bit of a problem — we don’t have a `CandyType` that this field seems to be referencing. For time’s sake, I’m going to give you this code to copy-and-paste into your code right below the `UserType`. Here’s the completed file code for you:

```javascript
const graphql = require("graphql");
const User = require("../models/userModel.js");
const Candy = require("../models/candyModel.js");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
} = graphql;

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    pictureUrl: { type: GraphQLString },
    street1: { type: GraphQLString },
    street2: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    zip: { type: GraphQLString },
    type: { type: GraphQLString },
    phone: { type: GraphQLString },
    candy: {
      type: new GraphQLList(CandyType),
      resolve(parent, args) {
        return Candy.findByUserId(parent.id);
      },
    },
  }),
});

const CandyType = new GraphQLObjectType({
  name: "Candy",
  fields: () => ({
    id: { type: GraphQLID },
    candyName: { type: new GraphQLNonNull(GraphQLString) },
    userId: { type: new GraphQLNonNull(GraphQLID) },
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId);
      },
    },
  }),
});

module.exports = {
  UserType,
  CandyType,
};
```

We’ve now completed the circle. We have a `CandyType` that will pull information from our database (and even has the ability to query the user associated with each candy in the `user` field above) but is also connected to its corresponding user (in a one-to-many relationship from the `user` table to the candy table).

We’re about to see how useful all of this is. The next sections will be crazy, but they’ll go really fast. We’ll have your server finished in no time. 🔥 🚒

---

<img alg="Dark water" height="801" src="/blog-assets/building-your-first-graphql-server/dark-water.webp" width="1200">

---

## GraphQL Queries

Queries are analogous to `GET` requests on a RESTful API, but the way in which we can write them in GraphQL (which we saw at the beginning of this article) makes them really unique and extremely declarative.

In software engineering, [declarative design](https://en.wikipedia.org/wiki/Declarative_programming?ref=hackernoon.com) (in case you don’t want to spend the next 10 minutes waist-deep in that Wikipedia link) is any process that allows you to write your code in a way that describes what it does instead of how it does it.

Create a new file in your `schema` directory called `query.js`, and paste the following code into it. It’s a lot, but there’s a ton of repetition (as you’ll see soon) that makes it ultimately easy to learn:

```javascript
const graphql = require("graphql");
const Candy = require("../models/candyModel.js");
const User = require("../models/userModel.js");
const { UserType, CandyType } = require("./types.js");

const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllUsers: {
      type: new GraphQLList(UserType),
      description: "Gets all users",
      resolve() {
        return User.find()
          .then((res) => {
            if (res.length) {
              return res;
            }
            return new Error("The users could not be found.");
          })
          .catch(() => {
            return new Error("There was an error completing your request.");
          });
      },
    },
    getUserById: {
      type: UserType,
      description: "Gets a user by user ID",
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return User.findById(args.id)
          .then((res) => {
            if (res) {
              return res;
            }
            return new Error("The user could not be found.");
          })
          .catch(() => {
            return new Error("There was an error completing your request.");
          });
      },
    },
    getAllCandy: {
      type: new GraphQLList(CandyType),
      description: "Gets all candy",
      resolve() {
        return Candy.find()
          .then((res) => {
            if (res.length) {
              return res;
            }
            return new Error("The candy could not be found.");
          })
          .catch(() => {
            return new Error("There was an error completing your request.");
          });
      },
    },
    getCandyById: {
      type: CandyType,
      description: "Gets a candy by candy ID",
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return Candy.findById(args.id)
          .then((res) => {
            if (res) {
              return res;
            }
            return new Error("The candy could not be found.");
          })
          .catch((err) => {
            return new Error("There was an error completing your request.");
          });
      },
    },
  },
});

module.exports = RootQuery;
```

Don’t worry. Like I said, it’s a lot of repetition. Let’s take the `getCandyById` query at the end of the file above and dissect it (since it’s close to us right now and is a great example of the rest of the queries).

First, we define what “type” our query is supposed to return. We just coded those up in the last section, and we imported them at the beginning of this `query.js` file.

Second, we have a description of the query. This will pop up in GraphQL Playground. It’s not necessary, but it’s a really nice touch for other developers to read in `GraphQL Playground` later when they’re testing out writing queries for our server.

Next, we have our arguments, or `args`. These are what we expect our server to receive when someone makes this `getCandyById` query. In this instance, we have an `id` argument of type `GraphQLID`. This is a unique import from the `graphql` package that allows the argument sent to our server to be either a number or a string (i.e. 1 or “1”).

Additionally, we have a `resolve` function. This takes in `parent` properties (which we aren’t using here) as the first argument and `args` (or arguments, our `id` in this case) as the second one. We then proceed to query our `PostgreSQL` database and return the response in our promise. If the data cannot be found, we return a new error with a message.

Finally, navigate over to your `schema.js` file, and update it to look like this:

```javascript
const graphql = require("graphql");
const { GraphQLSchema } = graphql;
const RootQuery = require("./query.js");

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: null,
});
```

We just imported the queries from query.js and placed it into our schema setup. The only thing we still need to do in order to use our server is to roll out some mutations.

Hold onto your butts. 👍

---

> “Invisible threads are the strongest ties.”
>
> — Friedrich Nietzsche

---

## GraphQL Mutations

The final puzzle piece for our server is to upgrade our code with “mutations.” These are the GraphQL equivalents of `POST`, `PUT`, and `DELETE` requests in a RESTful API.

Create a new file called `mutation.js` and paste the following code in:

```javascript
const graphql = require("graphql");
const User = require("../models/userModel.js");
const { UserType } = require("./types.js");

const { GraphQLString, GraphQLNonNull, GraphQLID, GraphQLObjectType } = graphql;

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    addUser: {
      type: UserType,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        pictureUrl: { type: GraphQLString },
        street1: { type: GraphQLString },
        street2: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        zip: { type: GraphQLString },
        type: { type: GraphQLString },
        phone: { type: GraphQLString },
      },
      resolve(parent, args) {
        return User.insert(args)
          .then((res) => {
            if (res) {
              return res;
            }
            return new Error("The new user could not be created.");
          })
          .catch(() => {
            return new Error("There was an error completing your request.");
          });
      },
    },
    updateUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        username: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        pictureUrl: { type: GraphQLString },
        street1: { type: GraphQLString },
        street2: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        zip: { type: GraphQLString },
        type: { type: GraphQLString },
        phone: { type: GraphQLString },
      },
      resolve(parent, args) {
        return User.update(args.id, args)
          .then((res) => {
            if (res) {
              return res;
            }
            return new Error("The user could not be updated.");
          })
          .catch(() => {
            return new Error("There was an error completing your request.");
          });
      },
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return User.remove(args.id);
      },
    },
  }),
});

module.exports = Mutation;
```

Once again, I know this looks like a lot, but it’s ultimately just a lot of repetition. Let’s look at the `deleteUser` mutation here at the end of the file as an example.

Notice that we’ve once again defined our type, `UserType`. In addition, we’re expecting an argument of `id`. Finally, we are using a resolver function to ping our `PostgreSQL` database and remove the row of user data where the `args.id` matches the user.

Look over the other mutations using this knowledge and see if you can figure out what everything else is doing. There’s nothing complicated here; it’s all just more of the same from what you’ve already seen. When you're done, update the `schema.js` file one more time to import our mutations and look like this:

```javascript
const graphql = require("graphql");
const { GraphQLSchema } = graphql;
const RootQuery = require("./query.js");
const Mutation = require("./mutation.js");

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
```

---

## Using GraphQL Playground

It’s time to enjoy using our GraphQL server. 🍾 🎉 🎊 🙌

First, let’s migrate our data tables and seeds on `PostgreSQL` by running the following commands in your terminal:

1. `npx knex migrate:latest`
2. `npx knex seed:run`

Once you’ve finished, run the command `yarn server` in your terminal (if you’re not already running your server) and click on the `localhost:4000/playground` link.

Then, write the following query in the lefthand side of the screen and press the “play” button:

```graphql
query {
  getAllUsers {
    id
    username
    email
    street1
    city
    state
    zip
    type
    phone

    candy {
      id
      candyName
    }
  }
}
```

This queries our server for all users and returns the fields above that we requested. Your `GraphQL Playground` instance should look like this:

<img alt="GraphQL Playground setup for a query" height="923" src="/blog-assets/building-your-first-graphql-server/graphql-playground-query.webp" width="1200">

Finally, let’s do a quick mutation. Open a new tab in `GraphQL Playground`, and paste the following mutation into the lefthand side of the screen before pressing the “play” button:

```graphql
mutation {
  addUser(
    username: "martymcfly"
    email: "outoftime@future.com"
    street1: "9303 Lyon Drive"
    city: "Hill Valley"
    state: "CA"
    zip: "95420"
    phone: "(777) 777-7777"
  ) {
    id
    username
    email
    street1
    city
    state
    zip
    type
    phone
  }
}
```

This should create a new user and return data as we’ve specified in the return fields we expect above. Your browser window should look like the following:

<img alt="GraphQL Playground setup for a mutation" height="923" src="/blog-assets/building-your-first-graphql-server/graphql-playground-mutation.webp" width="1200">

See if you can write other mutations and queries out. You can check out the various ones available to you (along with the types we created on the server) by clicking on the `DOCS` and `SCHEMA` tabs on the righthand side of the page:

<img alt="GraphQL Playground setup for introspecting types, mutations, and queries" height="923" src="/blog-assets/building-your-first-graphql-server/graphql-playground-introspection.webp" width="1200">

---

## Conclusion

Now that we’ve been through a full tour of duty with GraphQL, hopefully you can see why people enjoy using it. It’s simple (once you get it set up), and it’s honestly a lot of fun.

See if you can go back to the `mutations.js` file and make all of the mutations for the `CandyType`, including a `createNewCandy`, `updateCandyById`, and `deleteCandyById`.

Finally, as you continue to build out APIs, GraphQL is a great choice; pairing it with `ExpressJS` makes middleware implementation easy, and our PostgreSQL setup means you can now scale this framework with one of the most popular databases out there.

If you end up building something awesome, feel free to tweet me with it. I’d love to see what you can create. 🏗

---

## Additional Resources for Your Journey

1. [GraphQL Documentation](https://graphql.org/?ref=hackernoon.com) — The official documentation on GraphQL is excellent and a great way to get started with customizing this server for your own application
2. [Apollo-Client](https://www.apollographql.com/docs/react/) — Apollo-Client is a great way to get started with a more full-fledged server setup for using GraphQL
3. [Resolver Best Practices](https://medium.com/paypal-tech/graphql-resolvers-best-practices-cd36fdbcef55) — A brilliant article on best practices while writing your resolver functions in GraphQL

Thanks for reading. 🔥

Nathan

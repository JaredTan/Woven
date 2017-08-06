# Woven
Happily stay in touch with your SO or best friend!

[Link]()

Woven is an iOS application connecting loved ones over time and space through engaging, interactive experiences and a shared digital space. 

Woven will be implemented using a MERN Stack and React Native.

## Minimum Viable Product

This app will, at a minimum, satisfy the following criteria with smooth, bug-free navigation:

- [ ] Hosting
- [ ] Demo Page
- [ ] New User Sign Up and Sign In, Demo Login
- [ ] Profile
- [ ] Home Page
- [ ] Virtual Plant
- [ ] Instant Messaging
- [ ] Playdates via Google Maps + Google Calendar API
- [ ] To-do List
- [ ] Production README
- [ ] Uber Together (Bonus!)
- [ ] Open Authentication (Bonus!)
- [ ] Live Video 

## Design Documents (TBA)

* [View Wireframes][views]
* [API Endpoints][api_endpoints]
* [React Components][component_hierarchy]
* [Sample State][sample-state]

[views]: ./views.md
[api_endpoints]: ./api-endpoints.md
[component_hierarchy]: ./component-hierarchy.md
[sample-state]: ./sample-state.md

## Implementation Timeline

### Phase 1: Learn Technologies (2 days)

+ Objective: All group members should be familiar with the workflow and each component of the MERN stack.

### Phase 2: Backbone (3 days)

+ Phase 2a: User Authentication (1 day):
  + Objective: Set up user authentication via React Native.


+ Phase 2b: Splash + Home/Index Page (1 day):
  + Objective: Set up functional index page for the application, that allows for easy access to other features.


+ Phase 2c User Profiles (1 days):
  + Objective: Set up User Profiles


### Phase 3: MVP Features  (4 days)

+ Phase 3a: Virtual Plant (1 day)
  + New plant
  + Name
  + Water
  + Icon

+ Phase 3b: Instant Messaging w/ [socket.io](https://socket.io/) (1 day)
  + Stickers / Emoticons
  + Photos
  + Mood tracker / status

+ Phase 3c: Playdates (1 day)
  + Google Calendar API
  + Google Maps API

+ Phase 3d: To-do List (1 day)
  + Reminders + Push Notifications
  + Snail Mail
  + Highlight Updates


## Background of Technologies

### MERN Stack

+ Why MERN?
  +  JavaScript is used for client-side code as well as server-side code. Even MongoDB scripts are written in JavaScript. So, the only language we need to know and be comfortable with is JavaScript.

  + React Native enables quick prototyping and a very high initial velocity. Implementing basic features is easy, and if needed, they can be extended with native code and native views.

  + When using the MERN stack, object representation is JSON (JavaScript Object Notation) everywhere – in the database, in the application server and on the client, and even on the wire. Saves a lot of hassle.

  + MERN uses Node.js, which has access to the NPM packages, similar to Ruby Gems.

  + MERN allows for SEO-friendly applications through the virtual DOM provided by React.

### Cons

  + Node.js is inefficient at CPU-intensive operations, but good for quick simultaneous actions (like chat).


## Technologies included in the MERN stack

### MongoDB
[mongoDB](https://npmjs.org/package/mongodb)

+ MongoDB is the database used in the MERN stack. Uses a NoSQL document-oriented database, with a flexible schema and a JSON based query language.
    + For example, for our app, we would have users and photos. Typically, a relational database would create two tables - one for users, one for photos with `user_id`. With a NOSQL database, we would store all the data as a single document, and fetch it all at once with any level of nesting.
    + MongoDB has the ability to index on deeply nested fields unlike RDBMS's
    + Storing an object in a MongoDB database does not have to follow a schema like Rails.
    + MongoDB's query language is based on JSON: you create, search for, make changes, delete documents by specifying the operation in a JSON object. The query language is not English-like (you don't SELECT or say WHERE), and therefore much easier to construct programmatically.
    + Data is also retrieved in JSON format.
    + Comes with a shell built on JS runtime like Node.js. (Like Rails C but for MongoDB)

### Express.js
[express](http://expressjs.com/)


+ The Express.js framework provides specific routes for data retrieved from HTTP requests.

+ Acts as the rails for Node.js.

+ Express parses request URL, headers and parameters via Regex. On the response side, it has, as expected, all functionality required by web applications. This includes setting response codes, setting cookies, sending custom headers etc. Further, you can write Express middleware, custom pieces of code that can be inserted in any request / response processing path to achieve common functionality such as logging, authentication etc.

### React Native
[react native](https://github.com/facebook/react-native)
+ React Native library lets you build mobile apps using Javascript and React, indistinguishable from apps built with Obj-C, Swift, or Java.

### Node.js

[node.js](https://github.com/nodejs/node)
+ Google's V8 run-time environment used for running server-sided JavaScript. Used alongside express with MongoDB.

## Examples of why Node.js should be used

### CHAT

Chat is the most typical real-time, multi-user application.

Chat is the sweet-spot example for Node.js since it’s a lightweight, high traffic, data-intensive (but low processing/computation) application that runs across distributed devices. It’s also a great use-case for learning too considering this is the first time working with this technology. It’s simple, yet it covers most of the paradigms ever used in a typical Node.js application.

**How it works in Woven**

In Woven, we are dealing with a single chatroom / chatbox with two people.

On the **server side**, we have a simple Express.js application which does 2 things:

+ 1) a `GET '/'` request handler in the chatroom box, for the message board / Send button to create a new message.

+ 2) Websockets server for messages from websocket clients.


+ **Websockets**: an upgrade to typical HTTP requests - allows for bi-directional data transfer between the client and server.
[socket.io](https://socket.io/) seems to be the best.
(as opposed to HTTP unidirectional flow where the server must take on all the client requests before moving on)

On the **client side**, we have:

+ a) an HTML page with 2 handlers
  + 1) on the Send button, which picks up the input message
  + 2) one that listens for new messages on the websockets client, AKA listens for messages sent by the SO, to update the `current_user`'s' message board.

**Step by step** here’s what happens when `current_user` sends a message.:

+ 1) web browser notices the 'Send' button click through a JS event handler, obtains value from the `e.currentTarget.value`.
+ 2) emits a websocket message through the websocket client connected to the server.
+ 3) the SO receives the new message as a push message through a websocket component running in the SO's web-page.
+ 4) message is obtained, and webpage is updated.


### API Endpoints with MongoDB

If we were using Rails, we would need to convert to and from JSON. With Node.js, we can simply deliver JSON objects through RESTful APIs for the client. With MongoDB, we don't have to worry about the conversion between JSON and Ruby. Also, we avoid the need for multiple data-type conversions by using a uniform data serialization format across the client, server, and database.


## Sources

+ node.js
  + http://rationalappdev.com/api-backend-with-nodejs-express-and-mongodb-for-react-native-apps/
  + https://www.toptal.com/nodejs/why-the-hell-would-i-use-node-js
https://www.apress.com/gp/blog/all-blog-posts/why-mern/12056000


+ react native
  + https://medium.com/@MentorMate/best-practices-for-building-an-app-with-react-native-components-7dee3b2b010f


+ node.js used w/ websockets
  + https://code.tutsplus.com/tutorials/using-nodejs-and-websockets-to-build-a-chat-service--net-34482
  + http://codular.com/node-web-sockets


## Group Workflow
Our general workflow will look something like this:

0) Fork/Clone master
1) Branch on feature
2) Code and commit locally
3) Pull request
4) Review Api -> Approval (from all other members) / Discussion
6) Merge master




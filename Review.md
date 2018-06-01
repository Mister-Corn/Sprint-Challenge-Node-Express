# Review Questions

## What is Node.js?

Node.js is a Javascript platform. It's important because Node.js allows Javascript to be executed outside of the browser, allowing things like a JS-based backend to be possible.

## What is Express?

Express is a "web application framework" used in Node.js. (*Thanks Wikipedia!*) This means that Express provides general functionality for servers running Node.js for accepting requests and sending responses. This functionality can be modified and tailored to one's needs through middleware. You don't need Express to make a Node.js server, but it makes it a lot easier by streamlining and abstracting a lot of the heavy lifting.

## Mention two parts of Express that you learned about this week.

* Express is *not* a server. It helps us make servers in Node.js.
* How nearly everything in Express is middleware, even the request handling functions!

## What is Middleware?

Middleware are functions which have access the `req` and `res` object in Express. Because of this, the functions can extend the functionality of Express. Middleware works by manipulating the `req` and `res` object as it passes through each middleware function. Some middleware might refine the `req` (*request*) object so middleware later in the queue can better process the request received from the client, while other middleware, particularly endpoint middleware, would mainpulate the `res` (*result*) object to be sent back to the client.

## What is a Resource?

In the context of an API, a resource is a data asset, like user/employee data, or a list of Star Wars characters, which the API manages. For example, SWAPI has a database full of Star Wars information about characters, movies, actors, planets, etc. This store of information is the resource which you use the API SWAPI provides to retrieve and use in your own application. 

## What can the API return to help clients know if a request was successful?

API's can return HTTP status codes to inform the client about the result of the request. For example, the API can return `200` to signal a successful request, or `404` to tell the client a resource could not be found at a specified endpoint.

## How can we partition our application into sub-applications?

We can parition our server application into sub-applications through the user of `express.Router()`. This allows us to separate our endpoint middleware functions, creating smaller focused files dealing with a specific group of endpoints, instead of a large "monolithic" `server.js` file.

## What is CORS and why do we need it?

CORS stands for `Cross-Origin Resource Sharing`. This allows servers to screen clients as they make requests, and restrict requests for clients who are not whitelisted. This restriction allows for better security of the server.
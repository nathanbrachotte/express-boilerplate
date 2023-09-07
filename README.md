# express-boilerplate

A simple and (wannabe) less opinionated typescript/express boilerplate.

## Why

I needed a simple express boilerplate to kickstart ideas quickly without losing time finding the fitting express boilerplate, without highly abstracted routing, which implements TS but doesn't already have a DB or ORM implemented.

**So I wrote mine ([I know what you're thinking.](https://xkcd.com/927/))**

## What

This boilerplate contains:

- Simple routing system
- Stateless JWT Authentication set as a cookie
- Schema & data validation with Joi
- Integration tests with supertest
- Pre-made HTTP test requests
- A naive, DB-like system using fs & JSON (this implementation only exists for testing purposes, DO NOT do this in production and replace it immediately with the DB of your choosing).
- env validation
- a bunch of useful middlewares (helmet, hpp, morgan)

## TODO

- [ ] Unit test for specific middlewares
- [ ] Remove verbose lots when running tests
- [ ] Integrate swagger generation with [swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc) & [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express)

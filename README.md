# nodejs-jwt-authentication

Basic authentication using [JWT (JSON web tokens)](https://jwt.io/) - token secret in `.env` file.

Uses [MongoDB Atlas](https://cloud.mongodb.com/) (cloud database) - connection string in `.env` file.

### How it works

You get a JWT when you login. Attach it to the header(`auth-token`) when making requests and decode it server side to map requests to a specific user.

### Structure

`index.js` - server, DB connection - uses *express*, *mongoose*, *dotenv*

`validation.js` - **utility** data validation - uses *@hapi/joi*

`model/User.js` - mongoose Schema for User objects - uses *mongoose*

`routes/auth.js` - main API file - uses *express.Router*, *bcryptjs*, *jsonwebtoken*

`routes/posts.js` - private API, checks for authentication - uses *express.Router*

`routes/verifyToken.js` - **utility** checks for JWT in requests - uses *jsonwebtoken*

### Modules

* `express` for routing
* `mongoose` for DB access
* `nodemon` for automatically restarting server file after saving modifications
* `dotenv` for loading credentials and secrets from `.env` file
* `@hapi/joi` for data validation
* `bcryptjs` for encrypting passwords
* `jsonwebtoken` for creating / reading JWT

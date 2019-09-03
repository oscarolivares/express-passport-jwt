# express-passport-jwt

#### Auth system with jwt

Signup, Login and protected routes.

Example of use:

First of all you must create a .env file like this:

```
## .env

# Server port number
PORT=3000

# DB connection URI
DB_URI=mongodb://localhost/passportJwtTest

# Secret for encryption of jwt signature
JWT_SECRET=SECRET

# Number of rounds for Blowfish algorithm for hashing user password
BCRYPT_ROUNDS=12

# Lifetime of the token (in seconds)
JWT_LIFETIME=86400

# Algorithm used in token signing
JWT_ALGORITHM=HS256
```

Then run

    $ yarn install
    $ yarn start

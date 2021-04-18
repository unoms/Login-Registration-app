# Login & Registration app

This is a test application with login system. Use a **registration** route to register a new user.

Registered users are allowed to visit the **/protected** route
All users may perform a regular user role and admin role. Admin role enables to list users by visiting the **/users** route

Features:

*There're some tests based on jest and supertest. In order to start a test run the following command: npm run test

*PassportJS (local) middleware is used to authenticate users

*HBS is used as a view engine

*Configuration info is stored in config.js

*Mongo is used to store users

## SETUP Mongo

db.createCollection("roles")
db.roles.insertMany([{"role": "ADMIN"}, {"role":"USER"}])

db.createCollection("users")
db.users.insertOne({"email": "admin@admin.com", "password":"$2b$10$EBvd0lV0jyOXTmQTY9ZPA.IZ5tYgfGeGpFUtoglXz0sg3pE34gYnO", "role": "ADMIN"})
password for enter: 12345678
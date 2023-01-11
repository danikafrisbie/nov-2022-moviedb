# MERN - Stack
M- MongoDB
E- Express
R- React
N- Node

Different kinds of developers assigned to each section of MERN (or PERN) in a project...

### Traditional Datasets
Databases - traditional databases are usually a collection of tables (user, products, movies, blog) that *relate* to each other 

Tables - Primary key (ID) columns inside the table (i.e. username, first name, last name, DOB) with foreign keys (F-IDs) that relate table data 

Records - Rows of values that are stored in the table

### Mongo Database
Database = Database
Collections = Tables
Documents = Records

Mongo is a database made up of a series of individual documents (like "records"). The documents can be arranged or pulled into collections. Creates a lot of flexibility! 

## Starting up a server
1. Need a Package.json file (`npm init -y`)
2. Install Express: (`npm i express`)
3. Install Mongoose: (`npm i mongoose`)
4. Install dotenv: (`npm i dotenv`)
5. Update packagejson from index.js to app.js

### .gitignore
Git Ignore - tells your git repo to ginore certain file and folders from being tracked 

- Create a .gitignore
- Add `/nodemodules`


### .env file
- Contains constants that are specific for our environment
- Store items in there that you 

### Connecting to db
- require "mongoose" 
- list name and location of database to connect to! 



## Creating Models
- Models help define what your database collection will look like
- Define your collection first, then create endpoints (routes)
- Boiler Plate: 

```js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    // Define the collection "columns" here 
});

// This will create a User collection, using the user schema we defined above 
module.exports = mongoose.model("User", UserSchema)


## Controllers

- They will take in user requests and send back information
- Controllers will do the work and will Create, Read, Update, or Delete from the Database.

## Bcrypt - Hashing Passwords

- this will encrypt our password
- `npm i bycrypt` in order to use it in your files.
- to hash that password you can use this example

```js
bcrypt.hashSync(req.body.password, 10);
```

- you will need to use `bycrypt.compare()` to compare the passwords: this will return true or false

```js
const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
```

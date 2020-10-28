# ArangoSDK

ArangoSDK is a very simple and light weight tool for basic ArangoDB operations.

## Installation

Use npm to install ArangoSDK.

```bash
npm install @mattnick/arangosdk
```

## Usage

```javascript
const ArangoSDK = require('@mattnick/arangosdk');
const db = new ArangoSDK('url', 'databaseName', 'username', 'password');

```

## Queries

```javascript
const ArangoSDK = require('@mattnick/arangosdk');
const db = new ArangoSDK('url', 'databaseName', 'username', 'password');

const results = await db.query("FOR doc IN `users` FILTER doc.userID ==  @uid RETURN doc",{uid: 34543});

//results example
/*

    Success:
    {error: null, keys: [...], length: 3}

    Error:
    {error: {some arango error}}

*/

if(!results.error){
    //do something
    results.keys.forEach((row)=>console.log(row))
}else{
    console.log(results.error);
}

```

## Insert

```javascript
const ArangoSDK = require('@mattnick/arangosdk');
const db = new ArangoSDK('url', 'databaseName', 'username', 'password');

const user_data = {name: "bob", email: "bob@example.com"};
const result = await db.insert("users", user_data);

//result example
/*

    Success:
    {error: null, meta: {_id: "users/343534543", _rev: 33453534}}

    Error:
    {error: {some arango error}}

*/

if(!result.error){
    //do something
    console.log(result.meta._id);
}else{
    console.log(result.error);
}

```

## Update

```javascript
const ArangoSDK = require('@mattnick/arangosdk');
const db = new ArangoSDK('url', 'databaseName', 'username', 'password');

const user_data = {name: "bob", email: "bob.jones@example.com"};
const result = await db.update("users", "users/343534543", user_data);

//result example
/*

    Success:
    {error: null, meta: {_id: "users/343534543", _rev: 33453535}}

    Error:
    {error: {some arango error}}

*/

if(!result.error){
    //do something
    console.log(result.meta._id);
}else{
    console.log(result.error);
}

```

## Remove

```javascript
const ArangoSDK = require('@mattnick/arangosdk');
const db = new ArangoSDK('url', 'databaseName', 'username', 'password');


const result = await db.remove("users", "users/343534543");

//result example
/*

    Success:
    {error: null}

    Error:
    {error: {some arango error}}

*/

if(!result.error){
    //do something
    console.log("Document was removed!");
}else{
    console.log(result.error);
}

```


## License
[MIT](https://choosealicense.com/licenses/mit/)
var arangojs = require("arangojs");
var Database = arangojs.Database;

class ArangoSDK {
    
    constructor(url, database, username, password){
        this.url = url;
        this.database = database;
        this.username = username;
        this.password = password;
        this.instance = new Database({
            url: url,
            databaseName: database,
            auth: { username: username, password: password }
        });
    }

    query(aql, vars = {}){
        return new Promise((resolve)=>{
            this.instance.query(aql, vars)
            .then((cursor) => cursor.all())
            .then((docs)=> resolve({error: null, docs: keys, length: keys.length}),
            (err)=>resolve({error: err}))
        })
    }

    insert(coll, document){
        return new Promise((resolve)=>{
            this.instance.collection(coll).save(document).then(
                (meta) => resolve({error: null, meta: meta}),
                (err) => resolve({error: err})
            );
        })
    }

    update(coll, id, document){
        return new Promise((resolve)=>{
            this.instance.collection(coll).update(id, document).then(
                (meta) => resolve({error: null, meta: meta}),
                (err) => resolve({error: err})
            )
        })
    }

    remove(coll, id){
        return new Promise((resolve)=>{
            this.instance.collection(coll).remove(id).then(
                () => resolve({error: null}),
                (err) => resolve({error: err})
            )
        })
    }

    swap(database, username, password){
        this.database = database;
        this.username = username;
        this.password = password;
        this.instance.useDatabase(this.database);
        this.instance.useBasicAuth(this.username, this.password);
    }

}

module.exports = ArangoSDK;
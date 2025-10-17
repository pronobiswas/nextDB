const { MongoClient } = require('mongodb');
import mongoose from "mongoose";

let projectName = "mongoWithNext";
let dbUserName = "bpronobbiswasinfo_db_user";
let dbPassword = "cCoxp4od5UV1kv9w"
const uri = `mongodb+srv://bpronobbiswasinfo_db_user:cCoxp4od5UV1kv9w@nextdb.ixo1vdg.mongodb.net/?retryWrites=true&w=majority&appName=nextDB`;
const globalAny = global;

const cache = globalAny._mongoCache || (globalAny._mongoCache = { conn: null, promise: null });

async function connectToDatabase() {
    if (cache.conn) return cache.conn;

    if (!cache.promise) {
        cache.promise = mongoose.connect(uri)
            .then((mongooseInstance) => mongooseInstance)
            .catch((err) => {
                cache.promise = null;
                throw err;
            });
    }

    cache.conn = await cache.promise;
    return cache.conn;
}

module.exports = connectToDatabase;
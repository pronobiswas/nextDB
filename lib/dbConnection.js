const { MongoClient } = require('mongodb');
import mongoose from "mongoose";

// let projectName = "mongoWithNext";
// let dbUserName = "bpronobbiswasinfo_db_user";
// let dbPassword = "cCoxp4od5UV1kv9w"
const uri = `mongodb+srv://bpronobbiswasinfo_db_user:cCoxp4od5UV1kv9w@nextdb.ixo1vdg.mongodb.net/?retryWrites=true&w=majority&appName=nextDB`;
// const globalAny = global;
// const mongoose = require('mongoose');
// const uri = "mongodb+srv://bpronobbiswasinfo:<db_password>@cluster0.q1czh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

export async function dbConnection() {
  try {
    await mongoose.connect(uri, clientOptions);
    console.log("✅ Pinged your deployment. Successfully connected to MongoDB!");
    return mongoose.connection;

  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
}


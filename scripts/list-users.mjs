#!/usr/bin/env node
import mongoose from 'mongoose';

// This script lists all documents from the 'users' collection.
// Usage (PowerShell):
// $env:MONGODB_URI = 'your-connection-string'; node .\scripts\list-users.mjs
// OR (single-line): $env:MONGODB_URI='your-connection-string'; node .\scripts\list-users.mjs

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('Error: MONGODB_URI environment variable is not set.');
  console.error('Set it and re-run, for example (PowerShell):');
  console.error("$env:MONGODB_URI='mongodb+srv://<user>:<pass>@cluster.../dbname?retryWrites=true&w=majority'; node .\\scripts\\list-users.mjs");
  process.exit(1);
}

async function main() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(uri, { bufferCommands: false });

    const db = mongoose.connection.db;
    const collNames = await db.listCollections().toArray();
    console.log('Collections in DB:', collNames.map(c => c.name).join(', '));

    const users = await db.collection('users').find({}).toArray();
    console.log(`Found ${users.length} user(s):`);
    console.log(JSON.stringify(users, null, 2));
  } catch (err) {
    console.error('Error while listing users:', err);
    process.exitCode = 2;
  } finally {
    await mongoose.disconnect();
  }
}

main();

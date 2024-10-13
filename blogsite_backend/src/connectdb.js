import {MongoClient} from "mongodb";
let db;

async function connectDB(cb){
    // connecting to the database
    // const client = new MongoClient(`mongodb+srv://${process.env.MONGO_USERNAME }: ${process.env.MONGO_PASSWORD}@cluster0.wiqpo.mongodb.net/`);
    const client = new MongoClient(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.wiqpo.mongodb.net/`);
    await client.connect();
    // connecting to the specific database
    db = client.db('blog-site-db');
    cb();
}
export {
    db,
    connectDB
}
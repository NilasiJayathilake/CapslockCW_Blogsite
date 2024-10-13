import express from 'express';
import {connectDB, db} from "./connectdb.js";
import 'dotenv/config'
import fs from 'fs';
import admin from 'firebase-admin';

// telling firebase which credentials to use
const creditKey = JSON.parse(
    fs.readFileSync('./private_key.json')
);
admin.initializeApp({
    credential: admin.credential.cert(creditKey),
});

//creating middleware so the body of the request could be displayed
const app = express();
app.use(express.json());

// authtoken is what the frontend uses to prove that a user is logged in
//creating a new express app to call the user info from firebase
app.use(async(req,res,next)=>{
    const {authtoken}  = req.headers;
    if (authtoken){
        try {
            req.user = await admin.auth().verifyIdToken(authtoken);
        }catch (e) {
            return res.sendStatus(404);
        }
        req.user = req.user || {};
        next();
    }
});

//creating a connection with Mongo DB
app.get('/api/articles/:name', async (req,res) =>{
    const {name} = req.params;
    const {uid} = req.user;
    const article = await db.collection('articles').findOne({name});
    if (article){
        const upvoteIDs = article.upvoteIDs || [];
        article.eligibility = uid && !upvoteIDs.includes(uid);
        res.json(article);
    } else {
        res.sendStatus(404);
    }
})

app.use((req,res,next)=>{
    const userloggedIn = req.user;
    if(userloggedIn){
        next();
    } else{
        res.sendStatus(401);
    }
})

// End point to Upvote : updated
app.put('/api/articles/:name/upvote', async (req,res) =>{
    const {name} = req.params;
    const {uid} = req.user;

    const article = await db.collection('articles').findOne({name});
    if (article){
        const upvoteIDs = article.upvoteIDs || [];
        const eligibility = uid && !upvoteIDs.includes(uid);
        if(eligibility) {
            await db.collection('articles').updateOne({name}, {$inc: {upvote: 1}, $push: {upvoteIDs: uid}});
        }
        // else{
        //     await db.collection('articles').updateOne({name}, {$pull:{upvoteIDs:uid}})
        // }
    const upvotedArticle =  await db.collection('articles').findOne({name});
    res.json(upvotedArticle);
    } else{
        res.send("error");
    }

})

// End Point to Comment : updated
app.post('/api/articles/:name/comment',async (req,res) =>{
    const {name} = req.params;
    const {postedBy, text} = req.body;
    const {email} = req.user;

    // await db.collection('articles').updateOne({name}, {$push: {comments: {PostedBy, Email, Text}}})
    await db.collection('articles').updateOne({ name }, {
        $push: { comments: { postedBy, text } },
    });

    const article = await db.collection('articles').findOne({name});

    if(article){
        res.json(article);
    } else {
        res.send('Article Does Not Exist')
    }
})

// Adding an Endpoint to delete comments
// app.get('/api/articles/:name/comments/:text', async (req,res) =>{
//         const{name, text} = req.params;
//         const comment = await db.collection('articles').findOne({name : name, comments: {Text: text}})
//         if (comment){
//             res.json(comment);
//         } else{
//             res.send('Comment Not Found')
//         }
// }
//
// )

connectDB(()=>{
    console.log("Connected to the Database Successfully")
    app.listen(8000, ()=>{
        console.log('Server is listening on port 8000');
    });
})

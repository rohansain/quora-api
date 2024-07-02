const express = require('express');
const app = express();
const port = 3000;
const path = require("path");

app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));



// we are just creating an array of object which contains detaiils about a post because we don't have databases yet
const posts = [
    {
        username: "google",
        content: "organize the world's information"
    },
    {
        username: "microsoft",
        content: "empower every person and organization"
    },
    {
        username: "amazon",
        content: "customer obsession and innovation"
    },
    {
        username: "spacex",
        content: "making life multi-planetary"
    },
    {
        username: "tesla",
        content: "accelerate the world's transition to sustainable energy"
    },
    {
        username: "facebook",
        content: "connect and share with the people in your life"
    }
]

app.get('/posts',(req,res)=>{
    res.render('index.ejs',{posts});
})

app.get('/',(req,res)=>{
    res.send("server working well");
})

app.get('/posts/new',(req,res)=>{
    res.render('newPost.ejs');
})

app.post('/posts',(req,res)=>{
    let {username,content} = req.body;
    posts.push({username,content});
    res.send("post addded succcessfully");
})
app.listen(port,()=>{
    console.log(`app is listening on http://localhost:${port}`)
})
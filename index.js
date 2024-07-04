const express = require('express');
const app = express();
const port = 3000;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
var methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));



// we are just creating an array of object which contains detaiils about a post because we don't have databases yet
let posts = [
    {
        id: uuidv4(),
        username: "google",
        content: "organize the world's information"
    },
    {
        id: uuidv4(),
        username: "microsoft",
        content: "empower every person and organization"
    },
    {
        id: uuidv4(),
        username: "amazon",
        content: "customer obsession and innovation"
    },
    {
        id: uuidv4(),
        username: "spacex",
        content: "making life multi-planetary"
    },
    {
        id:uuidv4(),
        username: "tesla",
        content: "accelerate the world's transition to sustainable energy"
    },
    {
        id: uuidv4(),
        username: "facebook",
        content: "connect and share with the people in your life"
    }
];


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
    let id = uuidv4();
    posts.push({id,username,content});
    // res.send("post addded succcessfully");
    res.redirect('/posts');//by default it sends get request
})


//for acccessing each by id
app.get('/posts/:id',(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>id==p.id);
    // console.log(post);
    res.render('showPost.ejs',{post})
})

app.patch('/posts/:id',(req,res)=>{
    let {id} = req.params;
    let {content} = req.body;
    let post = posts.find((p)=>id==p.id);
    post.content = content;
    console.log(post);
    // res.send("patch working properly");
    res.redirect('/posts');
})

app.get('/posts/:id/edit',(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>id==p.id);
    res.render('edit.ejs',{post});

})

app.delete('/posts/:id',(req,res)=>{
    let {id} = req.params;
    posts = posts.filter(post => post.id != id);
    res.redirect('/posts');
})
app.listen(port,()=>{
    console.log(`app is listening on http://localhost:${port}`)
})
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
        username: "vitUniversity",
        content: "try to debit student money"
    },
    {
        username: "nokia",
        content: "hum to networking krenge"
    },
    {
        username: "tcs",
        content: "hume to bheed chahiye"
    }
]

app.get('/posts',(req,res)=>{
    res.render('index.ejs',{posts});
})

app.get('/',(req,res)=>{
    res.send("server working well");
})
app.listen(port,()=>{
    console.log(`app is listening on http://localhost:${port}`)
})
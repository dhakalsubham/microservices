const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

// posts === {
//     'jasd':{
//         id:'bhasbd',
//         title: 'postj bashdb',
//         comments:[
//             {id:'jansd', content:'basbas'}
//         ]
//     }
// }

app.get('/posts',(req,res) => {
    res.send(posts);
});

app.post('/events',(req,res)=>{
    const { type, data } = req.body;
    
    if(type === 'postCreated'){
        const {id, title } = data;
        posts[id] = {id, title, comments:[]};
    }
    if(type === 'commentCreated'){
        const {id,content, postId} = data;
        const post = posts[postId];
        post.comments.push({id,content});
    }
    console.log(posts);
    res.send({posts});

});

app.listen(4002,()=>{
    console.log('Listening on 4002');
});
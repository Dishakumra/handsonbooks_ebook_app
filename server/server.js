const express = require('express');
const bodyParser = require('body-parser');
var schema=require('./schema');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var mongoose=require('mongoose');

var mongoDB='mongodb://localhost/Handsonbooks';

 mongoose.connect(mongoDB);
mongoose.connection.on('error', (err) => {
    console.log('DB connection Error');
});
mongoose.connection.on('connected', (err) => {
   console.log('DB connected');
});

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});
app.get('/allbooks',(req,res)=>{
  schema.books.find(
    {

    },(err,data)=>{
      if(err)
      {
      console.log(err);
      res.send(err);}
      else {
        console.log(data);
        res.send(data);
      }
    }
  )
})
app.post('/signup', (req, res)=> {
 console.log("coming heress")
  // console.log(req.body.Email)
  nusers=new schema.users({
    email:req.params.Email,
    password:req.params.Password,
    shelf:[],
    quotes:[]
  })
  nusers.save(function(err,user){
    if(err)
    return console.error(err);
    console.log(user._id);
    res.send(user._id);

  });

});
app.post('/shelf', (req, res)=> {
 console.log("coming here shelf")
  // console.log(req.body.Email)
            schema.users.find({"_id":req.body.id},(err,data)=>{
              console.log("in fn")
            if(data.length!=0)
            {
                let o=JSON.stringify(data[0].shelf);
                res.send(`${o}`)

            }
            else
            {
              console.log("user not exists")
            }
            res.send();
          //  console.log("not")


})
});
app.post('/quotes', (req, res)=> {
 console.log("coming here qoutes")
  // console.log(req.body.Email)
            schema.users.find({"_id":req.body.id},(err,data)=>{
              console.log("in fn")
            if(data.length!=0)
            {
              let o=JSON.stringify(data[0].quote);

              res.send(`${o}`)

            }
            else
            {
              console.log("user not exists")
            }
            res.send();
          //  console.log("not")


})
});
app.post('/pushquote', (req, res)=> {
 console.log("coming here pushqoutes")
  // console.log(req.body.Email)
            schema.users.update({"_id":req.body.id},{$push:{quote:req.body.newtext}},{upsert:true},function(err){
                if(err)
                {
                  console.log(err);
                }
                  else{
                      console.log("Successfully added");
                      res.send("done");
                      }
            })
});
app.post('/addtoshelf', (req, res)=> {
 console.log("coming here addtoshelf")
  // console.log(req.body.Email)
            schema.users.update({"_id":req.body.userid},{$addToSet:{shelf:req.body.bookid}},{upsert:true},function(err){
                if(err)
                {
                  console.log(err);
                }
                  else{
                      console.log("Successfully added");
                      res.send("done");
                      }
            })
});
app.post('/removefromshelf', (req, res)=> {
 console.log("coming here addtoshelf")
  // console.log(req.body.Email)
            schema.users.update({"_id":req.body.userid},{$pull:{shelf:req.body.bookid}},{upsert:true},function(err){
                if(err)
                {
                  console.log(err);
                }
                  else{
                      console.log("Successfully added");
                      res.send("done");
                      }
            })
});
app.post('/login', (req, res)=> {
 console.log("coming here")
  // console.log(req.body.Email)
            schema.users.find({"email":req.body.Email},(err,data)=>{
              console.log("in fn")
            if(data.length!=0)
            {
              console.log(data[0].password)
              if(data[0].password == req.body.Password)
              {
                console.log(data[0]._id)
                let o=JSON.stringify(data[0]._id);
                res.send(`${o}`)
              }
              else
                {
                  console.log("pass didnt matched")
                }

            }
            else
            {
              console.log("user not exists")
            }
            res.send();
          //  console.log("not")


})
});
app.post('/shelfb', (req, res)=> {
 console.log("coming here bb")
  console.log(req.body.sbooks);


            schema.books.find({"_id":{$in:req.body.sbooks}},(err,data)=>{
              console.log("in fn")
              if(err)
              {
              console.log(err);
              res.send(err);}
              else {
                console.log(data);
                res.send(data);
              }
           console.log("not")


})
});

app.listen(port, () => console.log(`Listening on port ${port}`));

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
app.use(express.static('public'));

//mongoose.connect("mongodb://localhost/fresher");
mongoose.connect("mongodb://avinash:sandy@ds157964.mlab.com:57964/exuberance");


app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

var fresherSchema = new mongoose.Schema({
    name: String,
    number:String,
    branch:String
});

var Juniors = mongoose.model("Juniors",fresherSchema);

/*Juniors.create({
    name: "Harsh Maurya",
    number: "8960940924",
    branch: "CSE"
},function(err,junior){
   if(err){
       console.log(err);
   } 
   else{
       console.log("Students Added!!");
       console.log(junior);
   }
});*/


app.get("/",function(req,res){
    res.render("home");
});

app.get("/events",function(req,res){
   res.render("events"); 
});

app.get("/team",function(req,res){
   res.render("team"); 
});


app.get("/juniora",function(req,res){
    Juniors.find({},function(err,juniors){
        if(err){
            console.log(err);
        }
        else{
         res.render("junior",{juniors:juniors});   
        }
    });
    
});

app.post("/junior",function(req,res){
   var name =req.body.name;
   var number = req.body.number;
   var branch = req.body.branch;
   var newStudent = {name:name, number:number, branch:branch};
   Juniors.create(newStudent,function(err,newlyCreated){
       if(err){
           console.log(err);
           
       }else{
           res.redirect("/");
       }
   });
});

app.get("/register",function(req,res){
    res.render("register")
});

app.get("/contact",function(req,res){
   res.render("contact"); 
});

app.listen(process.env.PORT,process.env.IP,function(){
   console.log("Exuberance App started!!!"); 
});
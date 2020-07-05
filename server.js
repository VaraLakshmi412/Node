exp=require("express")
body=require("body-parser")
catfile=require("./myserverfiles/category")
subcatfile=require("./myserverfiles/subcategory")
subsubcatfile=require("./myserverfiles/subsubcategory")
ser_settings=require("./serversettings")
product=require("./myserverfiles/product")
registration=require("./myserverfiles/registration")
file=require("../mul-files-upload/node_modules/express-fileupload")
payment=require("./myserverfiles/payments")
frontend=require("./myserverfiles/frontend")
sess=require("express-session")

app=exp()
app.use(sess({
    secret:"%$#%^&",
    saveUninitialized:true,
    resave:true
}))
app.use(body.json())

app.use(file())
app.listen(1000)
app.use("/catref",catfile)
app.use("/subcatref",subcatfile)
app.use("/subsubcatref",subsubcatfile)
app.use("/prodref",product)
app.use("/regref",registration)
app.use("/payref",payment)
app.use("/frontref",frontend)

console.log(ser_settings.dbname)




const MongoClient = require('mongodb').MongoClient;
//const uri = "mongodb+srv://varam:varam@412@cluster0-5scz9.mongodb.net/test?retryWrites=true&w=majority"
client = new MongoClient("mongodb://localhost:27017/project", { useNewUrlParser: true });

//upload images
app.post("/insImages",function(req,res){{
    stt=""
    console.log(req.files)
    
    str=new Array()
    if(req.files.f1.name)
    {
    fname=req.files.f1.name
    dt=new Date()
    fname=dt.getTime()+fname;
    file=req.files.f1
    if(req.files.f1.mimetype=="image/jpeg" || req.files.f1.mimetype=="image/bmp" || req.files.f1.mimetype=="image/gif")
    file.mv("src/assets/prod_img/"+fname)
    str.push(fname)
}
else{
    for(i=0;i<req.files.f1.length;i++)
    {
    fname=req.files.f1[i].name
    dt=new Date()
    fname=dt.getTime()+fname;
    fileref=req.files.f1[i]
    if(req.files.f1[i].mimetype=="image/jpeg" || req.files.f1[i].mimetype=="image/bmp" || req.files.f1[i].mimetype=="image/gif")
    fileref.mv("src/assets/prod_img/"+fname)
    str.push(fname)
}
}
proid=0
client.connect=()=>{
    client.db(ser_settings.dbname).collection("tbl_product").find().sort({_id:-1}).limit(1).toArray(
        (err,result)=>{
            if(err)
            stt=err
            else
            {
            proid=result[0]._id
            client.db(ser_settings.dbname).collection("tbl_product").updateMany({_id:proid},{$set:{images:str}})
            stt=1
            }
            
        }
    )
}
}})






// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://varam:<password>@cluster0-5scz9.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

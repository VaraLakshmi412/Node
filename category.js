at=exp.Router()
at.get("/getcat",(req,res)=>{
    client.connect(err => {
         collection = client.db(ser_settings.dbname).collection("tbl_cat").find().toArray((err,result)=>{
            if(err)
            console.log(err)
        else
              //  console.log(result)
                res.send(result)
                // client.close();
              });
               });})

at.post("/insertcat",(req,res)=>{
  var obj =req.body;
  client.connect(err => {
    client.db(ser_settings.dbname).collection("tbl_cat").find().sort({_id:-1}).limit(1).toArray((err,result)=>{
      lastid=result[0]._id
lastid=lastid+1
obj._id=lastid
obj.status=1
console.log(obj)
   client.db(ser_settings.dbname).collection("tbl_cat").insertOne(obj,(err,result)=>{  
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
                // client.close();
              }); 
           // console.log(lastid)
            });
            })
            })


at.post("/update",(req,res)=>{
 // console.log(req.body)
 
  client.connect(err => {
      
   collection = client.db(ser_settings.dbname).collection("tbl_cat").update(req.body[0],req.body[1],(err,result)=>{
        if(err){
            res.send(err);
        }else{
          console.log(result)
            res.send({result:"Updated"});
        }
                // client.close();
              });
 });

})



at.post("/delete",(req,res)=>{
  var obj ={"_id":req.body._id}
    client.connect(err => {
      
   collection = client.db(ser_settings.dbname).collection("tbl_cat").deleteOne(obj,(err,result)=>{
        if(err){
            res.send(err);
        }else{
          
            res.send("delete success");
        }
                // client.close();
              });
               
        
             
     });

})
module.exports=at


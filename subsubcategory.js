rt=exp.Router()
rt.get("/getsubsubcat",function(req,res){
    client.connect(err => {
        collection = client.db(ser_settings.dbname).collection("tbl_subsubcat")
        .aggregate([{
            $lookup:{
                from:"tbl_cat",
                localField:"catid", //here main file is tbl_subcat and id is catid
                foreignField:"_id",
                as:"data"     //stores in data
            }
                    },
                    {
                        "$unwind":"$data"
                    },{
                    $lookup:{
                        from:"tbl_subcat",
                        localField:"subcatid", //here main file is tbl_subsubcat and id is sscatid
                        foreignField:"_id",
                        as:"datanew"    //stores in datanew
                    }
                   
                },
                    {"$unwind":"$datanew"},
                    {
                        "$group":{
                            "_id":"$_id", 
                            "abc":{
                                "$push":{
                                    "_id":"$_id",
                                     "catid":"$data._id",
                                    "subcatid":"$datanew._id",
                                    "ssubcatname":"$subsubcatname",  
                                    "catname":"$data.catname",
                                    "subcatname":"$datanew.subcatname",
                                    "status":"$status"
                                }
                            }
                        }
                    },
                    {"$unwind":"$abc"}
                ])
                .toArray((err,result)=>{
                    if(err){
                    res.send(err)}
                    else{
                    res.send(result)}
                  //  console.log(result)
                })
            })
})


//insert.
rt.post("/inssubsubcat",(req,res)=>{
    client.connect(err => {
    client.db(ser_settings.dbname).collection("tbl_subsubcat").find({},{_id:true,subsubcatname:0}).sort({_id:-1}).limit(1).toArray((err,result)=>{
        lastid=result[0]._id
        lastid=lastid+1
       // console.log(lastid)
        data=req.body
        data._id=lastid
       // console.log(data)
        client.db(ser_settings.dbname).collection("tbl_subsubcat").insertOne(data,(err,result)=>{
            if(err)
            console.log(err)
            else
            res.send({result:"SubSubcategory Added"})
        })
    })
})
})

//update

rt.post("/updsubsubcat",(req,res)=>{
    
    // var oldobj1={"_id":req.body._id}
  //var newobj2={$set:{"subcatname":req.body.subcatname,"catid":req.body.catid,"status":req.body.status}}
  console.log(req.body)
     client.connect(()=>{
         client.db(ser_settings.dbname).collection("tbl_subsubcat").updateOne(req.body[0],req.body[1],
             (err,result)=>{
                 if(err)
                 console.log(err)
                 else
                 {
                // console.log(result)
                res.send({result:"success"})
                 }
             }
         )
     })
    })
 
    
    rt.post("/getsubsubcatbasedonsubcatid",function(req,res){
        console.log(req.body)
        client.connect(err => {
            collection = client.db(ser_settings.dbname).collection("tbl_subsubcat").find(req.body).toArray((err,result)=>{
                console.log(result)
                res.send(result)
            })
        })
    })
module.exports=rt
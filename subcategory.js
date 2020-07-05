
rt=exp.Router()

rt.get("/getsubcat",function(req,res){
    client.connect(err => {
    collection = client.db(ser_settings.dbname).collection("tbl_subcat").aggregate([{
$lookup:{
    from:"tbl_cat",
    localField:"catid",
    foreignField:"_id",
     as:"data"
}
    }
    ,{
        "$unwind":"$data"
    }])
    
.toArray((err,result)=>{
        res.send(result)
    })
    
    })

})
//insert
rt.post("/inssubcat",(req,res)=>{
    client.connect(err => {
    client.db(ser_settings.dbname).collection("tbl_subcat").find({},{_id:true,subcatname:0}).sort({_id:-1}).limit(1).toArray((err,result)=>{
        lastid=result[0]._id
        lastid=lastid+1
        console.log(lastid)
        data=req.body
        data._id=lastid
        console.log(data)
        client.db(ser_settings.dbname).collection("tbl_subcat").insertOne(data,()=>{
            res.send({result:"Subcategory Added"})
        })
    })
})
})
//update

rt.post("/updsubcat",(req,res)=>{
    
   // var oldobj1={"_id":req.body._id}
 //var newobj2={$set:{"subcatname":req.body.subcatname,"catid":req.body.catid,"status":req.body.status}}
    client.connect(()=>{
        client.db(ser_settings.dbname).collection("tbl_subcat").updateOne(req.body[0],req.body[1],
            (err,result)=>{
                if(err)
                console.log(err)
                else
                console.log(result)
               res.send({result:"success"})
            }
        )
    })
   })


//To get subcat based on cat id
rt.post("/getsubcatbasedoncatid",(req,res)=>{
 ob=req.body
 console.log(ob)
 client.connect(()=>{
     client.db(ser_settings.dbname).collection("tbl_subcat").find(ob).toArray(
         (err,result)=>{
             
            res.send(result)
         }
     )
 })
})
module.exports=rt
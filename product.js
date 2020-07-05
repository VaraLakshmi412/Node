at=exp.Router()
// at.get("/productget",(req,res)=>{
//     client.connect(err => {
//          collection = client.db(ser_settings.dbname).collection("tbl_product").find().toArray((err,result)=>{
//             if(err)
//             console.log(err)
//         else
//               //  console.log(result)
//                 res.send(result)
//                 // client.close();
//               });
//                });
//             })


at.post("/productgetsearch",(req,res)=>{
    client.connect(err => {
        collection = client.db(ser_settings.dbname).collection("tbl_product").find(req.body).toArray((err,result)=>{
                 if(err){
                 res.send(err)}
                 else{
                 res.send(result)}
               // console.log(result)
             })
         })
})





at.get("/productget",(req,res)=>{
       client.connect(err => {
           collection = client.db(ser_settings.dbname).collection("tbl_product")
           .aggregate([{
            $lookup:{
                from:"tbl_cat",
                localField:"catid", 
                foreignField:"_id",
                as:"data"     
            }
                    },
                    {
                        "$unwind":"$data"
                    },{
                    $lookup:{
                        from:"tbl_subcat",
                        localField:"subcatid", 
                        foreignField:"_id",
                        as:"datanew"    
                    }
                   
                },{
                    "$unwind":"$datanew"
                },{
                    $lookup:{
                        from:"tbl_subsubcat",
                        localField:"subsubcatid", 
                        foreignField:"_id",
                        as:"datasub"    
                    }
                   
                },
                    {"$unwind":"$datasub"},
                    {
                        "$group":{
                            "_id":"$_id", 
                            "pabc":{
                                "$push":{
                                                "_id":"$_id",
                                                
                                        "ssubcatname":"$datasub.subsubcatname",  
                                            "catname":"$data.catname",
                                         "subcatname":"$datanew.subcatname",

                                      "product_name" : "$product_name",
                                             "price" : "$price",
                                      "product_type" : "$product_type",
                                            "rating" : "$rating",
                                             "color" : "$color",
                                          "quantity" : "$quantity",
                                          "offers"   : "$offers",
                                          "images"   : "$images",
                                             "catid" : "$catid",
                                          "subcatid" : "$subcatid",
                                       "subsubcatid" : "$subsubcatid"
                                    
                                }
                            }
                        }
                    },
                    {"$unwind":"$pabc"}
                ])
                .toArray((err,result)=>{
                    if(err){
                    res.send(err)}
                    else{
                    res.send(result)}
                  // console.log(result)
                })
            })
})




     //insert       
at.post("/productinsert",(req,res)=>{
    client.connect(err => {

        client.db(ser_settings.dbname).collection("tbl_product").find().sort({_id:-1}).limit(1).toArray((err,result)=>{
            lastid=result[0]._id
            lastid=lastid+1
        //    console.log(lastid)
            
            req.body._id=lastid
         collection = client.db(ser_settings.dbname).collection("tbl_product").insertOne(req.body,(err,result)=>{
            if(err)
            console.log(err)
        else
               // console.log(result)
                res.send({result:"insert success"})
                // client.close();
              });
               });
            })
        })

        //update for product
        at.post("/updproduct",function(req,res){
           // console.log(req.body)
            client.connect(err => {
                collection = client.db(ser_settings.dbname).collection("tbl_product").updateOne(req.body[0],req.body[1],(err,result)=>{
                     if(err)
                     {
                         console.log(err)
                        }
                     else{
                         console.log(result)
                         res.send(result)
                        }
                 })
             })
        })
//getproductbasedsubsubcatid

at.post("/getproductwithssubcatid",function(req,res){
   // console.log(req.body)
    client.connect(err => {
    collection = client.db(ser_settings.dbname).collection("tbl_product").find(req.body).toArray((err,result)=>{
        console.log(result)
        res.send(result)
    })
    })
}) 

//prod based prod data
at.post("/getproductwithproductid",function(req,res){
    //console.log(req.body)
    client.connect(err => {
    collection = client.db(ser_settings.dbname).collection("tbl_product").find(req.body).toArray((err,result)=>{
        console.log(result)
        res.send(result)
    })
    })
})

            module.exports=at
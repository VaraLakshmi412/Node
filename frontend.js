
rt=exp.Router()
//dealof the day
rt.post("/dealoftheday",(req,res)=>{
  //console.log("hii")
client.connect(err=>{
client.db(ser_settings.dbname).collection("tbl_product").find().sort({_id:-1}).limit(4).toArray((err,result)=>{
  if(err){
    res.send(err)
  }else{
    res.send(result)
    //console.log(result)
  }
})
})
})
//latest products
rt.post("/latestproducts",(req,res)=>{
  client.connect(err=>{
  client.db(ser_settings.dbname).collection("tbl_product").find({product_type: "latest products"}).sort({_id:1}).limit(4).toArray((err,result)=>{
    if(err){
      res.send(err)
    }else{
      res.send(result)
    }
  })
  })
  })
//latest products
rt.post("/upcproducts",(req,res)=>{
  client.connect(err=>{
  client.db(ser_settings.dbname).collection("tbl_product").find({product_type: "upcoming products"}).limit(4).toArray((err,result)=>{
    if(err){
      res.send(err)
    }else{
      res.send(result)
    }
  })
  })
  })
 //footer email contact
rt.post("/emailcontact",(req,res)=>{
 // console.log(req.body)
  contactemail=req.body.email
  text=req.body.text
  //varemail=req.body.email
  transport=nm.createTransport({
    service:"gmail",
    auth:{
      
      "user":"varalakshmidivi412@gmail.com",
      "pass":"sivakumar@143"
    },
    tls:{rejectUnauthorized:false}

  })
 str= contactemail +"<br>"+text

            transport.sendMail({
              from:contactemail,
              subject:"Email Contact",
              to:"varalakshmidivi412@gmail.com",
              html:str
            },function(err,result){
              if(err)
              console.log(err)
              else
              console.log(result)
            })
          
        })
        
        rt.post("/productdatastorageforwishlist",(req,res)=>{
          se=req.session
         em=se.em
          pid=req.body.pid
          stat=req.body.stt;
    client.connect(err=>{ client.db(ser_settings.dbname).collection("tbl_registration").updateOne({email:em},{$set:{wlist:req.body.wlist}})
            })
      })

      
      rt.post("/getwishlistdata",(req,res)=>{
        //console.log(req.body)
        se=req.session
        em=se.em
        arr=req.body.obj.split(",")
        dataobj=[]
        no=[]

        for(i=0;i<arr.length-1;i++)
        {
          no1=parseInt(arr[i])
         no.push(no1)
      }
      client.connect(err=>{
        client.db(ser_settings.dbname).collection("tbl_product").find({_id:{$in:no}}).toArray((err,result)=>{
        //dataobj.push(result[0])
        res.send(result)

      })
    })
     })
          rt.post("/Getwishlist",(req,res)=>{
           // console.log(req.body)
            se=req.session
         em=se.em
            client.connect(err=>{
            client.db(ser_settings.dbname).collection("tbl_registration").find({email:em}).toArray((err,result)=>{
              if(err){
                res.send(err)
              }else{
                res.send(result)
              }
            })
            })
            })
  //wishlist delete in wishlist component
  rt.post("/removewishlist",(req,res)=>{
    se=req.session
    em=se.em
    wl=req.body.wlist
    
  console.log(req.body)
    client.connect(err=>{ client.db(ser_settings.dbname).collection("tbl_registration").deleteOne(wl,(err,result)=>{
        if(err){
            res.send(err)
        }else{
            res.send(result)
        }
    })
})
})
  
        
module.exports=rt
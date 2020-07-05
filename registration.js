rt=exp.Router()
var request= require('request');
nm=require("nodemailer")
tok=require("jsonwebtoken")
secref=require("./secrete")
//se=require("express-session")
//insert registration
rt.post("/reginsert",(req,res)=>{

client.connect(err => {
client.db(ser_settings.dbname).collection("tbl_registration").find().sort({_id:-1}).limit(1).toArray((err,result)=>{
            lastid=result[0]._id
            lastid=lastid+1
            req.body._id=lastid
            varemail=req.body.email
        client.db(ser_settings.dbname).collection("tbl_registration").insertOne(req.body,()=>{
          
            var tid = tok.sign( {}, secref.seckey)  
                //console.log(tid)
     client.db(ser_settings.dbname).collection("tbl_registration").updateOne({email:varemail},{$set:{token:tid}})
                transport=nm.createTransport({
                  
                  service:"gmail",
                  auth:{
                    "user":"pennadalakshmi62@gmail.com",
                    "pass":"meanstack@123"
                  }
                  ,
                  tls:{rejectUnauthorized:false }
                })
                str1="http://localhost:4200/user/activatedmail;tk="+tid
                str="To active your account click on <a href="+str1+">Link</a>"
                          transport.sendMail({
                            from:"pennadalakshmi62@gmail.com",
                            subject:"Activation Required",
                            to:varemail,
                            html:str
                          }
               ,function(err,rep){
                if(err)
                res.send({result:err});
                else{
                  console.log(result)
                 
                res.send(result);
              }}
              )
              
     })     })
   })     
})
            
   

//get data from login
rt.post("/loginref",(req,res)=>{
  se=req.session
 console.log(req.body)
client.connect(err=>{ client.db(ser_settings.dbname).collection("tbl_registration").find(req.body).toArray((err,result)=>{
  logintoken = tok.sign( {email:req.body.email}, secref.seckey)  
  se.tokensession=logintoken
 se.em=req.body.email
 console.log(se)
 if(result.length>=1)
 {
   if(result[0].wlist)
   obj={tok:logintoken,fname:result[0].firstname,active:result[0].active,length:1,wlist:result[0].wlist}
else
obj={tok:logintoken,fname:result[0].firstname,active:result[0].active,length:1}

  }
 else{
   obj={}
  }
  //console.log(logintoken)
  //obj={tok:logintoken,fname:result[0].firstname,active:result[0].active,length:1}
  res.send({res:obj})
 console.log(result)
})
    })
    })
    
   //profile data for my account 
    rt.post("/profiledata",(req,res)=>{
      se=req.session
    if(se.tokensession==req.body.tok)
    {
    console.log("Valid")
      client.connect(err=>{ client.db(ser_settings.dbname).collection("tbl_registration").find({email:se.em},{email:1,phone:1,address:1}).toArray((err,result)=>{
          res.send({res:result})
          console.log(result)
      })
          })
        }
        else
        console.log("hi")
          })
//activatedemail
rt.post("/activatedmail",(req,res)=>{
   // console.log(req.body)
    client.connect(err => {
   client.db(ser_settings.dbname).collection("tbl_registration").update(req.body,{$set:{active:1}},
            (err,result)=>{
     if(err){
      res.send({msg:err})
     }
     else{
      res.send({msg:1})
     }
    })
    })

})
//my account update
rt.post("/myacctupdate",(req,res)=>{
  console.log(req.body)
   client.connect(err => {
  client.db(ser_settings.dbname).collection("tbl_registration").update(req.body[0],req.body[1],
           (err,result)=>{
    if(err){
     res.send(err)
    }
    else{
      console.log(result)
     res.send({res:result})
    }
   })
   })

})
//get user details in billpage
rt.post("/getUserLoginDetails",(req,res)=>{
  se=req.session
    //console.log(req.body)
     client.connect(err=>{ client.db(ser_settings.dbname).collection("tbl_registration").find({email:se.em},{email:1,phone:1,address:1}).toArray((err,result)=>{
         if(err){
             res.send(err)
         }else{
          // console.log(result)
             res.send(result)
         }
     })
 })
 })
 //get user details in billpage after that move to db
rt.post("/insertshiffingdetailstodb",(req,res)=>{
    se=req.sess
    varemail=req.body.email
  //console.log(req.body)
   client.connect(err=>{ client.db(ser_settings.dbname).collection("tbl_shiffing_add").insert(req.body,(err,result)=>{
       if(err){
           res.send(err)
           
       }else{
           res.send(result)
          
           transport=nm.createTransport({
                  
            service:"gmail",
            auth:{
              "user":"pennadalakshmi62@gmail.com",
              "pass":"meanstack@123"
            }
            ,
            tls:{rejectUnauthorized:false }
          })
        
          str="Your Order Placed Successfully...Thanks for shopping with us!! "
                    transport.sendMail({
                      from:"pennadalakshmi62@gmail.com",
                      subject:"E-shop payment Done",
                      to:varemail,
                      html:str
                    }
         ,function(err,rep){
          if(err)
          res.send({result:err});
          else{
            console.log(result)
           
          res.send(result);
        }}
        )
       }
   })
   })

})

//delete cart items after payment
rt.post("/deletecatitemsafterpayment",(req,res)=>{
    se=req.session
  //console.log(req.body)
   client.connect(err=>{ client.db(ser_settings.dbname).collection("tbl_cart_items").remove({email:se.em},(err,result)=>{
       if(err){
           res.send(err)
       }else{
           res.send(result)
       }
   })
   })

})
//forgot password
rt.post("/forgotpass",(req,res)=>{
  //se=req.session
console.log(req.body)
 client.connect(err=>{ client.db(ser_settings.dbname).collection("tbl_registration").updateOne(req.body[0],req.body[1],(err,result)=>{
     if(err){
         res.send(err)
     }else{
         res.send(result)
         console.log(result)
     }
 })
 })

})
//to send mail for reset password
rt.post("/recoveryPass",(req,res)=>{
  console.log(req.body)
  varemail=req.body.email
  client.connect(err=>{ client.db(ser_settings.dbname).collection("tbl_registration").find(req.body).toArray((err,result)=>{
  var v_token=tok.sign({},secref.seckey)
  
  // console.log(req.body)
  if(result.length==1){
  transport=nm.createTransport({
    service:"gmail",
    auth:{
      "user":"pennadalakshmi62@gmail.com",
      "pass":"sivakumar@143"
    }
    ,
    tls:{rejectUnauthorized:false}
  })
  str1="http://localhost:4200/user/forgot;tk="+v_token
  str="Reset your password <a href="+str1+">Link</a>"
            transport.sendMail({
              from:"pennadalakshmi62@gmail.com",
              subject:"Recover mail for Password Reset",
              to:varemail,
              html:str
            })
            }else{
              res.send({result:"Email id Not Existed"});
}
            })
          })


        })

        ////////////////////////////
        rt.post("/emailsentafterpaymentdone",(req,res)=>{
          //console.log(req.body)
          varemail=req.body.email
          client.connect(err=>{ client.db(ser_settings.dbname).collection("tbl_shiffing_add").find(req.body).toArray((err,result)=>{
          var v_token=tok.sign({},secref.seckey)
          
          // console.log(req.body)
          if(result.length==1){
          transport=nm.createTransport({
            service:"gmail",
            auth:{
              "user":"pennadalakshmi62@gmail.com",
              "pass":"meanstack@123"
            }
            ,
            tls:{rejectUnauthorized:false}
          })
          str1="http://localhost:4200/user/paymentdone;tk="+v_token
          str="Paymentdone successfully<a href="+str1+">Link</a>"
                    transport.sendMail({
                      from:"pennadalakshmi62@gmail.com",
                      subject:"Payment Done",
                      to:varemail,
                      html:str
                    })
                    }else{
                      res.send({result:"Payment Failed"});
        }
                    })
                  })
        
        
                })
    //EMAIL REVIEW
     
         rt.get("/emailreviews",(req,res)=>{
         
        client.connect(err => {
          client.db(ser_settings.dbname).collection("tbl_shiffing_add").find().toArray((err,result)=>{
            
            
          transport=nm.createTransport({
            service:"gmail",
            auth:{
              "user":"pennadalakshmi62@gmail.com",
              "pass":"meanstack@123"
            }
            ,
            tls:{rejectUnauthorized:false}
          })  
        //  str="Paymentdone successfully<a href="+str1+">Link</a>"
          str="<form if='frm1' action='http://localhost:4200/user/emailreviews' method='get'>Rate our service<br><input type='hidden' name='pid' value={prodid} ><input type='number' min=0 max=5 name='userrating' onclick='this.value=1' id='t2' ><br><textarea name='cm'></textarea><input type='submit' value='send'></input></form>"
          
                    transport.sendMail({
                      from:"pennadalakshmi62@gmail.com",
                      subject:"Customer Review",
                      to:"pennadalakshmi62@gmail.com",
                      html:str
                    })
         res.send({"p":"sent"})
          
                      })
                    })
                  })
     //reviews insert into product tbl        
     rt.post("/reviewsintoprod",(req,res)=>{
      se=req.sess
      varemail=req.body.email
    //console.log(req.body)
     client.connect(err=>{ client.db(ser_settings.dbname).collection("tbl_whishlist").insert(req.body,(err,result)=>{
         if(err){
             res.send(err)
             
         }else{
             res.send(result)
         }    
        })
      })
    })    
module.exports=rt
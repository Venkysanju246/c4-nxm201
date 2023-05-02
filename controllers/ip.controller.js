const express = require("express")
const Redis = require("ioredis");
const ipModel = require("../model/ip.model");
const redis = new Redis();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const ipRoute = express.Router()

ipRoute.post("/add", async(req, res)=>{
   const {ip} = req.body 
   const data = new ipModel({ip})
   await data.save()
   redis.set("newip", ip)
   
   res.send({
    msg:"done"
   })
})

//GET https://ipapi.co/{ip}/{field}/

// var https = require('https');

// const options = {
//   path: '/json/',
//   host: 'ipapi.co',
//   port: 443,
//   headers: { 'User-Agent': 'nodejs-ipapi-v1.02' }
// };
// https.get(options, function(resp){
//     var body = ''
//     resp.on('data', function(data){
//         body += data;
//     });

//     resp.on('end', async function(){
//         var loc = JSON.parse(body);
//         console.log(loc.ip);
//        redis.set("ip", loc.ip)
        
//     });
// });



  

  ipRoute.get("/city", async (req, ress)=>{
    const ipback = await redis.get("newip")
    fetch(`http://ip-api.com/json/?${ipback}`)
  .then((res)=> res.json())
  .then((res)=> {
    ress.send({
        city:res.city,
        country:res.country,
        RegionName:res.regionName
    })
  })
    
})

module.exports = ipRoute
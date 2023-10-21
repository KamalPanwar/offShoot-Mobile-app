const express = require("express");
const colRepo = require("../repos/collection-data-repo");

const router=express.Router()

router.get("/coldata", async (req, res) => {

  const user = await colRepo.find();

  if (user.length > 0) {
    res.send(user);
  } else {
    res.status(404);
  }
});

router.post("/traced", async(req,res)=>{
  
  const{collectionid, lllocation, latlong}=req.body
  const user=await colRepo.update(collectionid, lllocation, latlong)
  if (user.length > 0) {
    res.send(user);
  } else {
    res.status(404);
  }
})

router.post("/untracable", async(req,res)=>{
  console.log(req.body);
  res.send("OK")
})

module.exports = router;
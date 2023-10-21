const express = require("express");
const colRepo = require("../repos/collection-data-repo");
const { up } = require("../../migrations/1697896072528_colecdata");

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

  
     const collectionid = req.body.obj.loanId;
     const contactpersonname = req.body.obj.personName;
     const contactpersonno = req.body.obj.personNumber;
     const paymentamount = req.body.obj.personAmount;
     const paymentmode = req.body.obj.paymentMode;
     const latlong = req.body.obj.longitude + " " + req.body.obj.latitude;
     const uploaddate = req.body.obj.date;
     const fe_status=req.body.obj.status;

     const { lllocation } = req.body.obj;
   
     const user = await colRepo.update(
       collectionid,
       lllocation,
       latlong,
       contactpersonname,
       contactpersonno,paymentamount,paymentmode,uploaddate,fe_status
     );
  if (user.length > 0) {
    console.log('====================================');
    console.log(user);
    console.log('====================================');
    res.send(user);
  } else {
    res.status(404);
  }
})

router.post("/untracable", async(req,res)=>{
  console.log(req.body.obj);
  res.send("OK")
})

module.exports = router;
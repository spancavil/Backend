import express from 'express';
const router1 = express.Router();

router1.post('/post', (req:any,res:any)=>{
    let content = JSON.stringify(req.body,null,'\t');
    console.log (content);
    res.send(content);
})

export default router1;
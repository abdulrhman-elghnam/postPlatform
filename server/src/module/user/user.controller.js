import structure from '#/common/structure/index.js'
import express from 'express';
const router = express();

router.post("/create" ,(req,res,next)=>{
    structure.sendSuccess()
})
export default router;

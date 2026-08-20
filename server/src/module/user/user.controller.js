import structure from '#/common/structure/_index.js'
import express from 'express';
const router = express();

router.post("/create" ,()=>{
    structure.sendSuccess()
})
export default router;

import express, { response } from "express";
import Thread from "../Thread.js";

const router = express.Router();

//test
router.post("/test", async(req, res) => {
    try{
        const thred = new Thread({
            threadId: "xyz1",
            title: "Testing New Thread1"
        });

        const response = await thred.save();
        res.send(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Failed to save in DB"});
        
    }
});

router.get("/thread", async(req, res) => {
    try{
       const threads = await Thread.find({}).sort({updatedAt: -1});
       //decending order of updatedAt..most recwent data on top
       res.json(threads);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Failed to fatch threads"});
        
    }
});

router.get("/thread/:threadId", async(req, res) =>{
    const {threadId} = req.params;
    try{
        const thread = await Thread.findOne({threadId});

        if(!thread){
            res.status(400).json({error: "Thread not found"});
        }

        res.json(thread.messages);

    }catch(err){
        console.log(err);
        res.status(500).json({error:"Failed to fatch chat"})
    }
});


router.get("/thread/:threadId", async(req, res) =>{
    const {threadId} = req.params;
    try{
       const deleteThread =  await Thread.findOneAndDelete({threadId});
       if(!deleteThread){
            req.status(404).json({error:"Thread not found" })
       }

        req.status(200).json({success: "Thread deleted Successfully!"})
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Failed to delete a thread"})
    }
})

export default router;
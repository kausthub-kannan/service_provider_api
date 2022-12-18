import express from "express";
import cors from "cors";
import router from "./routes.js";

const server = express();
server.use(express.json());
server.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
server.use('/',router)

server.listen(4200, (err)=>{
    if(!err)
        console.log("Server connected....");
    else 
        console.log(err);
});
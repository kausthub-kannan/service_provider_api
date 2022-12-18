import fs from "fs";
import { initializeApp } from "firebase/app";
import { get } from "firebase/database";
import { addDoc, arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, setDoc, updateDoc, where } from "firebase/firestore";
import { response } from "express";
import { mailer } from "./mailer.js";

const json = fs.readFileSync('./config.json')  
const firebaseConfig = JSON.parse(json)

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const requestAccept = async (req,res) =>{
    try {
        const id = req.query.id;
        const req_id = req.query.req_id;
        const response = await updateDoc(doc(db, "request/"+req_id),{
            provider_ids: arrayUnion(id),
            status: true
        });
        const info = await getDoc(doc(db, "request/"+ser_id));
        const customer_id = info.data().customer_id;
        const information = await getDoc(doc(db, "users/"+customer_id));
        const email = information.data().email;
        const data = {
            txt: "request",
            email: email
        }
        if(response)
            mailer(data);
        res.send("Accepted!")
    } catch (error) {
        console.log(error);
        res.send(error.message);
    }
}

const serviceAccept = async (req,res) =>{
    try {
        const id = req.query.id;
        const ser_id = req.query.ser_id;
        const response = await updateDoc(doc(db, "services/"+ser_id),{
            customer_ids: arrayUnion(id),
            status: true
        });   
        const info = await getDoc(doc(db, "services/"+ser_id));
        const provider_id = info.data().provider_id;
        const information = await getDoc(doc(db, "users/"+provider_id));
        const email = information.data().email;
        const data = {
            txt: "service",
            email: email
        }
        mailer(data);
        res.send("Accepted!")
    } catch (error) {
        console.log(error);
        res.send(error.message);
    }
}

//Don't Touch
const acceptedServices_Customers = async (req, res) => {
    try {
        const services = [];
        const id = req.query.id;
        const q = query(collection(db, "services"), where("customer_ids","array-contains",id));
        const documents = await getDocs(q);
        documents.forEach((service) => {
            const info = service.data();
            console.log(info);
            services.push({id: service.id, name: info.name});
        });
        res.send(services);
    } catch (error) {
        console.log(error);
        res.send(error.message);
    }
}

//Don't Touch
const acceptedrequested_Provider = async (req, res) => {
    try {
        const requests = [];
        const id = req.query.id;
        const q = query(collection(db, "request"), where("provider_ids","array-contains",id));
        const documents = await getDocs(q);
        documents.forEach((request) => {
            const info = request.data();
            requests.push({id: request.id, name: info.name});
        });
        console.log(requests)
        res.send(requests);
    } catch (error) {
        console.log(error);
        res.send(error.message);
    }
}

const profile= async (req, res) => {
    try {
        const id = req.query.id;
        const documents = await getDoc(doc(db, "users/"+id));
        console.log(documents.data())
        res.send(documents.data());
    } catch (error){
        console.log(error);
        res.send(error.message);
    }
}

export {requestAccept , serviceAccept, acceptedServices_Customers, acceptedrequested_Provider ,profile}
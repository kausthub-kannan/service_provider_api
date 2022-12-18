import fs from "fs";
import { initializeApp } from "firebase/app";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, setDoc, updateDoc, where } from "firebase/firestore";

const json = fs.readFileSync('./config.json')  
const firebaseConfig = JSON.parse(json)

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const createRequest = async (req,res) => {
    const data = req.body;
    console.log(data)
    const tag=[];
    tag.push(data.tags);
    try {
        const response = await addDoc(collection(db, "request"),{
            name: data.name,
            customer_id: data.id,
            description: data.description,
            tags: tag,
            price: data.price,
            status: false,
        })
        res.send("Request Added...Providers can see your Requests");
    } catch (error) {
        console.log(error);
        res.send(error.message);
    }
}

const readAllRequest = async (req,res) => {
    try {
      const arr=[];
      const collectionRef= collection(db,'request')
  
      const response = await getDocs(collectionRef);
      
      response.forEach((i) => {
        arr.push({name:i.data().name , id:i.id});
      });
      res.send(arr);
    }
    catch (error) {
        console.log(error);
        res.send(error.message);
      }
}

const readYourRequest = async (req, res) => {
    try {
        const id = req.query.id;
        const request = await getDoc(doc(db,"request/"+id));
        res.send(request.data());
    } catch (error) {
        console.log(error);
        res.send(error.message);
    }
}

const readYourRequestList = async (req, res) => {
    try {
        const listOfRequests= []
        const id = req.query.id;
        console.log(id)
        const q = query(collection(db, "request"), where("customer_id","==",id));
        const requests = await getDocs(q);
        requests.forEach(request => {
            const info = request.data();
            console.log(info);
            listOfRequests.push({request_id: request.id, name: info.name, status: info.status});
        });
        res.send(listOfRequests);
    } catch (error) {
        console.log(error);
        res.send(error.message);
    }
}


const DeleteRequest = async (req,res) => {
   try {
        const id = req.query.id;
        await deleteDoc(doc(db,"request/"+id));
        console.log("Request Deleted");
        res.send("Deleted");
   }
   catch{
        console.log(error);
        res.send(error.message);
   }
}

const updateRequest = async (req, res) =>{
    try {
        const data = req.body;
        await updateDoc(doc(db,"request/"+data.id),{
            name: data.name,
            customer_id: data.customer_id,
            description: data.description,
            price: data.price,
            status: false,
        });
        res.send("Updated");
    } catch (error) {
        console.log(error);
        res.send(error.message);
    }
}

export{createRequest , updateRequest , DeleteRequest ,readYourRequestList, readYourRequest,  readAllRequest}
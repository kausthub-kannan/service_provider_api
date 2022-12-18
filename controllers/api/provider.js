import fs from "fs";
import { initializeApp } from "firebase/app";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, setDoc, updateDoc, where } from "firebase/firestore";

const json = fs.readFileSync('./config.json')  
const firebaseConfig = JSON.parse(json)

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const createService = async (req,res) => {
    const data = req.body;
    try {
        const response = await addDoc(collection(db, "services"),{
            name: data.name,
            provider_id: data.id,
            description: data.description,
            price: data.price,
            status: false,
        })
        res.send("Service Added... Customers can see your Services");
    } catch (error) {
        console.log(error);
        res.send(error.message);
    }
}

const readYourServiceList = async (req, res) => {
    try {
        const listOfServices = []
        const id = req.query.id;
        const q = query(collection(db, "services"), where("provider_id","==",id));
        const services = await getDocs(q);
        services.forEach(service => {
            const info = service.data();
            listOfServices.push({service_id: service.id, name: info.name, status: info.status});
        });
        res.send(listOfServices);
    } catch (error) {
        console.log(error);
        res.send(error.message);
    }
}

const readAllServices = async (req,res) => {
    try {
      const services=[];
      const response = await getDocs(collection(db,'services'));
      response.forEach((ser) => {
        const info = ser.data();
        services.push({name: info.name, id:ser.id});
      });
      res.send(services);
    }
    catch (error) {
        console.log(error);
        res.send(error.message);
      }
}

const read = async (req, res) => {
    try {
        const id = req.query.id;
        const type = req.query.type;
        const service = await getDoc(doc(db,type+"/"+id));
        console.log(type+"/"+id)
        res.send(service.data());
    } catch (error) {
        console.log(error);
        res.send(error.message);
    }
}

const deleteService = async (req,res) =>{
    try {
        const id = req.query.id;
        const response = await deleteDoc(doc(db,"services/"+id));
        console.log(response);
        res.send("Deleted");
    } catch (error) {
        console.log(error);
        res.send(error.message);
    }
}

const updateService = async (req, res) =>{
    try {
        const data = req.body;
        await updateDoc(doc(db, "services/"+data.id),{
            name: data.name,
            provider_id: data.provider_id,
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

export {createService, updateService, deleteService, readAllServices, readYourServiceList, read}
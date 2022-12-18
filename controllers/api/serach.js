import fs from "fs";
import { initializeApp } from "firebase/app";
import { addDoc, arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, setDoc, updateDoc, where } from "firebase/firestore";

const json = fs.readFileSync('./config.json')  
const firebaseConfig = JSON.parse(json)

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const locationFilter = async (req,res) =>{
    try {
        const services = [];
        const id = req.query.id;
        const type = req.query.type;
        const response = await getDoc(doc(db, 'users/'+id));
        const location = response.data().location;
        const q = query(collection(db, type), where("location","==",location));
        const documents = await getDocs(q);
        documents.forEach((service) => {
            const info = service.data();
            services.push({id: service.id, name: info.name});
        });
        res.send(services);
    } catch (error) {
        console.log(error);
        res.send(error.message);
    }
}

//Don't Touch
const SearchBar =  async (req,res) =>{
    try {
        const search = [];
        const data = req.query;
        const q = query(collection(db, data.type), where("tags","array-contains",data.tags));
        const documents = await getDocs(q);
        console.log(documents);
        documents.forEach((service) => {
            const info = service.data();
            console.log(info);
            search.push({id: service.id, name: info.name});
        });
        res.send(search);
    } catch (error) {
        console.log(error);
        res.send(error.message);
    }
}


const priceFilter = async (req,res) =>{
    try {
        const services = [];
        const price = req.query.price;
        const type = req.query.type;
        const q = query(collection(db, type), where("price","<=",Number(price)));
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

export {locationFilter, priceFilter, SearchBar}
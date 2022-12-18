import fs from "fs";
import { initializeApp } from "firebase/app";
import { addDoc, collection, doc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const json = fs.readFileSync('./config.json')  
const firebaseConfig = JSON.parse(json)

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

const signIn = async (req,res) => {
    try {
        const data = req.body;
        const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
        const user = userCredential.user;

        const response = await setDoc(doc(db, "users/"+user.uid),  {
            username: data.username,
            email: user.email
        })
        res.send(user.id);
    } catch (error) {
        console.log(error);
        res.send(error.message);
    }
}

const login = async (req, res) => {
    try {
        const data = req.body
        const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password)
        const user = userCredential;
        res.send(user);
    } catch (error) {
        console.log(error);
        res.send(error.message);
    }
}

const createProfile = async (req, res) => {
    try {
        const data = req.data;
        const response = await updateDoc(doc(db, "users/"+data.id),{
            mobile: data.mobile,
            provider: data.provider,
            location: data.location,
            PAN: data.PAN,
            service_tags: data.service_tags,
            provider_tags: data.provider_tags
        })
        res.send("Profile Created!");
    } catch (error) {k
        console.log(error);
        res.send(error.message);
    }
}

export {signIn, login, createProfile}

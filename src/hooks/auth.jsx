import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { useState, useEffect } from 'react';
import { DASHBOARD, LOGIN } from "../lib/routes"
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import  isUsernameExists  from "../utils/isUsernameExists"



export function useAuth(){
    const [authUser, authLoading, error] = useAuthState(auth);
    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    useEffect(()=>{
        async function fetchData(){
            setLoading(true);
            const ref = doc(db, "users", authUser.uid);
            const docSnap = await getDoc(ref);
            console.log(docSnap);
            setUser(docSnap.data());
            console.log(user);
            setLoading(false);
        }

        if(!authLoading){
            if(authUser){
                fetchData();
            }
            else{
                setLoading(false);
            }
        }
    },[authLoading]);

    return {user, isLoading , error: error};
}




export function useLogin(){


    const [isLoading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();


    async function login({email, password, redirectTo=DASHBOARD}){
        setLoading(true);
        try{
        await signInWithEmailAndPassword(auth, email, password)
        toast({
            title: "you are logged in",
            status: "success",
            isClosable: true,
            position: "top",
            duration: 3000,
        });
       navigate(redirectTo);
        }
        catch(error){
            toast({
                title: "logging in failed",
                description: error.message,
                status: "error",
                isClosable: true,
                position: "top",
                duration: 3000,
            });  
            return false; //return false if login failed  
        }

        setLoading(false)
        return true; // return true if login succeeds


    }

    return {login, isLoading}

}



export function useRegister(){

    const [isLoading, setLoading] = useState(false);

    const toast = useToast();
    const navigate = useNavigate();

    async function register({
        username,
        email,
        password,
        redirectTo=DASHBOARD
    }){
        setLoading(true);
        //check if username already exists
      const usernameExists = await isUsernameExists(username);

      if(usernameExists){
        toast({
            title:"Username already exists",
            status: "error",
            isCoasable: true,
            position: "top",
            duration: 3000,
        })
        setLoading(false);
        
      }
      else{
        try{
            //creates user in table
            const res = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(db, "users", res.user.uid),{
                id: res.user.uid,
                username: username.toLowerCase(),
                avatar: "",
                date: Date.now(),
            });
            toast({
                title: "Account created",
                description: "You are logged in",
                isClosable: true,
                position: "top",
                duration: 3000,
            });

            navigate(redirectTo);

        }catch(error){
        toast({
            title: "Sign up failed",
            description: error.message,
            status: "error",
            isClosable: true,
            postion: "top",
            duration: 3000,
        });
        }
        finally{
            setLoading(false);

        }
      }
    }
    return {register, isLoading};
}








export function useLogout(){
    const [signOut, isLoading, error] = useSignOut(auth);
    const toast = useToast();
    const navigate = useNavigate();

    async function logout(){
      if(await signOut())  {
        toast({
            title:"Successfully logged out",
            status:"success",
            isClosable: true,
            position: "top",
            duration: 3000,
        });
        navigate(LOGIN);
      }  //signOut returns a boolean value
    }

    return { logout, isLoading: isLoading }
}
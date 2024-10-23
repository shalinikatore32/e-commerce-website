
import { createContext, useContext, useEffect, useState } from "react";

//this is context
const cteateCont=createContext();

// This is provider
const StoreToken=({children})=>{
    
const [token,setToken]=useState(localStorage.getItem("token"));
const [user,setUser]=useState('');
const [service,setService]=useState([]);
const [isLoading,setLoading]=useState(true);



const authorizedToken=`Bearer ${token}`;

const storeToken=(serverToken)=>{
    setToken(serverToken);
    return localStorage.setItem("token",serverToken)
    
};

let isLoggedin=!!token;

const LogoutUser = ()=>{
setToken("");
return localStorage.removeItem("token");
};


const useAuthentication=async ()=>{
try {
    setLoading(true)
    const respons=await fetch(`http://localhost:5005/user`,{
        method:'GET',
        headers:{
            Authorization:authorizedToken, 
        },
    })
    if(respons.ok){
       
        const data=await respons.json();
        console.log(data.userData);
        setUser(data.userData);
        setLoading(false)
    }
    else{
        setLoading(false);
    }
} catch (error) {
    console.log(error);
}
}

const useService=async ()=>{
    const response=await fetch(`http://localhost:5005/service`,{
        method:'GET'
    })
    if(response.ok)
        {
            const data=await response.json();
            console.log(data.resp);
            setService(data.resp);
        }
}

useEffect(()=>{
    useService();
    useAuthentication();
},[]);



return <cteateCont.Provider value={{isLoggedin,storeToken,LogoutUser,user,service,authorizedToken,isLoading}}>
    {children}
</cteateCont.Provider>

}

//Consumer

const Consumer=()=>{
    
    const createContex=useContext(cteateCont);
    if(!createContex)
        {
            throw new Error("Its been Used outside the provider");
        }
    return createContex
}


export {StoreToken,Consumer};
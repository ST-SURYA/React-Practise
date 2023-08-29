import React, { useEffect, useState } from "react";

const getData = (key , initialValue)=>{
const storeValue = JSON.parse(localStorage.getItem(key));

if(storeValue)return storeValue;
console.log(storeValue);
return initialValue;
}

const useLocalStorage = (key , initialValue)=>{
    const [value , setValue] = useState(()=>{ return getData(key,initialValue)});
    
    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(value));
    },[value])

    return [value,setValue]
}

export default useLocalStorage;
import React from "react";

const ChildThree = ({children})=>{
    return(<div>
        <h6>Third child</h6>
        <h1>{children}</h1>
    </div>)
}

export default ChildThree;
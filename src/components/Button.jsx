import React from 'react';

const Button = ({name , action})=>{
    return(
        <button className='btn btn-primary ' onClick={(e)=>{
            e.preventDefault();
            action();
        }}>{name}</button>
    )
}

export default Button;
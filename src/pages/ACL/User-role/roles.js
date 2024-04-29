import React, { useState, useEffect } from "react";
import { roleDelete } from "store/ACL/Role/actions";

const Roles = props => {
    let roleData = undefined;
    roleData = props.data.map((item, key) => (
            
             <span className="badge badge-soft-success badge-pill float-right ms-1 font-size-14" key={key}>
              {item.role.name}  <span onClick={()=>props.func(item.id)}>X</span>
            </span>

      
       
    ))

return (
    <>
     {roleData}
    </>
   
)


}

export default  Roles
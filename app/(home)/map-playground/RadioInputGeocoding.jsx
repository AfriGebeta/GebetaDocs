"use client"
import React from "react";

const radioInputs = [
    { name : "forward"},
    { name : "reverse"}
]





const RadioInputGeocoding = ({selectedGeocoding,setGeocoding,setSelectedButtonFunction}) => {

    return (
        <div>
            {
                radioInputs.map((n) => {
                              return (
                                  <div className="flex space-x-2  mx-[2%] md:mx-[0%]">
                                      <input type="radio" checked={selectedGeocoding === n.name} onChange={()=>{
                                        
                                        if(n.name == "reverse"){
                                            setSelectedButtonFunction("start")
                                        }
                                        setGeocoding(n.name)}} />

                                      <label className="text-sm font-medium text-gray-700 mb-1 capitalize"> {n.name}</label>
                                  </div>
                                  )
                          })
                      }
                  </div>
    )
}


export default RadioInputGeocoding
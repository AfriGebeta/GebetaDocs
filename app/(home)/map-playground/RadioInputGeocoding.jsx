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

                                      <p> {n.name}</p>
                                  </div>
                                  )
                          })
                      }
                  </div>
    )
}


export default RadioInputGeocoding
import React, {useState} from "react"
import Map from "./Map";
import SideBarForm from "./SideBarForm";
import {returnPlaygroundObject} from "../../data/playground";
import {useSelector} from "react-redux"

const MapView = () => {

  
    
    const [selectedButton, setSelectedButton] = useState("");
    const { playground } = useSelector((state) => state) 
    

    const setSelectedButtonFunction = (text) => {
        if(text == selectedButton)
            setSelectedButton("")
        else
            setSelectedButton(text)
            
    }
    
    
    
   

    return (
        <main className="md:flex  md:h-screen md:w-full"> {/* Set height to 100% */}
        <div className="md:flex flex-1 flex-grow-0 flex-basis-30  "  style={{ flexBasis: '20%' }}> 
        <SideBarForm  
           
              setSelectedButtonFunction={setSelectedButtonFunction}
              selectedButton={selectedButton}
              object={returnPlaygroundObject(playground.current)}
             
        />
        </div>
   
        <div className="bg-red-500 flex-1 flex-grow-0 flex-basis-70 h-screen mx-[2%] md:mx-[0%]"  style={{ flexBasis: '80%' }}> 
            <Map 
            
                  selectedButton = {selectedButton}
             
                     
            />
        </div> 
     </main>
     
    )
}

export default MapView
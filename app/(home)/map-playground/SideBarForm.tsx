import React, {useContext, useState} from "react";
import RequestSample from "./RequestSample";
import {useSelector} from "react-redux";
import ResponseSample from "./Responsesample";
import JsonViewer from "./JsonViewer";
import {getRoute} from "redux/api/routeAPI"
import Notify from "./Notify"
import {PlayGroundContext} from "poviders/Playground"
import {BASE_URL} from "@/services/apiClient";

const SideBarForm = ({

                         setSelectedButtonFunction,
                         selectedButton,
                         object,

                     }) => {
    // state variables
    const [selectedGeocoding , setSelectedGeocoding] = useState("forward")
    const [startWayPoint , setStartWayPoint] = useState(false)
    const [instruction , setInstruction] = useState(false)
    const [searchText , setSearchText] = useState("")
    const [apiResponse , setApiResponse] = useState({})
    const [notify, setNotify] = useState({ visible: false });
    //global state
    const { token } = useSelector((state) => state)

    const playContext = useContext(PlayGroundContext); // Access the AuthContext


    const {waypoint , origin , destination , setCoordinateFunction} = playContext
    const waypointsString = waypoint.length > 0 ? `&${object.type == "direction" ? "waypoints" : "json"}=[${waypoint.map(point => `{${point.lat},${point.lng}}`).join(",")}]` : "";


    //url function
    const urlMap = {
        geocoding : selectedGeocoding == "forward" ? `${BASE_URL}/api/v1/route/geocoding?name=${searchText}&apiKey=${token.token}` :
            `${BASE_URL}/api/v1/route/revgeocoding?lat=${origin.lat == null ? "" : origin.lat}&lon=${origin.lng == null ? "" : origin.lng}&apiKey=${token.token}`,

        direction :`${BASE_URL}/api/v1/route/driving/direction/?la1=${origin.lat == null ? "{}" : origin.lat}&lo1=${origin.lat == null ? "{}" : origin.lng}&la2=${destination.lat == null ? "{}" : destination.lat}&lo2=${destination.lat == null ? "{}" : destination.lng}&apiKey=${token.token}`,
        tss : `${BASE_URL}/api/route/tss?${waypointsString}&apiKey=${token.token}`,
        onm : `${BASE_URL}/api/route/onm?origin=${origin.lat == null ? "{}" : `{${origin.lat},${origin.lng}}`}${waypointsString}&apiKey=${token.token}`,
        matrix : `${BASE_URL}/api/route/matrix?${waypointsString}&apiKey=${token.token}`,
    }

    // helper function
    const setGeocoding = (text) => setSelectedGeocoding(text)
    const  setOptionalParameter = (text) => {
        if(text == "instruction") setInstruction(!instruction)
        if(text == "waypoints") setStartWayPoint(!startWayPoint)
    }






    const renderButton = (type, request) => {
        switch (type) {
            case "start":
                return (
                    <button
                        className={`  bg-[#FFA500] mx-[2%] md:mx-[0%] w-[96%] p-2.5 rounded-[4px] ${selectedButton === "start" ? "bg-[#FFA50]" : "bg-gray-300"} focus:text-white outline-none mt-[1%]`}
                        onClick={(e) => {
                            e.preventDefault();
                            setSelectedButtonFunction("start");
                        }}
                    >
                        origin
                    </button>
                );
            case "waypoint":
                if (request !== "geocoding")
                    return (
                        <button
                            className={`  mx-[2%] md:mx-[0%] w-[96%] p-2.5 rounded-[4px] ${selectedButton === "waypoint" ? "bg-[#FFA500]" : "bg-gray-300"} focus:text-white outline-none mt-[4%]`}
                            onClick={(e) => {
                                e.preventDefault();
                                setSelectedButtonFunction("waypoint");
                            }}
                        >
                            waypoints
                        </button>
                    );
                else return null;
            case "destination":
                return (
                    <button
                        className={`  mx-[2%] md:mx-[0%] w-[96%] p-2.5 rounded-[4px] ${selectedButton === "destination" ? "bg-[#FFA500]" : "bg-gray-300"} focus:text-white outline-none mt-[4%]`}
                        onClick={(e) => {
                            e.preventDefault();
                            setSelectedButtonFunction("destination");
                        }}
                    >
                        destination
                    </button>
                );
            default:
                return null;
        }
    };

    const shouldContinue = () => {
        if(object.type == "direction"){
            if(origin.lat == null || origin.lng == null || destination.lat == null || destination.lng == null){
                return { error : true , message : "check parameters"}
            }else{
                return { error : false}
            }
        }else if(object.type == "onm"){
            if(origin.lat == null || origin.lng == null || waypoint.length == 0){
                return { error : true , message : "check parameters"}
            }else{
                return { error : false}
            }
        }
        else if(object.type == "matrix"){
            if(waypoint.length == 0){
                return { error : true , message : "check parameters"}
            }else{
                return { error : false}
            }
        }
        else if(object.type == "tss"){
            if(waypoint.length == 0){
                return { error : true , message : "check parameters"}
            }else{
                return { error : false}
            }
        }
        else if(object.type == "geocoding"){

            if(selectedGeocoding == "forward"){
                if(searchText.trim().length == 0){
                    return { error : true , message : "check parameters"}
                }else{
                    return { error : false}
                }
            }else if(selectedGeocoding == "reverse"){
                if(origin.lat == null || origin.lng == null){
                    console.log('veryhing is ok')
                    return { error : true , message : "check parameters"}
                }else{
                    return { error : false}
                }
            }

        }
        return { error : true , message : "check parameters"}
    }

    const setForDrawing = (data) => {
        if(object.type == "direction"){
            setCoordinateFunction({type : "direction", coords : data.data.direction})
        }else if(object.type == "onm"){

            let array = [];
            for (let i = 0; i < data.data.directions.length; i++) {

                array.push(data.data.directions[i].direction);

            }

            setCoordinateFunction({type : "onm", coords : array})
        }
        else if(object.type == "matrix"){
            // let array = [];
            // for (let i = 0; i < data.data.response.length; i++) {
            //   for (let j = 0; j < data.data.response[i].length; j++) {
            //     array.push(data.data.response[i][j].data.direction);
            //   }
            // }
            // setCoordinateFunction({type : "matrix", coords : array})
        }
        else if(object.type == "tss"){
            setCoordinateFunction({type : "tss", coords : data.data.direction})
        }else if(object.type == "geocoding"){
            console.log(data.data)
        }

    }
    // based on the
    const calculate = () => {
        let response = shouldContinue()
        if(response.error == true){

            setNotify({ visible: true, msg: response.message, type: "failure" });
            setTimeout(() => setNotify({ visible: false }), 2000);
        }
        else{
            getRoute(urlMap[object.type])
                .then((data) => {

                    if(data.error == null){
                        setApiResponse(data.data)
                        setForDrawing(data)
                    }else{
                        setNotify({ visible: true, msg: "failed", type: "failure" });
                        setTimeout(() => setNotify({ visible: false }), 2000);
                    }


                });
        }



    }


    return (
        <div className="w-full lg:mr-[5%]">
            <div className="relative w-full">
                {object.type === "geocoding" ? React.cloneElement(object.radioInput, { setSelectedButtonFunction, selectedGeocoding, setGeocoding }) : ""}
                {
                    object.type == "geocoding" ?
                        (
                            selectedGeocoding == "forward" ?
                                <div className="mt-[4%] flex flex-col   mx-[2%] md:mx-[0%]">
                                    <lable>search </lable>
                                    <input
                                        type="text"
                                        placeholder="e.g bole"
                                        className="w-full p-2.5 text-3 font-medium bg-zinc-100 text-zinc-800 outline-none border border-grey-500 rounded-[4px] caret-[#FFA500] focus:caret-[#FFA500"
                                        onChange={(e)=>{setSearchText(e.target.value)}}
                                    />
                                </div>: ""
                        ) : ""
                }
                <Notify value={notify} />
                {/* Render buttons based on type */}
                {(object.type === "direction" || object.type === "onm") ? renderButton("start", object.type) : null}
                {object.type === "direction" ? (startWayPoint ? renderButton("waypoint", object.type) : null) : renderButton("waypoint", object.type)}
                {object.type === "direction" ? renderButton("destination", object.type) : null}

                <ul className="list-disc mt-[2%]">
                    {
                        object.type === "geocoding" &&  apiResponse.data != null ?
                            apiResponse.data.map((n) => <li className="ml-[4%]">{n.name}</li>)
                            : ""
                    }



                </ul>
                <div className="mt-[1%]">

                </div>
                <button className={`  mx-[2%] md:mx-[0%] w-[96%] p-2.5 rounded-[4px] bg-[#FFA500] text-white font-bold outline-none mt-[4%]`} onClick={(e)=> {calculate()}}> {object.type === "geocoding" ? "search" : "calculate"}</button>
                {object.type === "direction" ? <p className='mt-[8%] mb-1 font-bold text-lg text-zinc-600 mt-[5%] mx-[2%] md:mx-[0%]'>Optional parameter</p> : ""}

                {
                    object.optionalParameter.map((n) => (
                        <div className="flex space-x-2 " key={n.name}>

                            {/* Render optional parameter radio input */}
                            {n.name === "instruction" ? (
                                <input type="radio" className="mx-[2%] md:mx-[0%]" checked={instruction} onClick={(e) => { setOptionalParameter(n.name) }} />
                            ) : (
                                <input type="radio" className="mx-[2%] md:mx-[0%]" checked={startWayPoint} onClick={(e) => {


                                    setOptionalParameter(n.name) }} />
                            )}
                            <p>{n.name}</p>
                        </div>
                    ))
                }

                <RequestSample className=" mt-[1%]   " curl= {urlMap[object.type]} js={[]} />
                <ResponseSample className=" mt-[2%]   " component = {<JsonViewer data={apiResponse} alwaysExpand = {true}  />} />
            </div>
        </div>
    )
}

export default SideBarForm


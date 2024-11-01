import RadioInputGeocoding from "app/(home)/map-playground/RadioInputGeocoding"


const GeocodingObject = {
    type : "geocoding",
    radioInput : <RadioInputGeocoding  />,
    requestSampleUrl : "https://api.mapbox.com/search/geocode/v6/forward?q={search_text}",
    optionalParameter : [
      
     ]
}



const DirectionObject = {
    type : "direction", 
    requestSampleUrl : "http://localhost:8080/api/route/direction/?origin={8.987685259188599,38.764792722654455}&destination={9.087685259188599,38.764792722654455}&traffic=0&instruction=0&apiKey=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb21wYW55bmFtZSI6ImdlYmV0YSIsImRlc2NyaXB0aW9uIjoibnVsbCBzdHJpbmcgIiwiaWQiOiJhMGFiYzRkYy0yNjRhLTRjNGYtYjU3MC0yYWU0ODhmYTViYzkiLCJ1c2VybmFtZSI6ImdlYmV0YSJ9.pcfDBhYhjIbfBB278X0Ewi7ALeld90F_Vl_JdwjX5qA",
    optionalParameter : [
       { name : "instruction"},
       { name : "waypoints"},
       
    ]
}



const matrixObject = {
    type : "matrix", 
    requestSampleUrl : "https://api.mapbox.com/search/geocode/v6/forward?q={search_text}",
    optionalParameter : [
       { name : "instruction"}
    ]
}


const TssObject = {
    type : "tss", 
    requestSampleUrl : "https://api.mapbox.com/search/geocode/v6/forward?q={search_text}",
    optionalParameter : [
       { name : "instruction"}
    ]
}


const onmObject = {
    type : "onm", 
    requestSampleUrl : "https://api.mapbox.com/search/geocode/v6/forward?q={search_text}",
    optionalParameter : [
       { name : "instruction"}
    ]
}


export const returnPlaygroundObject = (type) => {


     if(type == "onm") return onmObject
    else if(type == "matrix") return matrixObject
    else if (type == "direction") return DirectionObject
    else if (type == "geocoding") return GeocodingObject
    else if (type == "tss") return TssObject
}
const introductionObject = {
    introduction : "A route is a navigable path between a start location, or origin, and an end location, or destination. You can choose to get a route for different modes of transportation, such as walking, biking, or different types of vehicles. You can also request route details such as distance, estimated time to navigate the route, expected tolls, and step-by-step instructions to navigate the route.", 
    usecase : "Use Case of Introduction" , 
    useCaseText : "With the Routes API, you can get accurate routes and trip information using transport details, up-to-date traffic and road conditions, and route preferences:", 
    useCaselist : [
        "Which direction a vehicle is headed",
        "The side of the road for pick ups or drop offs",
        "Traffic conditions and road closures",
        "Safety concerns such as avoiding dangerous areas or providing safe pickup areas",
        "Balance latency, quality, and cost across your routing needs with optional features such as tolls and trip metadata such as time and distance, and fuel efficiency"
        
    ] , 
    requestText :  'curl https://mapapi.gebeta.app/api/route/direction/?origin={lat1},{lon1}&destination={lat2},{lat2}&apiKey={apiKey}', 
    restrictionHeader :"Directions API restrictions and limits" , 
    restriction : {
        header : "The directions API has some restrictions and limits that you need to be aware of before using it. These are.",
        restrictions : [
            "Requests that contain multiple coordinates or waypoints should only be less than 10. This means that you can only specify up to 9 intermediate stops between your origin and destination. If you need more waypoints, you can split your request into multiple requests or use the optimize parameter to reorder your waypoints for the best route.",
            "50 requests per second from a single API token. This means that you can only send up to 50 requests in one second using the same token. If you exceed this limit, you will receive an error message and your requests will be rejected. To avoid this, you can throttle your requests or use multiple tokens for different applications or users.",
            "Inter-country requests are not allowed. This means that you can only request directions within the same country or region. If you try to request directions across different countries or regions, you will receive an error message and your request will be invalid. To get directions for inter-country travel, you can use other map services or APIs that support this feature."
        ]
    }, 
    pricingHeader : "Directions API pricing",
    pricingText : "The directions API charges you based on the number of requests you make. The price per request decreases as you make more requests. For the first 100,000 requests, you pay 2$ for every 1,000 requests. For the next 400,000 requests, you pay 1.75$ for every 1,000 requests. For the next 500,000 requests, you pay 1.5$ for every 1,000 requests. For any requests above 1,000,000, you pay 1$ for every 1,000 requests. For example, if you make 2,000,000 requests, you will pay 2,000$. For more information check the pricing page" ,
    
    responseTable   : [
        {
          "status": 200,
          "message": "ok",
          "description": "The request was successful. The route was found and returned."
        },
        {
          "status": 404,
          "message": "NoRoute",
          "description": "No route could be found between the given locations."
        },
        {
          "status": 404,
          "message": "NoSegment",
          "description": "No road segment could be matched for the given coordinates."
        },
        {
          "status": 401,
          "message": "Not Authorized - No Token",
          "description": "The request lacks a valid authentication token. Please provide a valid token."
        },
        {
          "status": 401,
          "message": "Not Authorized - Invalid Token",
          "description": "The provided authentication token is invalid or has expired. Please provide a valid token."
        },
        {
          "status": 422,
          "message": "InvalidInput",
          "description": "The request contains invalid input parameters. Please check your input and try again."
        }
      ],

    optionalParameter : [
        {
            name: "instruction",
            description: "Whether to return SSML marked-up text for voice guidance along the route (true) or not (false, default). Must be used in conjunction with steps=true."
        },
        {
            name: "waypoints",
            description: "an array of semicolon separated list of latitude and longitude to specify which places to visit along the way"
        }
    ],
    requiredParameter : [
        {
            name: "origin and destination",
            description: "origin and destnation are  semicolon-separated list of coordinates  {longitude , latitude}."
        },
        {
            name: "apikey",
            description: "you api key"
        }
    ]
}

// direction

const DirectionObject = {
    introduction : "A direction API is a service that provides directions for different types of travel modes, such as driving, walking, cycling, or public transit. You can use a direction API to get the best route from one place to another, along with information such as travel time, distance, traffic conditions, and turn-by-turn instructions. With GebetaMaps, you can easily get a token and start using the direction API to plan your trips and explore new places. GebetaMaps is a map service that offers high-quality maps, geocoding, and routing for Ethiopia and beyond.", 
    usecase : "Use Case of Direction API" , 
    useCaseText : "With the Routes API, you can get accurate routes and trip information using transport details, up-to-date traffic and road conditions, and route preferences:", 
    useCaselist : [
        "You can use direction API to find the fastest route to your destination, avoiding traffic jams and road closures.",
        "You can use direction API to integrate navigation features into your own app or website, such as showing directions, maps, and estimated travel times to your users.",
        "You can use direction API to optimize your delivery routes, such as finding the shortest or most efficient route to deliver your goods or services to multiple locations.",
        "You can use direction API to create interactive and engaging experiences, such as games, quizzes, and tours, that use directions and maps as part of the gameplay or content.",
        "You can use direction API to access real-time and historical traffic data, such as traffic flow, incidents, and congestion levels, and use it for research, planning, or forecasting purposes."
        
    ] , 
    requestText :  'curl https://mapapi.gebeta.app/api/route/direction/?origin={lat1},{lon1}&destination={lat2},{lat2}&apiKey={apiKey}', 
    restrictionHeader :"Directions API restrictions and limits" , 
    restriction : {
        header : "The directions API has some restrictions and limits that you need to be aware of before using it. These are.",
        restrictions : [
            "Requests that contain multiple coordinates or waypoints should only be less than 10. This means that you can only specify up to 9 intermediate stops between your origin and destination. If you need more waypoints, you can split your request into multiple requests or use the optimize parameter to reorder your waypoints for the best route.",
            "50 requests per second from a single API token. This means that you can only send up to 50 requests in one second using the same token. If you exceed this limit, you will receive an error message and your requests will be rejected. To avoid this, you can throttle your requests or use multiple tokens for different applications or users.",
            "Inter-country requests are not allowed. This means that you can only request directions within the same country or region. If you try to request directions across different countries or regions, you will receive an error message and your request will be invalid. To get directions for inter-country travel, you can use other map services or APIs that support this feature."
        ]
    }, 
    pricingHeader : "Directions API pricing",
    pricingText : "The directions API charges you based on the number of requests you make. The price per request decreases as you make more requests. For the first 100,000 requests, you pay 2$ for every 1,000 requests. For the next 400,000 requests, you pay 1.75$ for every 1,000 requests. For the next 500,000 requests, you pay 1.5$ for every 1,000 requests. For any requests above 1,000,000, you pay 1$ for every 1,000 requests. For example, if you make 2,000,000 requests, you will pay 2,000$. For more information check the pricing page" ,
   
    responseTable : [
        {
          "status": 200,
          "message": "ok",
          "description": "The request was successful. The route was found and returned."
        },
        {
          "status": 404,
          "message": "NoRoute",
          "description": "No route could be found between the given locations."
        },
        {
          "status": 404,
          "message": "NoSegment",
          "description": "No road segment could be matched for the given coordinates."
        },
        {
          "status": 401,
          "message": "Not Authorized - No Token",
          "description": "The request lacks a valid authentication token. Please provide a valid token."
        },
        {
          "status": 401,
          "message": "Not Authorized - Invalid Token",
          "description": "The provided authentication token is invalid or has expired. Please provide a valid token."
        },
        {
          "status": 422,
          "message": "InvalidInput",
          "description": "The request contains invalid input parameters. Please check your input and try again."
        }
      ],

    optionalParameter : [
        {
            name: "instruction",
            description: "A turn by turn instruction from the origin point to destnation"
        },
        {
            name: "waypoints",
            description: "an array of semicolon separated list of latitude and longitude to specify which places to visit along the way"
        }
    ],
    requiredParameter : [
        {
            name: "origin and destination",
            description: "origin and destnation are  semicolon-separated list of coordinates  {longitude , latitude}."
        },
        {
            name: "apikey",
            description: "you api key"
        }
    ]
}



// onm
const TssObject  = {
    introduction : "A route optimization is a process of finding the best route or routes for a given set of criteria, such as minimizing travel time, distance, cost, or environmental impact. You can use the route optimization API to get the optimal route or routes for multiple origins and destinations, taking into account various factors such as traffic conditions, road restrictions, vehicle specifications, and user preferences. You can also request route optimization details such as the order of visits, the total travel time and distance, the estimated arrival and departure times, and the route instructions. With GebetaMaps, you can easily get a token and start using the route optimization API to access the most efficient and effective solutions for your routing problems.", 
    usecase : "Use Case of Route Optmization API" , 
    useCaseText : "With the Route Optmization API, you can get accurate routes and trip information using transport details, up-to-date traffic and road conditions, and route preferences:", 
    useCaselist : [
        "You can use the route optimization API to plan your road trip by finding the best route to visit multiple destinations. You can specify your budget, time limit, and preferred attractions, and get the optimal route that maximizes your enjoyment and minimizes your expenses.",
        "You can use the route optimization API to manage your fleet by finding the best routes for your vehicles and drivers. You can assign different tasks, priorities, and constraints to each vehicle and driver, and get the optimal routes that meet your business goals and customer expectations.",
        "You can use the route optimization API to deliver your goods by finding the best routes for your delivery trucks and couriers. You can optimize your routes based on the delivery time windows, the capacity and fuel consumption of your trucks, and the availability and skills of your couriers.",
        "You can use the route optimization API to commute to work by finding the best route for your mode of transportation. You can compare the travel time, distance, cost, and environmental impact of different modes of transportation, such as driving, biking, or taking public transit, and choose the best option for you.",
       
    ] , 
    requestText :  'curl https://mapapi.gebeta.app/api/route/tss/?json=[]&apiKey={yourapikey}&includeCoordinate=1', 
    restrictionHeader :"Route Optmization API restrictions and limits" , 
    restriction : {
        header : "The Route Optmization API has some restrictions and limits that you need to be aware of before using it. These are.",
        restrictions : [
          
                "coordinates  waypoints should only be less than or equal to 10. ",
                "50 requests per second from a single API token. This means that you can only send up to 50 requests in one second using the same token. If you exceed this limit, you will receive an error message and your requests will be rejected. To avoid this, you can throttle your requests or use multiple tokens for different applications or users.",
                "Inter-country requests are not allowed. This means that you can only request directions within the same country or region. If you try to request directions across different countries or regions, you will receive an error message and your request will be invalid. To get directions for inter-country travel, you can use other map services or APIs that support this feature."
            ]
    }, 
    pricingHeader : "Route Optmization API pricing",
    pricingText : "The Route Optmization API charges you based on the number of elements you request. An element is the travel time and distance between one origin and one destination. The price per element decreases as you request more elements. For the first 1,000,000 elements, you pay 2$ for every 10,000 elements. For the next 4,000,000 elements, you pay 1.75$ for every 10,000 elements. For the next 5,000,000 elements, you pay 1.5$ for every 10,000 elements. For any elements above 10,000,000, you pay 1$ for every 10,000 elements. For example, if you request 20,000,000 elements, you will pay 20,000$. For more information check the pricing page. Note that one Route Optimization API call is considered by the number of coordinates in the json array, so you will be charged accordingly.",
    responseTable : [
        {
          "status": 200,
          "message": "ok",
          "description": "The request was successful. The route was found and returned."
        },
        {
          "status": 404,
          "message": "NoRoute",
          "description": "No route could be found between the given locations."
        },
        {
          "status": 404,
          "message": "NoSegment",
          "description": "No road segment could be matched for the given coordinates."
        },
        {
          "status": 401,
          "message": "Not Authorized - No Token",
          "description": "The request lacks a valid authentication token. Please provide a valid token."
        },
        {
          "status": 401,
          "message": "Not Authorized - Invalid Token",
          "description": "The provided authentication token is invalid or has expired. Please provide a valid token."
        },
        {
          "status": 422,
          "message": "InvalidInput",
          "description": "The request contains invalid input parameters. Please check your input and try again."
        }
      ],

    optionalParameter : [
        {
            name: "includeCoordinate",
            description: "whether to include gps coordiates or not when responding"
        }
    ],
    requiredParameter : [
        {
            name: "json",
            description: "an array of semicolon separated list of latitude and longitude to specify which places to visit along the way"
        },
        {
            name: "apikey",
            description: "you api key"
        }
    ]
}



// matrix
const matrixObject = {
    introduction : "A matrix is a collection of travel times and distances between multiple origins and destinations. You can use the matrix API to calculate the best routes for different scenarios, such as optimizing delivery routes, planning trips, or analyzing traffic patterns. With GebetaMaps, you can easily get a token and start using the matrix API to access reliable and accurate data for your routing needs.", 
    usecase : "Use Case of matrix API" , 
    useCaseText : "With the Routes API, you can get accurate routes and trip information using transport details, up-to-date traffic and road conditions, and route preferences:", 
    useCaselist : [
        "You can use the matrix API to find the nearest point of interest from your current location, such as a restaurant, a hospital, or a gas station.",
        "You can use the matrix API to optimize your delivery routes by finding the best order to visit multiple destinations. ",
        "You can use the matrix API to plan your trips by finding the best routes to multiple destinations. ",
        "You can use the matrix API to estimate the cost of transportation by multiplying the travel distances by the fuel price and the vehicle efficiency.",

    ] , 
    requestText :  'curl https://mapapi.gebeta.app/api/route/matrix/?json=[]&apiKey={}', 
    restrictionHeader :"Matrix API restrictions and limits" , 
    restriction : {
        header : "The Matrix API has some restrictions and limits that you need to be aware of before using it. These are.",
        restrictions : [
            "coordinates  waypoints should only be less than or equal to 10. ",
            "50 requests per second from a single API token. This means that you can only send up to 50 requests in one second using the same token. If you exceed this limit, you will receive an error message and your requests will be rejected. To avoid this, you can throttle your requests or use multiple tokens for different applications or users.",
            "Inter-country requests are not allowed. This means that you can only request directions within the same country or region. If you try to request directions across different countries or regions, you will receive an error message and your request will be invalid. To get directions for inter-country travel, you can use other map services or APIs that support this feature."
        ]
    }, 
    pricingHeader : "Matrix API pricing",
    pricingText : "The matrix API charges you based on the number of elements you request. An element is the travel time and distance between one origin and one destination. The price per element decreases as you request more elements. For the first 1,000,000 elements, you pay 2$ for every 10,000 elements. For the next 4,000,000 elements, you pay 1.75$ for every 10,000 elements. For the next 5,000,000 elements, you pay 1.5$ for every 10,000 elements. For any elements above 10,000,000, you pay 1$ for every 10,000 elements. For example, if you request 20,000,000 elements, you will pay 20,000$. For more information check the pricing page. Note that one matrix API call is considered by the number of coordinates in the json array, so you will be charged accordingly.",
    responseTable : [
        {
          "status": 200,
          "message": "ok",
          "description": "The request was successful. The route was found and returned."
        },
        {
          "status": 404,
          "message": "NoRoute",
          "description": "No route could be found between the given locations."
        },
        {
          "status": 404,
          "message": "NoSegment",
          "description": "No road segment could be matched for the given coordinates."
        },
        {
          "status": 401,
          "message": "Not Authorized - No Token",
          "description": "The request lacks a valid authentication token. Please provide a valid token."
        },
        {
          "status": 401,
          "message": "Not Authorized - Invalid Token",
          "description": "The provided authentication token is invalid or has expired. Please provide a valid token."
        },
        {
          "status": 422,
          "message": "InvalidInput",
          "description": "The request contains invalid input parameters. Please check your input and try again."
        }
      ],

    optionalParameter : [
        {
            name: "includeCoordinate",
            description: "whether to include gps coordiates or not when responding"
        }
    
    ],
    requiredParameter : [
        {
            name: "json",
            description: "an array of semicolon separated list of latitude and longitude to specify which places to visit along the way"
        },
        {
            name: "apikey",
            description: "you api key"
        }
    ]
}

// tss
const onmObject = {
    introduction : "An ONM is a collection of travel times and distances between single origins and  multiple destinations. You can use the ONM API to calculate the best routes for different scenarios, such as optimizing delivery routes, planning trips, or analyzing traffic patterns. With GebetaMaps, you can easily get a token and start using the matrix API to access reliable and accurate data for your routing needs.", 
    usecase : "Use Case of ONM API" , 
    useCaseText : "With the ONM API, you can get accurate routes and trip information using transport details, up-to-date traffic and road conditions, and route preferences:", 
    useCaselist : [
        "You can use the ONM API to find the nearest point of interest from your current location, such as a restaurant, a hospital, or a gas station.",
        "You can use the ONM API to optimize your delivery routes by finding the best order to visit multiple destinations. ",
        "You can use the ONM API to plan your trips by finding the best routes to multiple destinations. ",
        "You can use the ONM API to estimate the cost of transportation by multiplying the travel distances by the fuel price and the vehicle efficiency.",

    ] ,  
    requestText :  'curl https://mapapi.gebeta.app/api/route/onm/?json=[]&origin={}&apiKey={}', 
    restrictionHeader :"ONM API restrictions and limits" , 
    restriction : {
        header : "The ONM API has some restrictions and limits that you need to be aware of before using it. These are.",
        restrictions : [
            "Requests that contain multiple coordinates or destinations  should only be less than 10. ",
            "50 requests per second from a single API token. This means that you can only send up to 50 requests in one second using the same token. If you exceed this limit, you will receive an error message and your requests will be rejected. To avoid this, you can throttle your requests or use multiple tokens for different applications or users.",
            "Inter-country requests are not allowed. This means that you can only request directions within the same country or region. If you try to request directions across different countries or regions, you will receive an error message and your request will be invalid. To get directions for inter-country travel, you can use other map services or APIs that support this feature."
        ]
    }, 
    pricingHeader : "ONM API pricing",
    pricingText : "The ONM API charges you based on the number of elements you request. An element is the travel time and distance between one origin and one destination. The price per element decreases as you request more elements. For the first 1,000,000 elements, you pay 2$ for every 10,000 elements. For the next 4,000,000 elements, you pay 1.75$ for every 10,000 elements. For the next 5,000,000 elements, you pay 1.5$ for every 10,000 elements. For any elements above 10,000,000, you pay 1$ for every 10,000 elements. For example, if you request 20,000,000 elements, you will pay 20,000$. For more information check the pricing page. Note that one matrix API call is considered by the number of coordinates or number of destinations, so you will be charged accordingly.",
    responseTable : [
        {
          "status": 200,
          "message": "ok",
          "description": "The request was successful. The route was found and returned."
        },
        {
          "status": 404,
          "message": "NoRoute",
          "description": "No route could be found between the given locations."
        },
        {
          "status": 404,
          "message": "NoSegment",
          "description": "No road segment could be matched for the given coordinates."
        },
        {
          "status": 401,
          "message": "Not Authorized - No Token",
          "description": "The request lacks a valid authentication token. Please provide a valid token."
        },
        {
          "status": 401,
          "message": "Not Authorized - Invalid Token",
          "description": "The provided authentication token is invalid or has expired. Please provide a valid token."
        },
        {
          "status": 422,
          "message": "InvalidInput",
          "description": "The request contains invalid input parameters. Please check your input and try again."
        }
      ],

    optionalParameter : [
        {
            name: "includeCoordinate",
            description: "whether to include gps coordiates or not when responding"
        }
    ],
    requiredParameter : [
        {
            name: "origin",
            description: "origin is  latitude and longitue like   {longitude , latitude}."
        },
        {
            name : "json",
            description : "an array of semicolon separated list of latitude and longitude to specify which places to visit along the way"
        },
        {
            name: "apikey",
            description: "you api key"
        }
    ]
}




//geocoding

const GeocodingObject = {
    introduction : "Geocoding is a process of finding places that match a user's query or interest on the map, such as restaurants, hotels, parks, or museums. You can use the searching API to get the list of places that are similar to your search, along with their ratings, reviews, photos, and contact information. You can also request searching details such as the distance, the direction, and the availability of the places. With GebetaMaps, you can easily get a token and start using the searching API to access the most relevant and up-to-date data for your place needs.", 
    usecase : "Use Case of Geocoding API" , 
    useCaseText : "With the Routes API, you can get accurate routes and trip information using transport details, up-to-date traffic and road conditions, and route preferences:", 
    useCaselist : [
        "You can use the geocoding API to get the coordinates of an address by entering the street name, city name, postal code, or any other information that identifies the location. You can use the coordinates to display the location on a map, calculate the distance and direction to other locations, or perform spatial analysis",
        "You can use the geocoding API to get the address of a coordinate by entering the latitude and longitude values of the location. You can use the address to label the location on a map, get the administrative boundaries, or perform reverse geocoding.",
     
    ] , 
    requestText :  'curl https://mapapi.gebeta.app/api/v1/route/geocoding?name={}&apiKey={}', 
    restrictionHeader :"Geocoding API restrictions and limits" , 
    restriction : {
        header : "The Geocoding API has some restrictions and limits that you need to be aware of before using it. These are.",
        restrictions : [
            "50 requests per second from a single API token. This means that you can only send up to 50 requests in one second using the same token. If you exceed this limit, you will receive an error message and your requests will be rejected. To avoid this, you can throttle your requests or use multiple tokens for different applications or users.",
        ]
    }, 
    pricingHeader : "Geocoding API pricing",
    pricingText : "The Geocoding API charges you based on the number of requests you make. The price per request decreases as you make more requests. For the first 100,000 requests, you pay 2$ for every 1,000 requests. For the next 400,000 requests, you pay 1.75$ for every 1,000 requests. For the next 500,000 requests, you pay 1.5$ for every 1,000 requests. For any requests above 1,000,000, you pay 1$ for every 1,000 requests. For example, if you make 2,000,000 requests, you will pay 2,000$. For more information check the pricing page" ,
   
    responseTable : [
        {
          "status": 200,
          "message": "ok",
          "description": "The request was successful. The route was found and returned."
        },
        {
          "status": 404,
          "message": "NoRoute",
          "description": "No route could be found between the given locations."
        },
        {
          "status": 404,
          "message": "NoSegment",
          "description": "No road segment could be matched for the given coordinates."
        },
        {
          "status": 401,
          "message": "Not Authorized - No Token",
          "description": "The request lacks a valid authentication token. Please provide a valid token."
        },
        {
          "status": 401,
          "message": "Not Authorized - Invalid Token",
          "description": "The provided authentication token is invalid or has expired. Please provide a valid token."
        },
        {
          "status": 422,
          "message": "InvalidInput",
          "description": "The request contains invalid input parameters. Please check your input and try again."
        }
      ],

    optionalParameter : [
        {
            name: "name",
            description: "name of the place you want to search"
        }
    ],
    requiredParameter : [
        
    ]
}
// geocoding
// direction
// matrix
// tss
// onm



export const documentationSideBarLinks =  [
    { 
        name: "Introduction", 
        href: "intro",
        subList : [
            { 
                name : 'Introduction to Rust',
                href : "javascript:void(0)"
            },
        ]

    }, 

    { 
        name: "Direction", 
        href: "direction",
        subList : [
            { 
                name : 'Overview',
                href : "javascript:void(0)"
            },
            { 
                name : 'use case of Direction API',
                href : "javascript:void(0)"
            },
            { 
                name : 'Requirement parameter',
                href : "javascript:void(0)"
            },
            { 
                name : 'Optional parameter',
                href : "javascript:void(0)"
            },
            { 
                name : 'Directions API Responses',
                href : "javascript:void(0)"
            },
            { 
                name : 'Directions API restrictions and limits',
                href : "javascript:void(0)"
            },
            { 
                name : 'Directions API pricing',
                href : "javascript:void(0)"
            },
            
        ]

    }, 

    { 
        name: "Matrix", 
        href: "matrix",
        subList : [
            { 
                name : 'Overview',
                href : "javascript:void(0)"
            },
            { 
                name : 'use case of Direction API',
                href : "javascript:void(0)"
            },
            { 
                name : 'Requirement parameter',
                href : "javascript:void(0)"
            },
            { 
                name : 'Optional parameter',
                href : "javascript:void(0)"
            },
            { 
                name : 'Directions API Responses',
                href : "javascript:void(0)"
            },
            { 
                name : 'Directions API restrictions and limits',
                href : "javascript:void(0)"
            },
            { 
                name : 'Directions API pricing',
                href : "javascript:void(0)"
            },
            
        ]

    }, 
    { 
        name: "ONM", 
        href: "onm",
        subList : [
            { 
                name : 'Overview',
                href : "javascript:void(0)"
            },
            { 
                name : 'use case of Direction API',
                href : "javascript:void(0)"
            },
            { 
                name : 'Requirement parameter',
                href : "javascript:void(0)"
            },
            { 
                name : 'Optional parameter',
                href : "javascript:void(0)"
            },
            { 
                name : 'Directions API Responses',
                href : "javascript:void(0)"
            },
            { 
                name : 'Directions API restrictions and limits',
                href : "javascript:void(0)"
            },
            { 
                name : 'Directions API pricing',
                href : "javascript:void(0)"
            },
            
        ]

    }, 
    { 
        name: "Route Optimization", 
        href: "tss",
        subList : [
            { 
                name : 'Overview',
                href : "javascript:void(0)"
            },
            { 
                name : 'use case of Direction API',
                href : "javascript:void(0)"
            },
            { 
                name : 'Requirement parameter',
                href : "javascript:void(0)"
            },
            { 
                name : 'Optional parameter',
                href : "javascript:void(0)"
            },
            { 
                name : 'Directions API Responses',
                href : "javascript:void(0)"
            },
            { 
                name : 'Directions API restrictions and limits',
                href : "javascript:void(0)"
            },
            { 
                name : 'Directions API pricing',
                href : "javascript:void(0)"
            },
            
        ]

    }, 

    { 
        name: "Geocoding", 
        href: "geocoding",
        subList : [
            { 
                name : 'Overview',
                href : "javascript:void(0)"
            },
            { 
                name : 'use case of Direction API',
                href : "javascript:void(0)"
            },
            { 
                name : 'Requirement parameter',
                href : "javascript:void(0)"
            },
            { 
                name : 'Optional parameter',
                href : "javascript:void(0)"
            },
            { 
                name : 'Directions API Responses',
                href : "javascript:void(0)"
            },
            { 
                name : 'Directions API restrictions and limits',
                href : "javascript:void(0)"
            },
            { 
                name : 'Directions API pricing',
                href : "javascript:void(0)"
            },
            
        ]

    },

    // { 
    //     name: "MapMatching", 
    //     href: "intro",
    //     subList : [
    //         { 
    //             name : 'Overview',
    //             href : "javascript:void(0)"
    //         },
    //         { 
    //             name : 'use case of Direction API',
    //             href : "javascript:void(0)"
    //         },
    //         { 
    //             name : 'Requirement parameter',
    //             href : "javascript:void(0)"
    //         },
    //         { 
    //             name : 'Optional parameter',
    //             href : "javascript:void(0)"
    //         },
    //         { 
    //             name : 'Directions API Responses',
    //             href : "javascript:void(0)"
    //         },
    //         { 
    //             name : 'Directions API restrictions and limits',
    //             href : "javascript:void(0)"
    //         },
    //         { 
    //             name : 'Directions API pricing',
    //             href : "javascript:void(0)"
    //         },
            
    //     ]

    // }, 

]


export const returnDocumentationObject = (type) => {

    if(type == "intro") return introductionObject
    else if(type == "onm") return onmObject
    else if(type == "matrix") return matrixObject
    else if (type == "direction") return DirectionObject
    else if (type == "geocoding") return GeocodingObject
    else if (type == "tss") return TssObject
}
"use client"
import React, {useState} from 'react'

const ResponseSample = (props) => {
    const [requestLanguage, setRequestLanguage] = useState(0)
    const handlerequestLanguage = (i) => setRequestLanguage(i)
    return (
        <div className='w-full mt-[10%] h-[50%] mx-[2%] md:mx-[0%]'>
            <h3 className="mt-4 text-md font-semibold text-gray-800 mb-3">Response samples</h3>
            <div className='border-grey-500 bg-zinc-100 text-zinc-800 text-sm mt-[2%] py-[1%] mb-[1%]'
                 style={{height: requestLanguage === 0 ? 'auto' : '300px'}}>
                {props.component}
            </div>
        </div>
    )
}

export default ResponseSample
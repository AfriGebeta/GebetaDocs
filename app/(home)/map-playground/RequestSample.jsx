"use client"
import React, {useState} from 'react'

const RequestSample = (props) => {
    const [requestLanguage, setRequestLanguage] = useState(0)
    const handlerequestLanguage = (i) => setRequestLanguage(i)
    return (
        <div className='mt-[10%] mx-[2%] md:mx-[0%]'>
            <p className='mt-[2%] font-bold text-lg text-zinc-600 mb-2'>Request samples</p>
            <div className='border-grey-500 bg-zinc-100 text-zinc-800  mt-[2%] py-4 mb-[1%]' style={{ height: requestLanguage === 0 ? 'auto' : '300px'}}>
                <p className='mx-[2%] space-x-2 pb-[1%] break-all text-sm'>{props.curl}</p>
            </div>
        </div>
    )
}

export default RequestSample
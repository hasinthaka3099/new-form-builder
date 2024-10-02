import React from 'react'
import { TbFidgetSpinner } from "react-icons/tb";


function Loading() {
  return (
    <div className='flex items-center justify-center w-full h-full'>
        <TbFidgetSpinner className='animate-spin h-12 w-12'/>
    </div>
  )
}

export default Loading;
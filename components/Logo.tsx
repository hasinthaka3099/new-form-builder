import Link from 'next/link'
import React from 'react'

function Logo() {
  return (
    <Link href={"/"} className='ml-6 font-bold text-2xl bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text hover:cursor-pointer'>
        Processtra Workflow Management

    </Link>

  )
}

export default Logo
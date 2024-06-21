"use client"
import { useUser } from '@clerk/nextjs'
import React from 'react'

const WelcomeMsg = () => {
    const {isSignedIn,  isLoaded,user} = useUser()
  return isLoaded && (
    <div className='space-y-2 mb-4'>
        <h2 className=' text-2xl lg:text-4xl text-white font-medium '>
            Welcome back{isLoaded ? ", ":""}{user?.firstName}  👋
        </h2>
        <p className='text-sm lg:text-base text-[#89b6fd]'> This is your Financial Overview Report</p>
    </div>
  )
}

export default WelcomeMsg
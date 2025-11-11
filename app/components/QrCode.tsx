"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'


const QrCode = () => {
  return (
    <Link href={"https://cnfans.com/register?ref=1507752"} className='shadow-sm text-white/70 flex z-50 rounded-2xl flex-col justify-center text-center p-3 bg-white fixed bottom-4 right-4'>
      <p className='text-black font-bold'>Sign Up bonus</p>
      <Image src={"/images/qr.svg"} alt='Qr for sign up' height={100} width={100} className='mx-auto '  />
      <p className='text-black font-bold'>SCAN OR CLICK !</p>
    </Link>
  )
}

export default QrCode

import React from 'react';
import HeaderSlider from './components/HeaderSlider';
import QrCode from './components/QrCode';
import { Canvas } from '@react-three/fiber';
import ModelScene from './components/Model';
import Grid from './components/Grid';
import Marquee from 'react-fast-marquee';

export const marqueeList: string[] = [
  "Best QC Photos",
  "Jordan 4",
  "Get Shipping Coupons",
  "Trapstar",
  "Verified Links",
  "Corteiz",
  "Register for a Bonus",
  "Yeezy Slides",
  "Daily Updates",
  "Essentials"
];
 


export default function Home() {

  return (
    <main className="text-white">
      <header className=" flex h-screen justify-center items-center relative px-5 sm:px-0">
        <div className="text-center text-5xl ">
          <h1 className="text-7xl font-bold">Best CnFans Finds</h1>
          <HeaderSlider />
        </div>
        <ModelScene />
      </header>
      <div className='bg-[#121212] py-20 px-5 space-y-30'>
        <Marquee autoFill gradient gradientColor='#121212' className='max-w-7xl mx-auto text-xl sm:text-2xl'>
          {marqueeList.map((item) => (
            <p className=' px-4 sm:px-8' key={item}>{item}</p>
          ))}
        </Marquee>
        <div className='max-w-7xl mx-auto space-y-5'>
          <h3 className='text-5xl'>Best Brands</h3>
          <div className=' gap-5 flex flex-col sm:flex-row text-2xl'>
            <div className='relative w-full rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105'>
              <div className='block h-50  bg-linear-to-br from-[#121212] via-purple-950 to-blue-950'/>
              <p className='absolute left-5 font-bold bottom-2'>NIKE</p>
            </div>
            <div className='relative w-full rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105'>
              <div className='block h-50  bg-linear-to-br from-[#121212] via-purple-950 to-blue-950'/>
              <p className='absolute left-5 font-bold bottom-2'>CORTEIZ</p>
            </div>
            <div className='relative w-full rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105'>
              <div className='block h-50  bg-linear-to-br from-[#121212] via-purple-950 to-blue-950'/>
              <p className='absolute left-5 font-bold bottom-2'>TRAPSTAR</p>
            </div>
            <div className='relative w-full rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105'>
              <div className='block h-50  bg-linear-to-br from-[#121212] via-purple-950 to-blue-950'/>
              <p className='absolute left-5 font-bold bottom-2'>LOUIS VUITTON</p>
            </div>
          </div>
        </div>
        {/* === SEKCE PRO NAHLÁŠENÍ PROBLÉMU === */}
        <div className='max-w-7xl mx-auto space-y-5'>
          <h3 className='text-5xl'>Link not working?</h3>
          
          {/* Tady je ten nový obsah */}
          <div 
            className="
              bg-gray-800/50 
              border border-gray-700 
              rounded-lg 
              p-8 
              flex flex-col sm:flex-row 
              justify-between 
              items-center 
              gap-6
            "
          >
            <div>
              <p className="text-2xl font-semibold text-white">
                Found a broken link or need help?
              </p>
              <p className="text-white/60 mt-1">
                Let us know! We will do our best to fix it or find what you're looking for.
              </p>
            </div>
            
            <a 
              href="mailto:zavi@cnfanssheets.com" 
              className="bg-blue-600/70 px-4 py-2 rounded-lg"
            >
              Contact Us
            </a>
          </div>
        </div>
        <div className='max-w-7xl mx-auto space-y-5'>
          <h3 className='text-5xl'>Best finds</h3>
          <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>

          </div>
        </div>
      </div>
    </main>
  );
}
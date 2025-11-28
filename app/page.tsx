import React from 'react';
import HeaderSlider from './components/HeaderSlider';
import QrCode from './components/QrCode';
import { Canvas } from '@react-three/fiber';
import ModelScene from './components/Model';
import Grid from './components/Grid';
import Marquee from 'react-fast-marquee';
import Win from './components/Win';
import BestFinds from './components/BestFinds';
import Fix from './components/Fix';

export const marqueeList: string[] = [
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
        <BestFinds />
        <Marquee autoFill gradient gradientColor='#121212' className='max-w-7xl mx-auto text-xl sm:text-2xl'>
          {marqueeList.map((item) => (
            <p className=' px-4 sm:px-8' key={item}>{item}</p>
          ))}
        </Marquee>
        <Fix />
      </div>
    </main>
  );
}
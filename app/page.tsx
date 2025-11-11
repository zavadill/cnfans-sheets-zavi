import React from 'react';
import HeaderSlider from './components/HeaderSlider';
import QrCode from './components/QrCode';
import { Canvas } from '@react-three/fiber';
import ModelScene from './components/Model';
import Grid from './components/Grid';
 

export default function Home() {
  return (
    <div className=" text-white min-h-screen">
      <header className=" flex h-screen justify-center items-center relative px-5 sm:px-0">
        <div className="text-center text-5xl ">
          <h1 className="text-7xl font-bold">Best CnFans Finds</h1>
          <HeaderSlider />
        </div>
        <ModelScene />
      </header>
      <div className='bg-[#121212] py-20 px-5 sm:px-0'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-5xl'>
            <h3>Best finds</h3>
            <p className='text-2xl'>This is my best CnFans finds</p>
          </div>
          <div className='mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            <Grid title='Jordan 4 x Travis scott'  img='sdsd' price='150' href='linkkkk'/>
            <Grid title='Jordan 4 x Travis scott'  img='sdsd' price='150' href='linkkkk'/><Grid title='Jordan 4 x Travis scott'  img='sdsd' price='150' href='linkkkk'/><Grid title='Jordan 4 x Travis scott'  img='sdsd' price='150' href='linkkkk'/><Grid title='Jordan 4 x Travis scott'  img='sdsd' price='150' href='linkkkk'/><Grid title='Jordan 4 x Travis scott'  img='sdsd' price='150' href='linkkkk'/><Grid title='Jordan 4 x Travis scott'  img='sdsd' price='150' href='linkkkk'/><Grid title='Jordan 4 x Travis scott'  img='sdsd' price='150' href='linkkkk'/><Grid title='Jordan 4 x Travis scott'  img='sdsd' price='150' href='linkkkk'/><Grid title='Jordan 4 x Travis scott'  img='sdsd' price='150' href='linkkkk'/><Grid title='Jordan 4 x Travis scott'  img='sdsd' price='150' href='linkkkk'/><Grid title='Jordan 4 x Travis scott'  img='sdsd' price='150' href='linkkkk'/><Grid title='Jordan 4 x Travis scott'  img='sdsd' price='150' href='linkkkk'/>
          </div>
        </div>
      </div>
    </div>
  );
}
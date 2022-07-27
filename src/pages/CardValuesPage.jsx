import React from 'react';
import { GiHearts, GiSpades, GiDiamonds, GiClubs } from 'react-icons/gi';
const CardValuesPage = () => {
  return (
    <>
    <div className='!mt-10 flex flex-col sm:flex-row container justify-around bg-slate-50 p-4 pr-0 sm:pr-12  rounded items-center'>
        <div className='flex items-center'>
            <GiHearts size={'4rem'} className='text-red-600 w-32'></GiHearts>
            <p className='text-black text-2xl'>400</p>
        </div>
        <div className='flex items-center'>
            <GiSpades size={'4rem'} className='text-black w-32'></GiSpades>
            <p className='text-black text-2xl'>300</p>
        </div>
        <div className='flex items-center'>
            <GiDiamonds size={'4rem'} className='text-red-600 w-32'></GiDiamonds>
            <p className='text-black text-2xl'>200</p>
        </div>
        <div className='flex items-center'>
            <GiClubs size={'4rem'} className='text-black w-32'></GiClubs>
            <p className='text-black text-2xl'>100</p>
        </div>
    </div>
    </>
  )
}

export default CardValuesPage
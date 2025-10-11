'use client';

import React from 'react'

const ShapesExpand = () => {
  return (
    <div className='h-screen m-4'>
      <div className='bg-red-600 rounded-2xl h-full relative'>
        <div className='absolute bg-blue-600 rounded-2xl h-full right-4 top-4 z-20'></div>
      </div>

    </div>
  )
}

export default ShapesExpand
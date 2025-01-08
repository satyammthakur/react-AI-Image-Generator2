import React, { useRef, useState } from 'react'
import ivy from "../Assests/ivy.svg"
import punk from "../Assests/punk.svg"
function ImageGenerator() {
  const [imageUrl , setImageUrl]=useState("/");
  let inputRef = useRef(null);
  const imageGenerator = async ()=>{
    if(inputRef.current.value===""){
      return 0;
    }
    const response = await fetch()
  }
  return (
    <div className='flex flex-col items-center mt-20 mb-5 gap-8'>
      <div
      className='text-3xl font-semibold  '
      >AI Image <span
      className='text-[#DE1B89] font-semibold
      '
      >Generator</span></div>
      <div className='flex flex-col'>
        <div>
          <img 
          className='h-52'
          src={
            imageUrl==="/"?
            punk:
            imageUrl
          } alt="something" />
        </div>
      </div>
      <div 
      className='
      border-slate-800
      flex flex-wrap justify-around rounded-3xl items-center
      h-16 w-8/12  bg-slate-800'>
        <input 
        ref={inputRef}
        className='
        bg-transparent
        text-lg
        text-white
        h-12
        border-0
        w-6/12
        focus:outline-none
        border-none'
        placeholder='Describe What You Want to See'
        type="text"
        />
        <button
        className='flex items-center justify-around
        w-40 h-12 border rounded-3xl
        bg-[#DE1B89] text-xl
        cursor-pointer'
        >Generate</button>
      </div>
    </div>

  )
}

export default ImageGenerator

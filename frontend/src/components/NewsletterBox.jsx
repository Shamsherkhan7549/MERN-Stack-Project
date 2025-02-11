import React, { useState } from 'react'

const NewsletterBox = () => {
  let [fillInput, setInput] = useState();
  let [isError,setError] = useState(false);

  let submitHandler = (e) => {
    e.preventDefault();
    fillInput ? setError(false) : setError(true)
  }

  return (
    <div className='flex flex-col gap-5 items-center'>
        <p className='text-2xl font-semibold'>Subscribe now & get 20% off</p>
        <p className='text-gray-500 text-center'>
        "Subscribe now to stay updated on our latest products, exclusive offers, and more!"
        </p>

        <form onSubmit={submitHandler} className='w-3/4 sm:w-2/4 flex flex-col sm:flex-row items-center justify-center  sm:border-2 border-gray rounded-lg sm:h-16 h-29'>
            <input onChange={e=>setInput(e.target.value)} type="email" placeholder='Enter your email' className=' w-full h-full pl-4 text-xl outline-none border-2 border-gray-500 min-h-12 rounded  sm:border-none '/>
           {isError && <p className='  sm:hidden w-full leading-loose text-left  text-lg  text-red-700 font-semibold'>*Please Enter a valid email!</p>}

            <button type='submit' className=' w-4/4 sm:w-2/4 h-full bg-black font-semibold text-white outline-none border-none rounded p-2 sm:rounded-r-lg text-center my-4 sm:my-0'><a href="mailto:shamsherkhan7549@gmail.com?subject=Contact%20from%20Website" className='w-full block'>Email</a></button>
        </form>
        {isError && <p className=' hidden sm:block w-2/4  text-xl py-1 text-red-700 font-semibold'>*Please Enter a valid email!</p>}

    </div>
  )
}

export default NewsletterBox
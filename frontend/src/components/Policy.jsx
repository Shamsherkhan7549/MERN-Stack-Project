import React from 'react'


const Policy = ({img,text1, text2}) => {
  return (
    <div className='flex flex-col text-center items-center my-10  '>
        <img src={img} alt="logo-icon" className='w-12 m-auto mb-5' />
        <p className='font-semibold'>{text1}</p>
        <p className='text-gray-500'>{text2}</p>
    </div>
  )
}

export default Policy
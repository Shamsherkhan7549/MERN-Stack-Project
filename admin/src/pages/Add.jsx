import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({token}) => {

  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [name,setName] = useState("");
  const[description, setDescription] = useState("");
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false)
  const [sizes, setSizes] = useState([])

  const submitHandler = async(event) => {
    event.preventDefault();
    try{
      
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description",description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("bestseller", bestseller);
    formData.append("sizes", JSON.stringify(sizes));

    image1 && formData.append("image1", image1);
    image2 && formData.append("image2", image2);
    image3 && formData.append("image3", image3);
    image4 && formData.append("image4", image4);
    const response = await axios.post(backendUrl+'/product/add',formData, {headers:{token}})
      
    if(response.data.succes){
      toast.success(response.data.message);
      setName("")
      setDescription("")
      setPrice('')
      setSizes([])
      setImage1(false)
      setImage2(false)
      setImage3(false)
      setImage4(false)

    }else{
      toast.error(response.data.message)
    }
    }catch(err){
      console.log(err)
      toast.error(err.message)

    }
  }
  return (
    <form action="" onSubmit={submitHandler}>
      <div className='flex flex-col w-full items-start gap-3'>
        <p className='mb-3w'>Upload Image</p>

        <div className='flex gap-3 '>
          <label htmlFor="image1">
          <img className='w-20 h-20 rounded' src={!image1?assets.upload_area : URL.createObjectURL(image1)}/>
            <input onChange={(e)=>setImage1(e.target.files[0])} type="file"  id="image1" hidden/>
          </label>
      
          <label htmlFor="image2">
          <img className='w-20 h-20 rounded'  src={!image2?assets.upload_area : URL.createObjectURL(image2)}/>
            <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id='image2'hidden/>
          </label>
        
          <label htmlFor="image3">
          <img className='w-20 h-20 rounded'  src={!image3?assets.upload_area : URL.createObjectURL(image3)}/>
            <input onChange={(e)=>setImage3(e.target.files[0])} type="file"  id='image3'hidden/>
          </label>

          <label htmlFor="image4">
          <img className='w-20 h-20 rounded'  src={!image4?assets.upload_area : URL.createObjectURL(image4)}/>
            <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id='image4' hidden />
          </label>
          </div>
      </div>

      <div className='w-full'>
        <p className='my-2'>Product Name</p>
        <input onChange={(e)=>setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type Here Product Name.' required/>
      </div>

      <div className='w-full'>
        <p className='my-2'>Description</p>
        <textarea onChange={(e)=>setDescription(e.target.value)} value={description}  className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write Content Here' required/>
      </div>

      <div className='flex flex-col sm:align-items-center sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='my-3'>Product Category</p>
          <select onChange={(e)=>setCategory(e.target.value)} value={category}  className='w-full px-3 py-2 '>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className='my-3'>Product Sub Category</p>
          <select  onChange={(e)=>setSubCategory(e.target.value)} value={subCategory}  className='w-full px-3 py-2 '>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className='my-2'>Product Price</p>
          <input  onChange={(e)=>setPrice(e.target.value)} value={price}  className='w-full px-3 py-2 sm:w-[120px]' type="number" placeholder='₹100' />
        </div>
      </div>

      <div className='my-2'>
          <p>Product Sizes</p> 

          <div className=' flex gap-3'>
          <div onClick={()=>setSizes(prevData=>prevData.includes("S")? prevData.filter(item=>item !=="S"): [...prevData, "S"])} className={` ${sizes.includes("S")? "bg-pink-200":"bg-slate-200"} px-3 py-1 bg-slate-200 border border-gray-500 rounded-sm cursor-pointer mt-3`}>
            <p>S</p>
          </div>

          <div  onClick={()=>setSizes(prevData=>prevData.includes("M")? prevData.filter(item=>item !=="M"): [...prevData, "M"])} className={`${sizes.includes("M") ? "bg-pink-200":"bg-slate-200"} px-3 py-1 bg-slate-200 border border-gray-500 rounded-sm cursor-pointer mt-3`}>
            <p>M</p>
          </div>

          <div  onClick={()=>setSizes(prevData=>prevData.includes("L")? prevData.filter(item=>item !=="L"): [...prevData, "L"])} className={` ${sizes.includes("L")? "bg-pink-200":"bg-slate-200"} px-3 py-1 bg-slate-200 border border-gray-500 rounded-sm cursor-pointer mt-3`}>
            <p>L</p>
          </div>

          <div  onClick={()=>setSizes(prevData=>prevData.includes("XL")? prevData.filter(item=>item !=="XL"): [...prevData, "XL"])} className={` ${sizes.includes("XL")? "bg-pink-200":"bg-slate-200"} px-3 py-1 bg-slate-200 border border-gray-500 rounded-sm cursor-pointer mt-3`}>
            <p>XL</p>
          </div>

          <div  onClick={()=>setSizes(prevData=>prevData.includes("XXL")? prevData.filter(item=>item !=="XXL"): [...prevData, "XXL"])} className={`${sizes.includes("XXL")? "bg-pink-200":"bg-slate-200"} px-3 py-1 bg-slate-200 border border-gray-500 rounded-sm cursor-pointer mt-3`}>
            <p>XXL</p>
          </div>
          </div>
        </div>

        <div className='flex gap-2 my-2'>
          <input onChange={()=>setBestseller(prev=> !prev)} checked={bestseller} type="checkbox" id='bestseller' />
          <label className='cursor-pointer ' htmlFor="bestseller">Add To Bestseller</label>
        </div>

        <button className='bg-black px-3 py-2 w-28 text-white rounded-sm' type='submit'>Add</button>
    </form>
  )
}

export default Add
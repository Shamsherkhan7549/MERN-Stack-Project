import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'


const Collection = () => {
    let {products} = useContext(ShopContext)
    let {search} = useContext(ShopContext);
    // left side
    let [filter, setFilter] = useState(false)
    let [categories, setCateories] = useState([])
    let [subCategories, setSubCategories] = useState([])
    let [filterProduct, setFilterProduct] = useState([]);
    let [sortType, setSortType] = useState("");
    
    
    // left side
    let showFilter = () => {   
      filter ? setFilter(false):setFilter(true)
    }


    let toggleCatogry = (event) => {
      if(categories.includes(event.target.value)){
        setCateories(prev => prev.filter(item => item !== event.target.value))
      }else{
        setCateories(prev => [...prev, event.target.value])
      }
    }

    

    let toggleSubCategory = (event) => {
      if(subCategories.includes(event.target.value)){
        setSubCategories(prev => prev.filter(item => item !== event.target.value))
      }else{
        setSubCategories(prev => [...prev, event.target.value])
      }
    }
 

    let applyFilter = () => {
      let productCopy = products.slice();
      if(search){
        productCopy =  productCopy.filter(item=> item.name.toLowerCase().includes(search.toLowerCase()))
      }
      
      if(categories.length>0){
        productCopy = productCopy.filter(item =>(categories.includes(item.category[0])))

      } 

      if(subCategories.length>0){
        productCopy = productCopy.filter(item =>(subCategories.includes(item.subCategory[0])))

      } 
      setFilterProduct(productCopy)
    }

    let sortProduct = () => {
      let fpCopy = filterProduct.slice();

      switch(sortType){
        case 'low-high':
          setFilterProduct(fpCopy.sort((a,b) => a.price-b.price))
        break;

        case 'high-low':
          setFilterProduct(fpCopy.sort((a,b)=> b.price-a.price))
        break;

        default:
          applyFilter();
        break;  

      }
    }



    useEffect(()=>{
      applyFilter();
    },[categories,subCategories,search,products])

    useEffect(()=>{
      sortProduct();
    },[sortType])


  return (
    <div className='flex sm:gap-5 flex-col sm:flex-row'>
      <div className='flex flex-col gap-5 sm:pt-24'>

        <h1 className='sm:text-xl cursor-pointer sm:cursor-auto flex gap-1 items-center' onClick={showFilter}>FILTERS <img className={`w-2 h-[10px] block sm:hidden ${filter ? 'rotate-90' : "none"}`} src={assets.dropdown_icon} alt="" /> </h1>

        <div className={` sm:block ${filter ? 'block' : 'hidden'}`}>

          <div className='flex flex-col gap-1 sm:gap-3 border border-gray-300 pl-5 py-4 my-7 sm:min-w-60'>
            <h2 className='font-semibold text-sm text-normal '>CATEGORIES</h2>
          
            <div className='flex flex-col gap-3 text-gray-700 font-light text-sm'>
              <p className='flex gap-2'>
                <input type="checkbox" onChange={toggleCatogry}  value={'Men'} className='w-3' />Men
              </p>

              <p className='flex gap-2'>
                <input type="checkbox"  onChange={toggleCatogry} value={'Women'} className='w-3'/>Women
              </p>

              <p className='flex gap-2'>
                <input type="checkbox"  onChange={toggleCatogry} value={'Kids'} className='w-3'/>Kids
              </p>
            </div>
          </div>


          <div className='flex flex-col gap-1 sm:gap-3 border border-gray-300 pl-5 py-4 my-7 min-w-60'>
            <h2 className='font-semibold text-sm text-normal '>TYPE</h2>

            <div className='flex flex-col gap-3 text-gray-700 font-light text-sm'>
              <p className='flex gap-2'>
                <input type="checkbox"  value={'Topwear'} className='w-3' onChange={toggleSubCategory}/>TopWear
              </p>

              <p className='flex gap-2'>
              <input type="checkbox"  value={'Bottomwear'} className='w-3' onChange={toggleSubCategory} />Bottomwear
              </p>

              <p className='flex gap-2'>
                <input type="checkbox"  value={'Winterwear'} className='w-3' onChange={toggleSubCategory} />Winterwear
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Right side */}

      <div className='sm:my-10 '>
        <div className="text-start pt-3 sm:py-5 sm:text-xl sm:text-3xl flex flex-col justfy-start items-start lg:flex-row  gap-5 lg:justify-between lg:items-center ">
         <Title text1={ "ALL" } text2={"COLLECTIONS"}/>
         
         <select onChange={e=> setSortType(e.target.value)} className='border border-gray-400 text-sm py-2 sm:py-4 sm:pl-1' >
            <option value="relavent"> Sort by: Relavent</option>
            <option value="low-high"> Sort by: Low to High</option>
            <option value="high-low"> Sort by: High to Low</option>
          </select>

        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {
           filterProduct.map((item, index) => (
             <ProductItem key={index} id={item._id} images={item.images} name={item.name} price={item.price}/>
            ))
          }
        </div>
      </div>
  </div>
  )
}

export default Collection
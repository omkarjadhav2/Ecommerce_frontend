import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products , search , showSearch } = useContext(ShopContext);
  const [showFilter, setShowfilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subcategory , setSubcategory] = useState([]);
  const [sortType , setSortType] = useState('relavent')

  const toggleCategory = (e) =>{
    if(category.includes(e.target.value)){
      setCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else{
      setCategory(prev=> [...prev,e.target.value])
    }
  }

  const toggleSubCategory = (e) =>{
    if(subcategory.includes(e.target.value)){
      setSubcategory(prev => prev.filter(item => item !== e.target.value))
    }
    else{
      setSubcategory(prev=> [...prev,e.target.value])
    }
  }

  const applyFilter = () =>{
    let productCopy = products.slice();

    if(showSearch && search){
      productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if(category.length > 0){
      productCopy = productCopy.filter(item => category.includes(item.category));
    }if(subcategory.length > 0){
      productCopy = productCopy.filter(item => subcategory.includes(item.subCategory))
    }
    setFilterProducts(productCopy)
  }

  const sortProduct = () =>{
    let fpCopy = filterProducts.slice();

    switch(sortType){
      case 'low-high':
        setFilterProducts(fpCopy.sort((a,b) =>(a.newprice - b.newprice)));
        break;
        case 'high-low':
          setFilterProducts(fpCopy.sort((a,b) =>(b.newprice - a.newprice)));
          break;
          default:
            applyFilter();
            break;

    }
  }

  useEffect(()=>{
    applyFilter();
  },[category , subcategory , search ,showSearch])

  useEffect(()=>{
    sortProduct();

  },[sortType])

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      <div className="min-w-60">
        <p
          onClick={() => setShowfilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
        </p>
        <img
          className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
          src={assets.dropdown_icon}
          alt="dropdown_icon"
        />
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Men"} onChange={toggleCategory}/>
              Men
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Women"}onChange={toggleCategory} />
              Women
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Kids"} onChange={toggleCategory}/>
              Kids
            </p>
          </div>
        </div>
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Sport"} onChange={toggleSubCategory} />
              Sport
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Formal"}onChange={toggleSubCategory} />
              Formal
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Sneaker"}onChange={toggleSubCategory} />
              Sneaker
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"}></Title>
          <select onChange={(e)=> setSortType(e.target.value)} className="border border-gray-300 text-sm px-2">
            <option value="relavent">sort by: Relavant</option>
            <option value="low-high">sort by: Low to High</option>
            <option value="high-low">sort by: High to Low</option>
          </select>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              image={item.image}
              name={item.name}
              price={item.newprice}
              id={item._id}
            ></ProductItem>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;

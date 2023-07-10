import React from "react";

import {
  Hero,
  Loader,
  ProductCarousel,
  ShopByCategory,
} from "../components/index";
import { useEffect } from "react";
import { useState } from "react";
import { useProduct } from "../context";

export const Landing = () => {
  const { state } = useProduct();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if(state.categories.length === 0){
      setIsLoading(true);
      const loaderClosingId = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
  
      return () => clearTimeout(loaderClosingId);
    }    
  }, []);


  return (
    <div className="app-landing-header">
      {isLoading && <Loader/>}
      <Hero />
      <ProductCarousel />
      <ShopByCategory />
    </div>
  );
};

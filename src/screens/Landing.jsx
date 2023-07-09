import React from "react";

import { Hero, ProductCarousel, ShopByCategory } from "../components/index";

export const Landing = () => {
  return (
    <div className="app-landing-header">
      <Hero />
      <ProductCarousel />
      <ShopByCategory />
    </div>
  );
};

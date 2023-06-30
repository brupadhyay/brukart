import React from "react";

import { Hero, ProductCarousel, ShopByCategory } from "../components/index";

export const Landing = () => {
  const clickHandler = async () => {
    try {
      const creds = {
        email: "adarshbalika@gmail.com",
        password: "adarshbalika",
      };
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(creds),
      });

      const { encodedToken } = await response.json();

      localStorage.setItem("AuthToken", encodedToken);
      console.log(localStorage.getItem("AuthToken"));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="app-landing-header">
      <Hero />
      <ProductCarousel />
      <ShopByCategory />
      {/* <FeaturedGames /> */}
    </div>
  );
};

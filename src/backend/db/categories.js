import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "action",
    imageSrc:
      "https://res.cloudinary.com/dmlhtqirp/image/upload/v1686823149/BRUKart/action.jpg",
  },
  {
    _id: uuid(),
    categoryName: "adventure",
    imageSrc:
      "https://res.cloudinary.com/dmlhtqirp/image/upload/v1686415138/BRUKart/shadow-of-the-tomb-raider.jpg",
  },
  {
    _id: uuid(),
    categoryName: "arcade-and-puzzle",
    imageSrc:
      "https://res.cloudinary.com/dmlhtqirp/image/upload/v1686823196/BRUKart/arcade-and-puzzle.png",
  },
  {
    _id: uuid(),
    categoryName: "racing",
    imageSrc:
      "https://res.cloudinary.com/dmlhtqirp/image/upload/v1686823217/BRUKart/racing.jpg",
  },
  {
    _id: uuid(),
    categoryName: "simulation",
    imageSrc:
      "https://res.cloudinary.com/dmlhtqirp/image/upload/v1686823230/BRUKart/simulation.jpg",
  },
  {
    _id: uuid(),
    categoryName: "sports",
    imageSrc:
      "https://res.cloudinary.com/dmlhtqirp/image/upload/v1686823259/BRUKart/sports.jpg",
  },
];

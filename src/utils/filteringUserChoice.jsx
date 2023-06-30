const filteringUserChoice = (state) => {
  const {
    products,
    filters: { category, priceRange, rating, sortBy, searchValue },
  } = state;

  let filteredData = products;

  filteredData =
    category.length > 0
      ? filteredData.filter(({ categoryName }) =>
          category.some((c) => categoryName.includes(c))
        )
      : filteredData;

  filteredData = priceRange
    ? filteredData.filter(({ price, discount }) => {
      let discountedPrice = discount ? (
        price -
        Number.parseFloat(
          price * (discount / 100)
        )
      ).toFixed(2) : price;

      return Number(discountedPrice) <= priceRange;
    })
    : filteredData;

  filteredData = rating
    ? filteredData.filter((game) => game.rating >= Number(rating))
    : filteredData;

  filteredData = sortBy
    ? filteredData.sort((a, b) => {
        let discountedPriceOfA = a.discount ? (
          a.price -
          Number.parseFloat(
            a.price * (a.discount / 100)
          )
        ).toFixed(2) : a.price;
          
        let discountedPriceOfB = b.discount ? (
          b.price -
          Number.parseFloat(
            b.price * (b.discount / 100)
          )
        ).toFixed(2) : b.price;
        
        return sortBy === "low to high" ? discountedPriceOfA - discountedPriceOfB : discountedPriceOfB - discountedPriceOfA;
    })
    : filteredData;

  filteredData = searchValue
    ? filteredData.filter(({ title }) =>
        title.toLowerCase().includes(searchValue.toLowerCase())
      )
    : filteredData;

  return filteredData;
};

export { filteringUserChoice };

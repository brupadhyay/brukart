import { getSingleProductService } from "../../services/services";

const getSingleProductHandler = async (productID) => {
  try {
    const response = await getSingleProductService(productID);
    return response.data.product;
  } catch (error) {
    // toast.error(error.response.data.errors[0]);
    return {};
  }
};

export { getSingleProductHandler };
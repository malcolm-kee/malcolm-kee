let animatedProductId = '';

export const navigateProduct = (productId: string) => {
  animatedProductId = productId;
};

export const isProductNavigated = (productId: string) => productId === animatedProductId;

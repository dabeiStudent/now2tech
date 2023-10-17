export const formatPrice= (price)=> {
    const formatedPrice= new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
    return formatedPrice;
}
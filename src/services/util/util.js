const formatPrice = (x) => {
  if(x !== undefined){
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return x.toString().replace(regexp, ',');
  };
}
  
const imagePath = process.env.PUBLIC_URL + '/images/goods/';


export default {
    formatPrice, imagePath
  };
  
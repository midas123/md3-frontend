const formatPrice = (x) => {
  if(x !== undefined){
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return x.toString().replace(regexp, ',');
  };
}
  


export default {
    formatPrice
  };
  
import React from 'react';
import './App.css';

import ProductContainer from '../Product_Container/Product_Container.js';

class App extends React.Component {



render(){
  return (
    <div className="App">
      <ProductContainer />
    </div>
  );
  }
}

export default App;

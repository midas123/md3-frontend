import React from 'react';
import './App.css';

import ProductContainer from './component/Product_Container/Product_Container';

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

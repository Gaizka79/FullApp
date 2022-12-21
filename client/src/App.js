import React from 'react';

import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    console.log("en el useffect");
    axios.get("/users")
      .then((res)=> {
        console.log(res.data)
        setData(res.data[0].nombre);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("Final")
      })
  },[data]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {!data ? "Loading..." : data}
        </p>
        
      </header>
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';

function App() {
  React.useEffect(()=>{
		console.log('测试react中的this',this)
	},[])
  return (
    <div className="App">
      <h1>App</h1>
    </div>
  );
}

export default App;

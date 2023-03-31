import React from 'react';
import './App.css';
import AppList from './components/AppList';


function App(props) {
  console.log(props)
  return (
    <div className="App">
      <AppList engine={props.engine} />
    </div>
  );
}

export default App;

import './App.css';
import React from 'react'
import Router from "./Router"

function App() {
  return (
    <div className="App"
         style={{minHeight: "100vh",
                backgroundColor: '#e8e8e6',
                display: "flex",
                alignItems: "center",
                flexDirection: "column"}}
    >
        <Router />
    </div>
  );
}

export default App;
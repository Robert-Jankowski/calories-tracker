import './App.css';
import MainPage from "./UI/views/MainPage";
import LoginPage from "./UI/views/LoginPage";
import FindPage from "./UI/views/FindPage";
import StatisticsPage from "./UI/views/StatisticsPage";
import AccountPage from "./UI/views/AccountPage";
import React from 'react'

function App() {
  return (
    <div className="App">
      {/*<MainPage />*/}
      <LoginPage />
    </div>
  );
}

export default App;
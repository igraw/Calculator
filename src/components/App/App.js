import React from "react";
import { Routes, Route } from "react-router-dom"
import { Link } from "react-router-dom";
import BanksList from "../BankList/BankList";
import Calculator from "../Calculator/Calculator";

import "./App.css"


class App extends React.Component {

  render() {
    return (
      <>
        <div className="custom">
          <ul>
            <li>
              <Link to="/">Banks</Link>
            </li>
            <li>
              <Link to="/calc">Calculator</Link>
            </li>
          </ul>
          <Routes>
            <Route exact path="/" element={<BanksList />} />
            <Route exact path="/calc" element={<Calculator />} />
          </Routes>
        </div>
      </>
    )
  }
}

export default App;

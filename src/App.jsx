import React from "react";
import CalculatorPages from "./components/CalculatorPages/CalculatorPages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lumpsum from "./components/CalculatorLayout/Lumpsum";
import Breadcrumb from "./components/BreadCrumb/BreadCrumb";
import Regularincome from "./components/CalculatorLayout/Regularincome";
import Sipreturn from "./components/CalculatorLayout/Sipreturn";
import Emi from "./components/CalculatorLayout/Emi";
import GoalPlanning from "./components/CalculatorLayout/GoalPlanning";
import RetirementFund from "./components/CalculatorLayout/RetirementFund";
import Education from "./components/CalculatorLayout/Education";
import Revenue from "./components/CalculatorLayout/Revenue";
import CompundInterest from "./components/CalculatorLayout/CompundInterest";
import Inflation from "./components/CalculatorLayout/Inflation";
import Nps from "./components/CalculatorLayout/Nps";
import Swapp from "./components/CalculatorLayout/Swapp";

const App = () => {
  return (
    <BrowserRouter>
      <div className="container-fluid min-vh-100">
        <div className="row min-vh-100">
          <div className="col-2 bg-light">
            Left Menu
          </div>

          <div className="col-10 bg-white">
            <div className="p-4 container-fluid ">
              <Breadcrumb/>
              <Routes>
                  <Route path="/" element={<CalculatorPages />} />
                  <Route path="/Lumpsum" element={<Lumpsum/>}></Route>
                  <Route path="/regular-income" element={<Regularincome/>}></Route>
                  <Route path="/sip" element={<Sipreturn/>}></Route>
                  <Route path="/swp" element={<Swapp/>}></Route>
                  <Route path="/emi" element={<Emi/>}></Route>
                  <Route path="/goal" element={<GoalPlanning/>}></Route>
                  <Route path="/retirement" element={<RetirementFund/>}/>
                  <Route path="/education" element={<Education/>}></Route>
                  <Route path="/revenue" element={<Revenue/>}></Route>
                  <Route path="/compound" element={<CompundInterest/>}></Route>
                  <Route path="/inflation" element={<Inflation/>}></Route>
                  <Route path="/nps" element={<Nps/>}></Route>
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;

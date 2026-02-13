import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import "bootstrap/dist/css/bootstrap.min.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const Inflation = () => {
  const [loan, setLoan] = useState(25000);
  const [years, setYears] = useState(3);
  const [rate, setRate] = useState(8);

  const futureCost = loan * Math.pow(1 + rate / 100, years);

  return (
    <div className="container mt-4">
      <div className="row g-4">
        {/* LEFT SIDE */}
        <div className="col-md-5">
          <div className="mb-3">
            <label>Current Cost: ₹{loan}</label>
            <input
              type="range"
              min="10000"
              max="1000000"
              value={loan}
              onChange={(e) => setLoan(+e.target.value)}
              className="form-range"
            />
          </div>

          <div className="mb-3">
            <label>Investment Period: {years} Years</label>
            <input
              type="range"
              min="1"
              max="30"
              value={years}
              onChange={(e) => setYears(+e.target.value)}
              className="form-range"
            />
          </div>

          <div className="mb-3">
            <label>Inflation Rate: {rate}%</label>
            <input
              type="range"
              min="1"
              max="20"
              value={rate}
              onChange={(e) => setRate(+e.target.value)}
              className="form-range"
            />
          </div>

          <small className="text-muted">
            The calculators provided are for illustration purposes only and do not represent actual returns. Mutual fund investments are subject to market risks. Please read all scheme-related documents carefully before investing.
          </small>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-md-7">
          <div className="card p-3 shadow-sm text-center">
            <h5>Future Cost</h5>
            <h5 className="mt-3">₹{Math.round(futureCost)}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inflation;

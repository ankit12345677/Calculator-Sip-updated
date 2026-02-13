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

const CompoundInterest = () => {
  const [loan, setLoan] = useState(25000);
  const [years, setYears] = useState(3);
  const [rate, setRate] = useState(8);

  // ✅ Compound Interest Formula
  const maturityAmount = loan * Math.pow(1 + rate / 100, years);
  const gains = maturityAmount - loan;

  const data = {
    labels: ["Amount Invested", "Gains"],
    datasets: [
      {
        data: [loan, gains],
        backgroundColor: ["#6ea8fe", "#b197fc"],
        borderWidth: 2,
        cutout: "70%",
      },
    ],
  };

  return (
    <div className="container mt-4">
      <div className="row g-4">
        {/* LEFT SIDE */}
        <div className="col-md-5">
          <div className="mb-3">
            <label>Principal Amount: ₹{loan}</label>
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
            <label>Interest Rate: {rate}%</label>
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
            The calculators provided are for illustration purposes only and do not represent actual returns.
          </small>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-md-7">
          <div className="card p-3 shadow-sm text-center">
            <div style={{ width: "300px", margin: "0 auto" }}>
              <Doughnut data={data} />
            </div>

            <h5 className="mt-3">₹{Math.round(maturityAmount)}</h5>

            <div className="row mt-3">
              <div className="col-6 col-md-4">
                <small>Amount Invested:</small>
                <p>₹{Math.round(loan)}</p>
              </div>
              <div className="col-6 col-md-4">
                <small>Maturity Amount</small>
                <p>₹{Math.round(maturityAmount)}</p>
              </div>
              <div className="col-6 col-md-4">
                <small>Gains</small>
                <p>₹{Math.round(gains)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompoundInterest;

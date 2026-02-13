import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import "bootstrap/dist/css/bootstrap.min.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Regularincome = () => {
  const [sip, setSip] = useState(25000);
  const [lumpsum, setLumpsum] = useState(250000);
  const [years, setYears] = useState(3);
  const [rate, setRate] = useState(8);
  const [waitYears, setWaitYears] = useState(3);
  const [withdrawYears, setWithdrawYears] = useState(3);
  const [withdrawRate, setWithdrawRate] = useState(8);

  const totalInvested = sip * 12 * years + lumpsum;

  // simple growth formula
  const futureValue =
    (lumpsum + sip * 12 * years) * Math.pow(1 + rate / 100, waitYears);

  const monthlyWithdrawal = Math.round(futureValue / (withdrawYears * 12));

  const yearlyBars = Array.from({ length: 5 }, (_, i) =>
    Math.round(futureValue / (i + 2))
  );

  const data = {
    labels: ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5"],
    datasets: [
      {
        label: "Portfolio Value",
        data: yearlyBars,
        backgroundColor: "#3b5bff",
        borderRadius: 8,
      },
    ],
  };

  return (
    <div className="container mt-4">
      <div className="row g-4">
        {/* LEFT PANEL */}
        <div className="col-md-5">
          <div className="mb-3">
            <label>SIP: ₹ {sip}</label>
            <input
              type="range"
              min="1000"
              max="100000"
              value={sip}
              onChange={(e) => setSip(+e.target.value)}
              className="form-range"
            />
          </div>

          <div className="mb-3">
            <label>Lumpsum: ₹ {lumpsum}</label>
            <input
              type="range"
              min="10000"
              max="1000000"
              value={lumpsum}
              onChange={(e) => setLumpsum(+e.target.value)}
              className="form-range"
            />
          </div>

          <div className="mb-3">
            <label>Investment Period: {years} Years</label>
            <input
              type="range"
              min="1"
              max="20"
              value={years}
              onChange={(e) => setYears(+e.target.value)}
              className="form-range"
            />
          </div>

          <div className="mb-3">
            <label>Expected Annual Returns: {rate}%</label>
            <input
              type="range"
              min="1"
              max="20"
              value={rate}
              onChange={(e) => setRate(+e.target.value)}
              className="form-range"
            />
          </div>

          <div className="mb-3">
            <label>Waiting Period before withdrawal: {waitYears} Years</label>
            <input
              type="range"
              min="1"
              max="10"
              value={waitYears}
              onChange={(e) => setWaitYears(+e.target.value)}
              className="form-range"
            />
          </div>

          <div className="mb-3">
            <label>How long you want to withdraw: {withdrawYears} Years</label>
            <input
              type="range"
              min="1"
              max="20"
              value={withdrawYears}
              onChange={(e) => setWithdrawYears(+e.target.value)}
              className="form-range"
            />
          </div>

          <div className="mb-3">
            <label>
              Expected Returns in withdrawal period: {withdrawRate}%
            </label>
            <input
              type="range"
              min="1"
              max="20"
              value={withdrawRate}
              onChange={(e) => setWithdrawRate(+e.target.value)}
              className="form-range"
            />
          </div>

          <small className="text-muted">
            Mutual fund investments are subject to market risks.
          </small>
        </div>

        {/* RIGHT PANEL */}
        <div className="col-md-7">
          <div className="card p-3 shadow-sm">
            <Bar data={data} />

            <div className="mt-3 text-center">
              <p>
                Portfolio Value at withdrawal start:
                <b> ₹{Math.round(futureValue)}</b>
              </p>
              <p>
                Monthly Withdrawal:
                <b> ₹{monthlyWithdrawal}</b>
              </p>
              <p className="text-success">
                How long you can keep withdrawing: <b>For Life</b>
              </p>
              <p className="text-muted">
                With a total investment of ₹{totalInvested}, you can withdraw
                ₹{monthlyWithdrawal} per month.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Regularincome;

import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./CalculatorPages.css";
import Lumpsum from "../../Assets/Calculator-img/Lumpsum.png";
import RegularIncome from "../../Assets/Calculator-img/RegularIncome.png";
import SIP from "../../Assets/Calculator-img/SIPReturns.png";
import SWP from "../../Assets/Calculator-img/SWP.png";
import EMI from "../../Assets/Calculator-img/EMI.png";
import Goal from "../../Assets/Calculator-img/GoalPlanning.png";
import Retirement from "../../Assets/Calculator-img/RetirementFund.png";
import Education from "../../Assets/Calculator-img/Education.png";
import Revenue from "../../Assets/Calculator-img/Revenue.png";
import Compound from "../../Assets/Calculator-img/CompoundInterest.png";
import Inflation from "../../Assets/Calculator-img/Inflation.png";
import NPS from "../../Assets/Calculator-img/NPS.png";

const cardsData = [
  { title: "Lumpsum", img: Lumpsum, text: "Invest & Grow your money", path: "/lumpsum" },
  { title: "Regular Income", img: RegularIncome, text: "Plan your income with our simple SIP + Lumpsum + SWP Calculator", path: "/regular-income" },
  { title: "SIP Returns", img: SIP, text: "Understand how your SIP will generate wealth for you", path: "/sip" },
  { title: "SWP", img: SWP, text: "Plan your retirement with systematic withdrawal plan", path: "/swp" },
  { title: "EMI", img: EMI, text: "Calculate your loan payments easily", path: "/emi" },
  { title: "Goal Planning", img: Goal, text: "Calculate investment amount to reach financial goals", path: "/goal" },
  { title: "Retirement Fund", img: Retirement, text: "Calculate investment to achieve retirement life", path: "/retirement" },
  { title: "Education", img: Education, text: "Plan your child’s higher education by investing today", path: "/education" },
  { title: "Revenue", img: Revenue, text: "Calculate your income and expenses for your business", path: "/revenue" },
  { title: "Compound Interest", img: Compound, text: "Calculate compound interest with ease", path: "/compound" },
  { title: "Inflation", img: Inflation, text: "Calculate the impact of inflation on your finances", path: "/inflation" },
  { title: "NPS", img: NPS, text: "Calculate returns for your National Pension Scheme", path: "/nps" }
];


const CalculatorPages = () => {
  const location = useLocation();

  return (
    <div className="row g-3">
      {cardsData.map((card, index) => {
        const isActive = location.pathname === card.path;

        return (
          <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <Link to={card.path} style={{ textDecoration: "none" }}>
              <div
                className="card text-start p-3 position-relative h-100"
                style={{ 
                  borderRadius: "20px",
                  minHeight: "140px",
                  maxHeight: "160px",
                  transition: "all 0.3s ease"
                }}
              >
                {/* Badge */}
                {isActive && (
                  <span className="badge bg-success position-absolute top-0 end-0 m-2">
                    Active
                  </span>
                )}

                {/* Icon */}
                <img 
                  src={card.img} 
                  alt={card.title}
                  style={{
                    width: "40px",
                    height: "40px",
                    objectFit: "contain"
                  }}
                />

                {/* Title */}
                <h5 className="mt-2 fw-bold" style={{ fontSize: "calc(0.9rem + 0.2vw)" }}>{card.title}</h5>

                {/* Text */}
                <p className="text-muted mb-0" style={{ fontSize: "calc(0.7rem + 0.2vw)" }}>{card.text}</p>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default CalculatorPages;
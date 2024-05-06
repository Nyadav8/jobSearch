import { useState } from "react";
export default function Card({ data }) {
  let [showbtn, setshowbtn] = useState(true);
  return (
    <div className="card">
      <div>
        <span className="cylinderbox">⏳ Posted 10 days ago</span>
      </div>
      <div className="flex-row intro">
        <img className="logosize" src={data.logoUrl} alt="" />
        <div className="flex-column" style={{ marginLeft: "0.2rem" }}>
          <span className="company">{data.companyName}</span>
          <span className="position">{data.jobRole}</span>
          <span className="location">{data.location}</span>
        </div>
      </div>
      <div className="m-1">
        <span className="salary">
          Estimated Salary: {data.salaryCurrencyCode + " "}
          {data.minJdSalary == null ? "" : data.minJdSalary + " - "}
          {data.maxJdSalary}LPA ✅{" "}
        </span>
      </div>
      <div className="mt-2">
        <span className="about">About Company</span>
        <div style={{ position: "relative" }}>
          {showbtn && (
            <span className="para">
              {data.jobDetailsFromCompany.substring(0, 400)}
            </span>
          )}
          {!showbtn && (
            <span className="para">{data.jobDetailsFromCompany}</span>
          )}
          {showbtn && data.jobDetailsFromCompany.length > 400 && (
            <span className="showMore">
              <span
                onClick={() => {
                  setshowbtn(false);
                }}
                className="newTag"
                style={{ cursor: "pointer" }}
              >
                View job
              </span>
            </span>
          )}
        </div>
        {!showbtn && (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <span
              onClick={() => {
                setshowbtn(true);
              }}
              className="newTag"
              style={{ cursor: "pointer" }}
            >
              View less
            </span>
          </span>
        )}
      </div>
      <div className="flex-column">
        <span className="minExperience">Minimum Experience</span>
        <span className="year">{data.minExp} years</span>
      </div>
      <div className="mt-2 flex-column">
        <button className="easyApply">⚡ Easy Apply</button>
        <button className="referral">Unlock referral asks</button>
      </div>
    </div>
  );
}

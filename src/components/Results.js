import { useState } from "react";
import { useLocation } from "react-router-dom";

const Results = () => {
  const { state } = useLocation();
  const postOffices = state.postOffices;
  const [filterValue, setFilterValue] = useState("");

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };

  const filteredPostOffices = postOffices.filter((postOffice) =>
    postOffice.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  return (
    <div>
      {postOffices.length > 0 ? (
        <div>
          <p className="pincode">Pincode: {postOffices[0].pincode}</p>
          {state.message && (
            <p className="message">
              Message:{" "}
              <span style={{ fontSize: "2.2rem", fontWeight: 200 }}>
                {state.message}
              </span>
            </p>
          )}
          <input
            className="searchfilter"
            type="text"
            placeholder="Filter"
            onChange={handleFilterChange}
          />
          <div className="results-container">
            {filteredPostOffices.length > 0 ? (
              filteredPostOffices.map((postOffice, index) => (
                <div
                  key={`${postOffice.pincode}-${index}`}
                  className="post-office-box"
                >
                  <div className="post-office-name">
                    Name: {postOffice.name}
                  </div>
                  <div className="post-office-branch-type">
                    Branch Type: {postOffice.branchType}
                  </div>
                  <div className="post-office-status">
                    Delivery Status: {postOffice.deliveryStatus}
                  </div>
                  <div className="post-office-district">
                    District: {postOffice.district}
                  </div>
                  <div className="post-office-division">
                    Division: {postOffice.division}
                  </div>
                </div>
              ))
            ) : (
              <p style={{ color: "red", fontSize: "2.2rem", fontWeight: 600 }}>
                No post office found
              </p>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Results;

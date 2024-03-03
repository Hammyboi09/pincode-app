import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PostApi = () => {
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlePincodeChange = (event) => {
    setPincode(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (pincode.length !== 6) {
      setError("Please enter a valid 6-digit pincode");
      return;
    }
    setLoading(true);
    setError("");
    fetch(`https://api.postalpincode.in/pincode/${pincode}`)
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error("Unable to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        if (data && data[0] && data[0].PostOffice) {
          const postOffices = data[0].PostOffice.map((office) => ({
            name: office.Name,
            pincode: office.Pincode,
            district: office.District,
            division: office.Division,
            deliveryStatus: office.DeliveryStatus,
            branchType: office.BranchType,
          }));
          setLoading(false);
          navigate("/results", {
            state: { postOffices, message: data[0].Message },
          });
        } else {
          setError("No post offices found");
          setLoading(false);
        }
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label className="enterpin">Enter a 6-digit pincode:</label>
        <input
          className="input"
          type="text"
          placeholder="Pincode"
          value={pincode}
          onChange={handlePincodeChange}
        />
        <button className="btn" type="submit">
          Lookup
        </button>
      </form>
      {loading && <p className="loading">Loading data...</p>}
      {error && <p className="loading">{error}</p>}
    </div>
  );
};

export default PostApi;

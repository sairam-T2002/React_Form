import React from "react";
import "../FormData.css";
import { useNavigate } from "react-router-dom";

function FormData({ userArrState, userUpdate }) {
  const navigate = useNavigate();
  const [userArr, setUserArr] = userArrState;
  const [, setUserUPST] = userUpdate;
  let avlb = false;
  if (userArr.length === 0) {
    avlb = false;
  } else {
    avlb = true;
  }
  function updateOnClick(userID) {
    const [userUP] = userArr.filter((el) => el.id === userID);
    const otherUsers = userArr.filter((el) => el.id !== userID);
    setUserArr([...otherUsers]);
    setUserUPST({ ...userUP });
    navigate("/");
  }
  function deleteOnClick(userID) {
    const [userTD] = userArr.filter((el) => el.id === userID);
    const otherUsers = userArr.filter((el) => el.id !== userID);
    setUserArr([...otherUsers]);
    console.log(userTD);
  }
  return (
    <>
      {avlb && (
        <div style={{ width: "100%" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Age</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Designation</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userArr.map((el) => (
                <tr key={el.id}>
                  <td>{el.firstName}</td>
                  <td>{el.lastName}</td>
                  <td>{el.age}</td>
                  <td>{el.email}</td>
                  <td>{el.gender}</td>
                  <td>{el.designation}</td>
                  <td>
                    <div className="actctn">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          updateOnClick(el.id);
                        }}
                        className="upbtn"
                      >
                        Update
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          deleteOnClick(el.id);
                        }}
                        className="debtn"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {!avlb && <p>No data available to display</p>}
    </>
  );
}

export default FormData;

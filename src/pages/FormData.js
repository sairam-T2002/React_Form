import React, { useState, useEffect, useRef } from "react";
import "../FormData.css";
import { useNavigate } from "react-router-dom";

function FormData({ userArrState, userUpdate }) {
  const navigate = useNavigate();
  const fnref = useRef();
  const agref = useRef();
  const deref = useRef();
  const [tempArr, setTempArr] = useState([]);
  const [userArr, setUserArr] = userArrState;
  const [, setUserUPST] = userUpdate;
  let avlb = userArr.length > 0;
  useEffect(() => {
    setTempArr([...userArr]);
  }, []);
  function removeDuplicateObjects(array, key) {
    const uniqueObjectMap = {};
    const uniqueArray = [];

    array.forEach((obj) => {
      const keyValue = obj[key];

      // key value to determine uniqueness
      if (!uniqueObjectMap[keyValue]) {
        uniqueObjectMap[keyValue] = true;
        uniqueArray.push(obj);
      }
    });

    return uniqueArray;
  }
  function updateOnClick(userID) {
    const [userUP] = userArr.filter((el) => el.id === userID);
    const otherUsers = userArr.filter((el) => el.id !== userID);
    setUserArr([...otherUsers]);
    setUserUPST({ ...userUP });
    navigate("/");
  }
  function deleteOnClick(userID) {
    const otherUsers = userArr.filter((el) => el.id !== userID);
    fnref.current.value = "";
    agref.current.value = "";
    deref.current.value = "";
    setUserArr([...otherUsers]);
    setTempArr([...otherUsers]);
  }
  function fnameChange(e) {
    const fvalue = e.target.value;
    const filtArr = userArr.filter((element) => {
      if (
        agref.current.value === "" &&
        deref.current.value === "" &&
        element.firstName.includes(fvalue)
      ) {
        return true;
      } else if (
        agref.current.value !== "" &&
        deref.current.value === "" &&
        element.firstName.includes(fvalue) &&
        element.age === agref.current.value
      ) {
        return true;
      } else if (
        agref.current.value === "" &&
        deref.current.value !== "" &&
        element.firstName.includes(fvalue) &&
        element.designation === deref.current.value
      ) {
        return true;
      } else if (
        agref.current.value !== "" &&
        deref.current.value !== "" &&
        element.firstName.includes(fvalue) &&
        element.designation === deref.current.value &&
        element.age === agref.current.value
      ) {
        return true;
      } else if (
        agref.current.value === "" &&
        deref.current.value === "" &&
        fnref.current.value === ""
      ) {
        return true;
      } else {
        return false;
      }
    });
    setTempArr([...removeDuplicateObjects([...filtArr], "id")]);
  }
  function ageChange(e) {
    const avalue = e.target.value;
    const filtArr = userArr.filter((element) => {
      if (
        fnref.current.value === "" &&
        deref.current.value === "" &&
        element.age === avalue
      ) {
        return true;
      } else if (
        fnref.current.value !== "" &&
        deref.current.value === "" &&
        element.firstName.includes(fnref.current.value) &&
        element.age === avalue
      ) {
        return true;
      } else if (
        fnref.current.value === "" &&
        deref.current.value !== "" &&
        element.designation === deref.current.value &&
        element.age === avalue
      ) {
        return true;
      } else if (
        fnref.current.value !== "" &&
        deref.current.value !== "" &&
        element.designation === deref.current.value &&
        element.firstName === fnref.current.value &&
        element.age === avalue
      ) {
        return true;
      } else if (
        agref.current.value === "" &&
        deref.current.value === "" &&
        fnref.current.value === ""
      ) {
        return true;
      } else {
        return false;
      }
    });
    setTempArr([...removeDuplicateObjects([...filtArr], "id")]);
  }
  function designationChange(e) {
    const dvalue = e.target.value;
    const filtArr = userArr.filter((element) => {
      if (
        fnref.current.value === "" &&
        agref.current.value === "" &&
        element.designation === dvalue
      ) {
        return true;
      } else if (
        fnref.current.value !== "" &&
        agref.current.value === "" &&
        element.firstName === fnref.current.value &&
        element.designation === dvalue
      ) {
        return true;
      } else if (
        fnref.current.value === "" &&
        agref.current.value !== "" &&
        element.age === agref.current.value &&
        element.designation === dvalue
      ) {
        return true;
      } else if (
        fnref.current.value !== "" &&
        agref.current.value !== "" &&
        element.age === agref.current.value &&
        element.firstName === fnref.current.value &&
        element.designation === dvalue
      ) {
        return true;
      } else if (
        agref.current.value === "" &&
        deref.current.value === "" &&
        fnref.current.value === ""
      ) {
        return true;
      } else {
        return false;
      }
    });
    setTempArr([...removeDuplicateObjects([...filtArr], "id")]);
  }
  return (
    <>
      {avlb && (
        <div style={{ width: "100%" }}>
          <div
            style={{ display: "flex", flexDirection: "row", marginTop: "10px" }}
          >
            <label className="flf">First Name</label>
            <input
              ref={fnref}
              className="fif"
              onChange={fnameChange}
              type="text"
            ></input>
            <label className="flf">Age</label>
            <input
              ref={agref}
              className="fif"
              onChange={ageChange}
              type="number"
            ></input>
            <label className="flf">Designation</label>
            <select ref={deref} className="fif" onChange={designationChange}>
              <option value="">Select Designation</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Manager">Manager</option>
            </select>
          </div>
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
              {tempArr
                .sort((a, b) => a.age - b.age)
                .map((el) => (
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

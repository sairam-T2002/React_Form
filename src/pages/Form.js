import React, { useRef, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useForm, Controller } from "react-hook-form";
import "../Form.css";

function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export default function Form({ userArrState, userUpdate }) {
  const [userArr, setUserArr] = userArrState;
  const [userUPST, setUserUPST] = userUpdate;
  const [render, setRender] = useState(false);
  const submitRef = useRef();
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: isObjectEmpty(userUPST) ? "" : userUPST.firstName,
      lastName: isObjectEmpty(userUPST) ? "" : userUPST.lastName,
      age: isObjectEmpty(userUPST) ? "" : userUPST.age,
      email: isObjectEmpty(userUPST) ? "" : userUPST.email,
      gender: isObjectEmpty(userUPST) ? "" : userUPST.gender,
      designation: isObjectEmpty(userUPST) ? "" : userUPST.designation,
    },
  });

  const onSubmit = (data) => {
    const newData = {
      id: uuidv4(),
      ...data,
    };
    setUserArr([...userArr, newData]);
    console.log(newData);
    if (isObjectEmpty(userUPST)) {
      submitRef.current.textContent = "Submit Successful";
    } else {
      submitRef.current.textContent = "Update Successful";
    }
    setUserUPST({});
    setRender(!render);
    reset();
  };

  useEffect(() => {
    setValue("gender", isObjectEmpty(userUPST) ? "" : userUPST.gender);
  }, [userUPST, setValue]);

  return (
    <form id="form1" onSubmit={handleSubmit(onSubmit)}>
      {/* First Name */}
      <label className="nFL">First Name</label>
      <input
        className="nF"
        maxLength="20"
        {...register("firstName", {
          required: true,
          pattern: /^[A-Za-z]+$/i,
        })}
      />
      {errors?.firstName?.type === "required" && <p>This field is required</p>}
      {errors?.firstName?.type === "pattern" && (
        <p>Alphabetical characters only</p>
      )}

      {/* Last Name */}
      <label className="nFL">Last Name</label>
      <input
        className="nF"
        maxLength="20"
        {...register("lastName", { required: true, pattern: /^[A-Za-z]+$/i })}
      />
      {errors?.lastName?.type === "required" && <p>This field is required</p>}
      {errors?.lastName?.type === "pattern" && (
        <p>Alphabetical characters only</p>
      )}

      {/* Age */}
      <label className="nFL">Age</label>
      <input
        className="nF"
        type="number"
        {...register("age", { required: true, min: 18, max: 99 })}
      />
      {errors?.age?.type === "required" && <p>This field is required</p>}
      {errors?.age?.type !== "required" && errors.age && (
        <p>You must be older than 18 and younger than 99 years old</p>
      )}

      {/* Email */}
      <label className="nFL">Email</label>
      <input
        maxLength="100"
        className="nF"
        type="email"
        {...register("email", {
          required: true,
          pattern:
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        })}
      />
      {errors?.email?.type === "required" && <p>This field is required</p>}
      {errors?.email?.type === "pattern" && <p>Invalid Email</p>}

      {/* Gender */}
      <label className="nFL">Gender</label>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "left",
        }}
      >
        <Controller
          render={({ field }) => (
            <>
              <input
                defaultChecked={
                  isObjectEmpty(userUPST) ? false : userUPST.gender === "Male"
                }
                type="radio"
                {...field}
                value="Male"
                id="male"
                name="gender"
              />
              <label
                style={{ color: "white", marginRight: "10px" }}
                htmlFor="male"
              >
                Male
              </label>

              <input
                defaultChecked={
                  isObjectEmpty(userUPST) ? false : userUPST.gender === "Female"
                }
                type="radio"
                {...field}
                value="Female"
                id="female"
                name="gender"
              />
              <label
                style={{ color: "white", marginRight: "10px" }}
                htmlFor="female"
              >
                Female
              </label>
            </>
          )}
          control={control}
          name="gender"
          rules={{ required: "This field is required" }}
        />
      </div>
      {errors?.gender?.type === "required" && <p>{errors.gender.message}</p>}

      {/* Designation */}
      <label className="nFL">Designation</label>
      <select className="nF" {...register("designation", { required: true })}>
        <option value="">Select Designation</option>
        <option value="Developer">Developer</option>
        <option value="Designer">Designer</option>
        <option value="Manager">Manager</option>
      </select>
      {errors?.designation?.type === "required" && (
        <p>This field is required</p>
      )}

      <input
        value={isObjectEmpty(userUPST) ? "SUBMIT" : "UPDATE"}
        type="submit"
      />
      <h5 style={{ color: "white" }} ref={submitRef}>
        ⠀
      </h5>
    </form>
  );
}

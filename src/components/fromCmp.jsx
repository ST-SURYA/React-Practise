import React, { useEffect, useState } from "react";
import { Field, Form, FormSpy } from "react-final-form";
import InputField from "./inputField";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import { states } from "../source";
import { Spinner } from "react-bootstrap";
import HOC from "./hoc";
const FormCmp = () => {
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const [cityVal, setCityVal] = useState(null);
  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];

  const handleSubmit = (e) => {
    console.log("record", e);
  };
  const handleValidation = (values) => {
    const errors = {};
    if (!values.FirstName) {
      errors.FirstName = "Invalid";
    }
    if (!values.LastName) {
      errors.LastName = "Invalid";
    }
    if (!values.email) {
      errors.email = "Invalid";
    }
    if (!values.phone || values.phone.length !== 10) {
      errors.phone = "Invalid";
    }
    if (!values.dob) {
      errors.dob = "Invalid";
    }
    if (!values.age) {
      errors.age = "Invalid";
    }
    if (!values.gender) {
      errors.gender = "Invalid";
    }
    if (!values.address) {
      errors.address = "Invalid";
    }
    if (!values.city) {
      errors.city = "Invalid";
    }
    if (!values.state) {
      errors.state = "Invalid";
    }
    if (!values.photo) {
      errors.photo = "Invalid";
    }
    return errors;
  };
  const loadCityOptions = (inputValue, callback) => {
    const filteredCities = cities.filter((city) =>
      city.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    setTimeout(() => {
      callback(filteredCities);
    }, 1000);
  };

  const loadStateOptions = (inputValue, callback) => {
    const filteredStates = states.filter((state) =>
      state.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    setTimeout(() => {
      callback(filteredStates);
    }, 1000);
  };
  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country: "INDIA",
        state: selectedState,
      }),
    })
      .then((response) => {
        setIsLoad(true);
        return response.json();
      })
      .then((data) => {
        const cityObj = data?.data.map((val) => {
          return { value: val, label: val };
        });
        setCities(() => [...cityObj]);
        setIsLoad(false);
        console.log(cityObj);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error);
      });
  }, [selectedState]);
  return (
    <>
      <Form
        onSubmit={handleSubmit}
        validate={handleValidation}
        render={({ handleSubmit }) => (
          <form className="container w-50" onSubmit={handleSubmit}>
            <div className="row mb-1">
              <div className="col-lg-6">
                <label className="form-label">First Name</label>
                <Field name="FirstName">
                  {({ input, meta }) => (
                    <>
                      <InputField {...input} />
                      {meta.error && meta.touched && (
                        <span className="text-danger">{meta.error}</span>
                      )}
                    </>
                  )}
                </Field>
              </div>
              <div className="col-lg-6">
                <label className="form-label">Last Name</label>
                <Field name="LastName">
                  {({ input, meta }) => (
                    <>
                      <InputField {...input} />
                      {meta.error && meta.touched && (
                        <span className="text-danger">{meta.error}</span>
                      )}
                    </>
                  )}
                </Field>
              </div>
            </div>
            {/* 2nd Row */}
            <div className="row mb-1">
              <div className="col-lg-6">
                <label className="form-label">Email</label>
                <Field name="email" type="email">
                  {({ input, meta }) => (
                    <>
                      <InputField {...input} />
                      {meta.error && meta.touched && (
                        <span className="text-danger">{meta.error}</span>
                      )}
                    </>
                  )}
                </Field>
              </div>
              <div className="col-lg-6">
                <label className="form-label">Phone</label>
                <Field name="phone">
                  {({ input, meta }) => (
                    <>
                      <InputField {...input} />
                      {meta.error && meta.touched && (
                        <span className="text-danger">{meta.error}</span>
                      )}
                    </>
                  )}
                </Field>
              </div>
            </div>
            {/*3rd Row */}
            <div className="row mb-1">
              <div className="col-lg-4">
                <label className="form-label">DOB</label>
                <Field name="dob" type="date">
                  {({ input, meta }) => (
                    <>
                      <InputField {...input} />
                      {meta.error && meta.touched && (
                        <span className="text-danger">{meta.error}</span>
                      )}
                    </>
                  )}
                </Field>
              </div>
              <div className="col-lg-2">
                <label className="form-label">Age</label>
                <Field name="age">
                  {({ input, meta }) => (
                    <>
                      <InputField {...input} />
                      {meta.error && meta.touched && (
                        <span className="text-danger">{meta.error}</span>
                      )}
                    </>
                  )}
                </Field>
              </div>
              <div className="col-lg-6">
                <label className="form-label">Gender</label>
                <br />
                <div className="d-flex">
                  {genderOptions.map((option) => (
                    <label className="form-check-label m-2">
                      <Field
                        name="gender"
                        component="input"
                        type="radio"
                        value={option.value}
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
                <Field name="gender">
                  {({ meta }) => (
                    <>
                      {meta.error && meta.touched && (
                        <span className="text-danger">{meta.error}</span>
                      )}
                    </>
                  )}
                </Field>
              </div>
            </div>
            {/* 4th Row */}
            <div className="row mb-1">
              <div className="col-lg-6">
                <label className="form-label">Address</label>

                <Field
                  component="textarea"
                  name="address"
                  className="form-control"
                  rows={4}
                />
                <Field name="address">
                  {({ meta }) => (
                    <>
                      {meta.error && meta.touched && (
                        <span className="text-danger">{meta.error}</span>
                      )}
                    </>
                  )}
                </Field>
              </div>
              <div className="col-lg-6">
                <label className="form-label">State</label>
                <Field name="state">
                  {({ input, meta }) => (
                    <>
                      <AsyncSelect
                        loadOptions={(inputValue, callback) =>
                          loadStateOptions(inputValue, callback)
                        }
                        defaultOptions
                        value={states.find(
                          (option) => option.value === input.value
                        )}
                        onChange={(selectedOption) => {
                          input.onChange(selectedOption.value);
                        }}
                        onInputChange={() => {
                          setSelectedState(input.value);
                          setIsLoad(true);
                          setCityVal(null);
                          console.log(input);
                        }}
                      />
                      {meta.error && meta.touched && (
                        <span className="text-danger">{meta.error}</span>
                      )}
                    </>
                  )}
                </Field>
                <br />
                <label className="form-label">City</label>
                <Field name="city">
                  {({ input, meta }) => (
                    <>
                      <AsyncSelect
                        id="city"
                        placeholder="Select the city"
                        loadOptions={(inputValue, callback) =>
                          loadCityOptions(inputValue, callback)
                        }
                        defaultOptions={cities}
                        value={cityVal}
                        onChange={(selectedOption) => {
                          input.onChange(selectedOption.value);
                          setCityVal(selectedOption);
                        }}
                        isDisabled={isLoad}
                        isLoading={isLoad}
                      />

                      {meta.error && meta.touched && (
                        <span className="text-danger">{meta.error}</span>
                      )}
                    </>
                  )}
                </Field>
              </div>
            </div>
            {/* 5th Row */}
            <div className="row mb-1">
              <div className="col-lg-6">
                <label className="form-label">Upload Photo</label>
                <div className="photo-upload-container">
                  <Field
                    name="photo"
                    component="input"
                    type="file"
                    className="form-control"
                    accept="image/*"

                    // onChange={(event) => {
                    //   const file = event.target.files[0];
                    //   if (file) {
                    //     const reader = new FileReader();
                    //     reader.onload = (e) => {
                    //       const previewImage =
                    //         document.getElementById("preview");
                    //       console.log(
                    //         Boolean(document.getElementById("preview").src)
                    //       );
                    //       if (previewImage) {
                    //         previewImage.src = e.target.result;
                    //       }
                    //     };
                    //     reader.readAsDataURL(file);
                    //   }
                    // }}
                  />

                  {/* <img
                    id="preview"
                    src=""
                    alt="Choose Your Photo"
                    className="preview-image"
                  /> */}
                  <Field name="photo">
                    {({ meta }) => (
                      <>
                        {meta.error && meta.touched && (
                          <span className="text-danger">{meta.error}</span>
                        )}
                      </>
                    )}
                  </Field>
                </div>
              </div>
            </div>

            {/* Submit button row */}
            <div className="d-flex justify-content-center m-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <FormSpy subscription={{ values: true }}>
              {({ values }) => (
                <pre>
                  <p>First Name: {values.FirstName}</p>
                  <p>Last Name: {values.LastName}</p>
                  <p>email: {values.email}</p>
                  <p>Phone: {values.phone}</p>
                  <p>Gender: {values.gender}</p>
                  <p>DOB: {values.dob}</p>
                  <p>Age: {values.age}</p>
                  <p>Address: {values.address}</p>
                  <p>City: {values.city}</p>
                  <p>State: {values.state}</p>
                  <p>Photo: {values.photo}</p>
                </pre>
              )}
            </FormSpy>
          </form>
        )}
      />
    </>
  );
};
export default HOC(FormCmp);

import React, { useState } from "react";
import { Field, Form, FormSpy } from "react-final-form";
import InputField from "./inputField";
import Select from "react-select";
import { cities, states } from "../source";
import HOC from "./hoc";
const WizardsForm = () => {
  const [step, setStep] = useState(1);
  const [stepValid, setStepValid] = useState(false);
  const [src, setSrc] = useState("");
  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];

  const handleSubmit = (e) => {
    console.log("record", e);
  };
  const handleValidation = (values) => {
    // Your step-wise validation logic here
    const errors = {};

    if (step === 1) {
      if (!values.FirstName) {
        errors.FirstName = "Invalid";
      }
      if (!values.LastName) {
        errors.LastName = "Invalid";
      }
    }

    if (step === 2) {
      if (!values.email) {
        errors.email = "Invalid";
      }
      if (!values.phone || values.phone.length !== 10) {
        errors.phone = "Invalid";
      }
    }

    if (step === 3) {
      if (!values.dob) {
        errors.dob = "Invalid";
      }
      if (!values.age) {
        errors.age = "Invalid";
      }
      if (!values.gender) {
        errors.gender = "Invalid";
      }
    }

    if (step === 4) {
      if (!values.address) {
        errors.address = "Invalid";
      }
      if (!values.city) {
        errors.city = "Invalid";
      }
      if (!values.state) {
        errors.state = "Invalid";
      }
    }

    if (step === 5) {
      if (!values.photo) {
        errors.photo = "Invalid";
      }
    }

    setStepValid(Object.keys(errors).length === 0); // Update step validation status
    return errors;
  };
  return (
    <>
      <Form
        onSubmit={handleSubmit}
        validate={handleValidation}
        render={({ handleSubmit, valid }) => (
          <form className="container w-50" onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="row mb-1">
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
            )}
            {/* 2nd Row */}
            {step === 2 && (
              <div className="row mb-1">
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
            )}
            {/*3rd Row */}
            {step === 3 && (
              <div className="row mb-1">
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
            )}
            {/* 4th Row */}
            {step === 4 && (
              <div className="row mb-1">
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

                <label className="form-label">City</label>
                <Field name="city">
                  {({ input, meta }) => (
                    <>
                      {/* <Select options={options} {...input} /> */}
                      <Select
                        options={cities}
                        value={cities.find(
                          (option) => option.value === input.value
                        )}
                        onChange={(selectedOption) =>
                          input.onChange(selectedOption.value)
                        }
                      />
                      {meta.error && meta.touched && (
                        <span className="text-danger">{meta.error}</span>
                      )}
                    </>
                  )}
                </Field>
                <br />
                <label className="form-label">State</label>
                <Field name="state">
                  {({ input, meta }) => (
                    <>
                      {/* <Select options={options} {...input} /> */}
                      <Select
                        options={states}
                        value={states.find(
                          (option) => option.value === input.value
                        )}
                        onChange={(selectedOption) =>
                          input.onChange(selectedOption.value)
                        }
                      />
                      {meta.error && meta.touched && (
                        <span className="text-danger">{meta.error}</span>
                      )}
                    </>
                  )}
                </Field>
              </div>
            )}
            {/* 5th Row */}
            {step === 5 && (
              <>
                <div className="row mb-1">
                  <label className="form-label">Upload Photo</label>
                  <div className="photo-upload-container">
                    <Field name="photo">
                      {({ input, meta }) => (
                        <>
                          <input
                            type="file"
                            className="form-control mb-3"
                            onChange={(event) => {
                              const file = event.target.files[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (e) => {
                                  setSrc(e.target.result);
                                };
                                reader.readAsDataURL(file);
                                input.onChange(file.name);
                              }
                            }}
                          />
                          {meta.error && meta.touched && (
                            <span className="text-danger">{meta.error}</span>
                          )}
                        </>
                      )}
                    </Field>
                    <img
                      id="preview"
                      src={src}
                      alt="Choose Your Photo"
                      className="preview-image m-auto"
                    />
                  </div>
                </div>
                {/* Submit button row */}
                <div className="d-flex justify-content-center m-3">
                  <button
                    type="submit"
                    className="btn btn-success"
                    disabled={!stepValid}
                  >
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
              </>
            )}
            <div>
              <button
                className="btn btn-primary m-1"
                disabled={step === 1}
                onClick={() => setStep(step - 1)}
              >
                Previous
              </button>
              <button
                className="btn btn-primary m-1"
                disabled={step === 5 || !stepValid}
                onClick={() => {
                  if (stepValid) {
                    setStep(step + 1);
                    setStepValid(false); // Reset step validation for next step
                  }
                }}
              >
                Next
              </button>
            </div>
          </form>
        )}
      />
    </>
  );
};
export default HOC(WizardsForm);

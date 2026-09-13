import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { authApi } from "../services/api";


export default function Register() {

  const navigate = useNavigate();


  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });


  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");


  function handleChange(event) {

    const {
      name,
      value
    } = event.target;


    setForm((current) => ({
      ...current,
      [name]: value
    }));
  }


  async function handleSubmit(event) {

    event.preventDefault();

    setError("");
    setSuccess("");


    /* Required fields */

    if (
      !form.firstName ||
      !form.email ||
      !form.password
    ) {

      setError(
        "Please complete all required fields."
      );

      return;
    }


    /* Email validation */

    if (!form.email.includes("@")) {

      setError(
        "Please enter a valid email address."
      );

      return;
    }


    /* Password validation */

    if (form.password.length < 8) {

      setError(
        "Password must be at least 8 characters."
      );

      return;
    }


    /* Confirm password */

    if (
      form.password !==
      form.confirmPassword
    ) {

      setError(
        "Passwords do not match."
      );

      return;
    }


    try {

      await authApi.register({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password
      });


      setSuccess(
        "Account created successfully."
      );


      setTimeout(() => {

        navigate("/login");

      }, 1000);


    } catch (error) {

      setError(error.message);

    }
  }


  return (

    <div className="auth-page">

      <section className="auth-card">

        <div className="auth-brand">

          <h1>
            Student Tracker
          </h1>

          <p>
            Create your student account
          </p>

        </div>


        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >


          <label>

            First Name

            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              required
            />

          </label>


          <label>

            Last Name

            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
            />

          </label>


          <label>

            Email

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />

          </label>


          <label>

            Password

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />

          </label>


          <label>

            Confirm Password

            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />

          </label>


          {error && (

            <p className="auth-message error">

              {error}

            </p>

          )}


          {success && (

            <p className="auth-message success">

              {success}

            </p>

          )}


          <button
            className="button primary auth-button"
            type="submit"
          >

            Create Account

          </button>

        </form>


        <p className="auth-switch">

          Already have an account?{" "}

          <Link to="/login">
            Log in
          </Link>

        </p>

      </section>

    </div>

  );
}
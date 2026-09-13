import { useState } from "react";
import {
  Link,
  useNavigate
} from "react-router-dom";

import { authApi } from "../services/api";


export default function Login() {

  const navigate =
    useNavigate();


  const [form, setForm] =
    useState({
      email: "",
      password: ""
    });


  const [error, setError] =
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


    if (
      !form.email ||
      !form.password
    ) {

      setError(
        "Please enter your email and password."
      );

      return;
    }


    try {

      await authApi.login(form);


      navigate(
        "/dashboard"
      );


    } catch (error) {

      setError(
        error.message
      );

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
            Log in to your account
          </p>

        </div>


        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >


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


          {error && (

            <p className="auth-message error">

              {error}

            </p>

          )}


          <button
            className="button primary auth-button"
            type="submit"
          >

            Log In

          </button>

        </form>


        <p className="auth-switch">

          Don't have an account?{" "}

          <Link to="/register">
            Create account
          </Link>

        </p>

      </section>

    </div>

  );
}
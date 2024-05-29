/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios.post("/register", {
        name,
        email,
        password,
      });
      toast.success("You have successfully create an account");
      navigate("/login", { replace: true });
      e.target.reset();
    } catch (error) {
      toast.error("Registration Failed try again later");
    }
  };
  return (
    <React.Fragment>
      <div className="grow flex items-center justify-around">
        <div className="mb-16">
          <h1 className="text-center text-4xl mb-4">Register Here</h1>
          <form className=" max-w-md mx-auto" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="youremail@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              autoComplete="true"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="primary">
              Register
            </button>
            <div className=" text-center text-gray-500 py-2">
              Already have an account ?
              <Link className=" underline text-black" to={"/login"}>
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Register;

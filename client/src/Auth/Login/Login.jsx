/* eslint-disable react/no-unescaped-entities */
import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userContext } from "../../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(userContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/login", { email, password });
      setUser(data);
      if (data._id) {
        setRedirect(true);
        toast.success("Login successfull");
      } else {
        setRedirect(false);
        toast.error("Incorrect username or password");
      }
    } catch (error) {
      toast.error("Login Failed");
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <React.Fragment>
      <div className="grow flex items-center justify-around">
        <div className="mb-32">
          <h1 className="text-center text-4xl mb-4">Login Here</h1>
          <form className=" max-w-md mx-auto" onSubmit={handleSubmit}>
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
            <button className="primary">Login</button>
            <div className=" text-center text-gray-500 py-2">
              Don't have an account yet?
              <Link className=" underline text-black" to={"/register"}>
                Register now
              </Link>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;

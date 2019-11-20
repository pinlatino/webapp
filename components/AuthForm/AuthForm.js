import React, { useState } from "react";
import fetch from "isomorphic-unfetch";

const AuthForm = ({ onSuccess, isLogin = true }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [country, setCountry] = useState("");

  const onChange = event => {
    const {
      target: { value, name }
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "firstname") {
      setFirstname(value);
    } else if (name === "lastname") {
      setLastname(value);
    } else if (name === "country") {
      setCountry(value);
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    console.log("submitting");
    const URL = isLogin ? "/api/login" : "/api/signup";

    const body = isLogin
      ? {
          email,
          password
        }
      : {
          email,
          password,
          firstname,
          lastname,
          country
        };

    fetch(URL, {
      method: "POST",
      body: JSON.stringify(body),
      headers: new Headers({ "content-type": "application/json" })
    })
      .then(res => res.json())
      .then(res => {
        console.log("login call", res);
        onSuccess();
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" value={email} name="email" onChange={onChange} />
      <input
        type="password"
        name="password"
        value={password}
        onChange={onChange}
      />
      <input
        type="text"
        value={firstname}
        name="firstname"
        onChange={onChange}
      />
      <input type="text" value={lastname} name="lastname" onChange={onChange} />
      <input type="text" value={country} name="country" onChange={onChange} />
      <button type="submit">{isLogin ? "login" : "register"}</button>
    </form>
  );
};

export default AuthForm;

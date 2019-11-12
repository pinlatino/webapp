import React, { useState } from "react";
import fetch from "isomorphic-unfetch";

const AuthForm = ({ onSuccess, isLogin = true }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onChange = event => {
    const {
      target: { value, name }
    } = event;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    console.log("submitting");
    const URL = isLogin
      ? "http://localhost:3000/api/login"
      : "http://localhost:3000/api/signup";
    fetch(URL, {
      method: "POST",
      body: JSON.stringify({
        username,
        password
      }),
      headers: new Headers({ "content-type": "application/json" })
    })
      .then(res => res.json())
      .then(res => {
        console.log("login call", res);
        onSuccess();
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" value={username} name="username" onChange={onChange} />
      <input
        type="password"
        name="password"
        value={password}
        onChange={onChange}
      />
      <button type="submit">{isLogin ? "login" : "register"}</button>
    </form>
  );
};

export default AuthForm;

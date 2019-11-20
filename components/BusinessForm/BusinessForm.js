import React, { useState } from "react";
import fetch from "isomorphic-unfetch";
import Input from "../Input";

const BusinessForm = ({ onSuccess, isLogin = true }) => {
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [website1, setWebsite1] = useState("");
  const [website2, setWebsite2] = useState("");
  const [facebook, setFacebook] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [instagram, setInstagram] = useState("");
  const [otherSocial, setOtherSocial] = useState("");
  const [comment, setComment] = useState("");

  const onChange = event => {
    const {
      target: { value, name }
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "name") {
      setName(value);
    } else if (name === "profession") {
      setProfession(value);
    } else if (name === "description") {
      setDescription(value);
    } else if (name === "phone") {
      setPhone(value);
    } else if (name === "country") {
      setCountry(value);
    } else if (name === "website") {
      setWebsite(value);
    } else if (name === "facebook") {
      setFacebook(value);
    } else if (name === "linkedin") {
      setLinkedin(value);
    } else if (name === "instagram") {
      setInstagram(value);
    } else if (name === "otherSocial") {
      setOtherSocial(value);
    } else if (name === "comment") {
      setComment(value);
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    console.log("submitting");
    const URL = "/api/businesses";

    const body = {
      name,
      profession,
      description,
      email,
      comment,
      phone,
      website,
      facebook,
      instagram,
      otherSocial
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
      <Input
        type="text"
        value={name}
        label="name"
        name="name"
        onChange={onChange}
      />
      <Input
        type="text"
        name="profession"
        label="profession"
        value={profession}
        onChange={onChange}
      />
      <Input
        type="text"
        value={description}
        name="description"
        label="description"
        onChange={onChange}
      />
      <Input
        type="email"
        value={email}
        name="email"
        label="email"
        onChange={onChange}
      />
      <Input
        type="phone"
        value={phone}
        name="phone"
        label="phone"
        onChange={onChange}
      />
      <Input
        type="text"
        value={website}
        name="website"
        label="website"
        onChange={onChange}
      />
      <Input
        type="text"
        value={facebook}
        name="facebook"
        label="facebook"
        onChange={onChange}
      />
      <Input
        type="text"
        value={instagram}
        name="instagram"
        label="instagram:"
        onChange={onChange}
      />
      <Input
        type="text"
        value={linkedin}
        name="linkedin"
        name="linkedin:"
        onChange={onChange}
      />
      <Input
        type="text"
        value={otherSocial}
        name="otherSocial"
        label="other social link:"
        onChange={onChange}
      />
      <Input
        type="text"
        value={comment}
        name="comment"
        label="comment:"
        onChange={onChange}
      />
      <button type="submit">Add Business</button>
    </form>
  );
};

export default BusinessForm;

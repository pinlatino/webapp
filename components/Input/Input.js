import React from "react";

const Input = ({ label, name, onChange, value, type }) => (
  <div className="InputItem">
    {label && <label htmlFor={name}>{label}</label>}
    <input type={type} name={name} onChange={onChange} value={value} />

    <style jsx>{`
      .InputItem {
        display: block;
      }
      label {
        display: block;
      }
    `}</style>
  </div>
);

export default Input;

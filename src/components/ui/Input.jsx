import React from "react";

import classes from "./Input.module.scss";

const Input = ({
  label,
  type,
  name,
  placeholder,
  onChange,
  value,
  error,
  required,
  id
}) => {
  const errorEl = <span className={classes.error}>{error}</span>;

  return (
    <div className={classes.input}>
      {label && <label htmlFor={id}>{label}</label>}

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        id={id}
        required={required ? required : false}
      />
      {error && errorEl}
    </div>
  );
};

export default Input;

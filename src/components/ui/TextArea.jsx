import React from "react";

import classes from './TextArea.module.scss';

const Input = ({
  label,
  type,
  name,
  placeholder,
  onChange,
  value,
  error,
  required
}) => {
  const errorEl = <span className={classes.error}>{error}</span>;

  return (
    <div className={classes.area}>
      <label htmlFor={name}>
        {label}
      </label>
      <textarea
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        required = {required ? required : false}
      />
      {error && errorEl}
    </div>
  );
};

export default Input;
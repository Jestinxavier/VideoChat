import React, { useState } from "react";
import InputWithLabel from "../../shared/component/InputWithLabel";

function RegisterPageInput(props) {
  const { mail, setMail, username, setUsername, password, setPassword } = props;
  return (
    <div>
      <InputWithLabel
        value={mail}
        setValue={setMail}
        label="E-Mail adress"
        type="text"
        placeholder="Enter the Email Adress"
      />

      <InputWithLabel
        value={username}
        setValue={setUsername}
        label="Username"
        type="text"
        placeholder="Enter the Username"
      />

      <InputWithLabel
        value={password}
        setValue={setPassword}
        label="password"
        type="text"
        placeholder="Enter the password"
      />
    </div>
  );
}

export default RegisterPageInput;

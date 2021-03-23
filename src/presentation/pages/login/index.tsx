import { useState, useEffect } from "react";

import { TextField, Login as LoginC, Button } from "@/presentation/components";

import { Validation } from "@/presentation/protocols/validation";
import { Authentication } from "@/domain/usecases/authentication";

type Props = {
  validation: Validation;
  authentication: Authentication;
};

const Login: React.FC<Props> = ({ validation, authentication }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [formError, setFormError] = useState({
    emailMessage: null,
    passwordMessage: null,
    mainMessage: null,
  });

  const [isLoading] = useState(false);

  useEffect(() => {}, [form.password, validation]);

  const handleOnChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitForm = async () => {
    const { email, password } = form;

    const emailMessage = validation.validate("email", email);
    const passwordMessage = validation.validate("password", password);

    setFormError((prevState) => ({
      ...prevState,
      emailMessage,
      passwordMessage,
    }));

    const formIsValid = !emailMessage && !passwordMessage;
    if (formIsValid) {
      await authentication.auth({ email, password });
    }
  };

  return (
    <div>
      <TextField
        inputProps={{
          placeholder: "email",
          value: form.email,
          name: "email",
          onChange: handleOnChangeInputValue,
        }}
        error={formError.emailMessage}
      />
      <TextField
        inputProps={{
          placeholder: "password",
          type: "password",
          value: form.password,
          name: "password",
          onChange: handleOnChangeInputValue,
        }}
        error={formError.passwordMessage}
      />

      <Button onClick={handleSubmitForm}>Enviar</Button>

      <LoginC.FormStatus isLoading={isLoading} error={formError.mainMessage} />
    </div>
  );
};

export default Login;

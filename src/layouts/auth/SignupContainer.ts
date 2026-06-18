import { useState } from "react";
import { EMAIL_REGEX } from "../../lib/utils";

export default function useSignup() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const validate = () => {
    let newErrors = {
      email: "",
      password: "",
      confirmPassword: "",
    };

    let isValid = true;

    if (!form.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!EMAIL_REGEX.test(form.email)) {
      newErrors.email = "Enter a valid email";
      isValid = false;
    }

    if (!form.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
      isValid = false;
    }

    if (
      form.password &&
      form.confirmPassword &&
      form.password !== form.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validate();

    if (!isValid) return;
  };

  const isFormValid =
    EMAIL_REGEX.test(form.email) &&
    !!form.password &&
    !!form.confirmPassword &&
    form.password === form.confirmPassword;

  return {
    form,
    handleChange,
    handleSubmit,
    isFormValid,
  };
}

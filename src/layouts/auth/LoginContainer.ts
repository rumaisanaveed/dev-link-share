import { useState } from "react";
import { EMAIL_REGEX } from "../../lib/utils";

export default function useLogin() {
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
    let isValid = true;

    if (!form.email) {
      isValid = false;
    } else if (!EMAIL_REGEX.test(form.email)) {
      isValid = false;
    }

    if (!form.password) {
      isValid = false;
    }

    if (!form.confirmPassword) {
      isValid = false;
    }

    if (
      form.password &&
      form.confirmPassword &&
      form.password !== form.confirmPassword
    ) {
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validate();

    if (!isValid) return;
  };

  const isFormValid = EMAIL_REGEX.test(form.email) && !!form.password;

  return {
    form,
    handleChange,
    handleSubmit,
    isFormValid,
  };
}

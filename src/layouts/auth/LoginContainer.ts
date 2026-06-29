import { useState } from "react";
import { EMAIL_REGEX } from "../../lib/utils";
import { toast } from "sonner";
import { FirebaseError } from "firebase/app";
import { getFirebaseErrorMessage } from "../../lib/firebase-errors";
import { login } from "../../services/auth";
import { useNavigate } from "react-router-dom";

export default function useLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const validate = () => {
    if (!form.email) return false;

    if (!EMAIL_REGEX.test(form.email)) return false;

    if (!form.password) return false;

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validate();

    if (!isValid) return;

    try {
      await login(form.email, form.password);

      toast.success("Logged in successfully.");

      navigate("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error(getFirebaseErrorMessage(error.code));
        console.error(error.code, error.message);
      } else {
        toast.error("Something went wrong.");
        console.error(error);
      }
    }
  };

  const isFormValid = EMAIL_REGEX.test(form.email) && !!form.password;

  return {
    form,
    handleChange,
    handleSubmit,
    isFormValid,
  };
}

import { useState } from "react";
import { EMAIL_REGEX } from "../../lib/utils";
import { signup } from "../../services/auth";
import { createUserProfile } from "../../services/users";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { getFirebaseErrorMessage } from "../../lib/firebase-errors";

export default function useSignup() {
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validate();

    if (!isValid) return;

    setIsSubmitting(true);

    try {
      const user = await signup(form.email, form.password);

      await createUserProfile(user.uid, user.email ?? "");

      toast.success("Signup successful.");
      navigate("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error(getFirebaseErrorMessage(error.code));
        console.error(error.code, error.message);
      } else {
        toast.error("An unexpected error occurred.");
        console.error(error);
      }
    } finally {
      setIsSubmitting(false);
    }
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
    isSubmitting,
  };
}

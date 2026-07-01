import { ImageIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import { EMAIL_REGEX } from "../lib/utils";
import { updateUserProfile } from "../services/profile";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function ProfileDetails() {
  const { user } = useAuth();

  const [isSaving, setIsSaving] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(user?.photoURL ?? null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    if (!user) return;

    setForm({
      username: user.displayName ?? "",
      email: user.email ?? "",
    });
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    let isValid = true;

    if (!form.email) {
      isValid = false;
    } else if (!EMAIL_REGEX.test(form.email)) {
      isValid = false;
    }

    if (!form.username) {
      isValid = false;
    }

    return isValid;
  };

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
    );

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
      }/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    if (!response.ok) {
      throw new Error("Image upload failed");
    }

    const data = await response.json();

    return data.secure_url as string;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSaving(true);

    try {
      let photoURL: string | undefined;

      if (image) {
        photoURL = await uploadToCloudinary(image);
      }

      await updateUserProfile(form.username, photoURL);

      toast.success("Profile updated!");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setIsSaving(false);
    }
  };

  const isFormValid = EMAIL_REGEX.test(form.email) && form.username;

  return (
    <div className="bg-white rounded-xl py-7 px-10 md:col-span-4 flex flex-col justify-between">
      <div className="flex flex-col gap-10">
        {/* Header */}
        <div className="space-y-3">
          <h2 className="text-3xl font-bold text-slate-900">Profile Details</h2>

          <p className="text-gray-500">
            Add your details to create a personal touch to your profile.
          </p>
        </div>

        {/* Upload Section */}
        <div className="rounded-xl bg-slate-50 p-5">
          <div className="grid lg:grid-cols-3 text-center lg:text-left place-items-center gap-6">
            <p className="text-gray-500">Profile picture</p>

            <>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={handleImageChange}
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="
                    h-48 w-48
                    rounded-xl
                    overflow-hidden
                    bg-violet-100
                    hover:bg-violet-200
                    transition-colors
                    flex items-center justify-center
                  "
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="Profile preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-4 text-primary">
                    <ImageIcon size={40} />
                    <span className="text-lg font-medium">+ Upload Image</span>
                  </div>
                )}
              </button>
            </>

            <p className="text-sm text-gray-500 leading-6 hidden xl:block">
              Image must be below 1024×1024px.
              <br />
              Use PNG, JPG or WebP.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="rounded-xl bg-slate-50 p-5">
          <div className="space-y-6">
            {/* User Name */}
            <div className="grid md:grid-cols-[150px_1fr] items-center gap-6">
              <Label className="text-gray-500 font-normal">Username</Label>

              <Input
                value={form.username}
                onChange={handleChange}
                placeholder="e.g. John Doe"
                className="h-12 bg-white"
                name="username"
              />
            </div>

            {/* Email */}
            <div className="grid md:grid-cols-[150px_1fr] items-center gap-6">
              <Label className="text-gray-500 font-normal">Email</Label>

              <Input
                placeholder="e.g. email@example.com"
                className="h-12 bg-white"
                value={form.email}
                name="email"
                onChange={handleChange}
                disabled
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-10 border-t pt-6 flex justify-end">
        <Button
          type="submit"
          disabled={!isFormValid || isSaving}
          size="lg"
          variant={"default"}
          onClick={handleSubmit}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

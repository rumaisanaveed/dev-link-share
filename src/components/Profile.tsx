import { ImageIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function ProfileDetails() {
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
          <div className="grid lg:grid-cols-3 text-center lg:text-left place-items-center lg:place-items-baseline gap-6">
            <p className="text-gray-500">Profile picture</p>

            <button
              type="button"
              className="
                h-48 w-48
                rounded-xl
                bg-violet-100
                flex flex-col items-center justify-center gap-4
                text-primary
                font-medium
                hover:bg-violet-200
                transition-colors
              "
            >
              <ImageIcon size={40} />

              <span className="text-lg">+ Upload Image</span>
            </button>

            <p className="text-sm text-gray-500 leading-6">
              Image must be below 1024x1024px.
              <br />
              Use PNG or JPG format.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="rounded-xl bg-slate-50 p-5">
          <div className="space-y-6">
            {/* User Name */}
            <div className="grid md:grid-cols-[150px_1fr] items-center gap-6">
              <Label className="text-gray-500 font-normal">
                Username<span className="text-red-500">*</span>
              </Label>

              <Input placeholder="e.g. John Doe" className="h-12 bg-white" />
            </div>

            {/* Email */}
            <div className="grid md:grid-cols-[150px_1fr] items-center gap-6">
              <Label className="text-gray-500 font-normal">Email</Label>

              <Input
                placeholder="e.g. email@example.com"
                className="h-12 bg-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-10 border-t pt-6 flex justify-end">
        <Button size="lg" variant={"default"}>
          Save
        </Button>
      </div>
    </div>
  );
}

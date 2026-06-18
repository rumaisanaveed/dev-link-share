import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import useSignup from "../../layouts/auth/SignupContainer";

export default function Signup() {
  const { form, isFormValid, handleChange, handleSubmit } = useSignup();

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-6 shadow-none border-none">
        <CardHeader className="flex flex-col gap-2">
          <CardTitle className="text-black text-xl md:text-2xl font-bold">
            Create Account
          </CardTitle>
          <CardDescription className="text-md">
            Let’s get you started sharing your links!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6 w-full">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-gray-600 font-normal">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  className="h-10"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password" className="text-gray-600 font-normal">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="h-10"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="confirmPassword"
                  className="text-gray-600 font-normal"
                >
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  className="h-10"
                  value={form.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-5">
                <Button
                  disabled={!isFormValid}
                  variant="default"
                  className="h-12"
                  type="submit"
                >
                  Create new account
                </Button>
                <p className="text-gray-600 font-normal text-center">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary">
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

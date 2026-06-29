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
import useLogin from "../../layouts/auth/LoginContainer";

export default function Login() {
  const { form, isFormValid, handleSubmit, handleChange } = useLogin();

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-xs sm:max-w-md p-3 sm:p-6 shadow-none border-none">
        <CardHeader className="flex flex-col gap-2">
          <CardTitle className="text-black text-xl md:text-2xl font-bold">
            Login
          </CardTitle>
          <CardDescription className="text-md">
            Add your details below to get back into the app
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6 w-full">
              <div className="grid gap-2">
                <Label htmlFor="email" className="font-normal text-gray-600">
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
                <Label htmlFor="password" className="font-normal text-gray-600">
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
              <div className="flex flex-col gap-5">
                <Button
                  disabled={!isFormValid}
                  variant="default"
                  className="h-12"
                  type="submit"
                >
                  Log in
                </Button>
                <p className="text-gray-600 font-normal text-center">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-primary">
                    Create Account
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

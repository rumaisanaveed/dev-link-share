import { Eye } from "lucide-react";
import { Button } from "../components/ui/button";
import PhoneMockup from "../components/PhoneMockup";

export default function PublicProfile() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full bg-primary rounded-bl-4xl rounded-br-4xl h-96 p-10">
        {/* Header */}
        <div className="bg-white rounded-xl p-4 flex items-center justify-between">
          <Button variant={"outline"} size={"lg"}>
            <span className="hidden md:block">Back to Editor</span>
            <span className="md:hidden">
              <Eye />
            </span>
          </Button>

          <Button variant={"default"} size={"lg"}>
            <span className="hidden md:block">Share</span>
            <span className="md:hidden">
              <Eye />
            </span>
          </Button>
        </div>
        <PhoneMockup className="bg-transparent" />
      </div>
    </div>
  );
}

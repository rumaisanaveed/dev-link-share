import { useNavigate } from "react-router-dom";
import PhoneMockup from "../components/PhoneMockup";
import { Button } from "../components/ui/button";

export default function PublicProfile() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full bg-primary rounded-bl-4xl rounded-br-4xl h-96 p-10">
        {/* Header */}
        <div className="bg-white rounded-xl p-4 flex items-center justify-between">
          <Button variant={"outline"} size={"lg"} onClick={() => navigate("/")}>
            Back to Editor
          </Button>

          <Button variant={"default"} size={"lg"}>
            Share
          </Button>
        </div>
        <PhoneMockup links={[]} className="bg-transparent" />
      </div>
    </div>
  );
}

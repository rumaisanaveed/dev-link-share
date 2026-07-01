import { useNavigate, useParams } from "react-router-dom";
import PhoneMockup from "../components/PhoneMockup";
import { Button } from "../components/ui/button";
import { useEffect, useState } from "react";
import { getPublicLinks, getUserByUsername } from "../services/publicProfile";
import type { LinkItem } from "./Home";
import { Spinner } from "../components/ui/spinner";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

export default function PublicProfile() {
  const navigate = useNavigate();
  const { username } = useParams();
  const { user } = useAuth();

  const [links, setLinks] = useState<LinkItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      if (!username) return;

      const userDoc = await getUserByUsername(username);

      if (!userDoc) {
        setLoading(false);
        return;
      }

      const publicLinks = await getPublicLinks(userDoc.id);

      setLinks(publicLinks);
      setLoading(false);
    }

    loadProfile();
  }, [username]);

  const handleShare = async () => {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Check out my DevLinkShare profile",
          text: "Here are all my links!",
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Profile link copied to clipboard!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full bg-primary rounded-bl-4xl rounded-br-4xl h-96 p-10">
        {/* Header */}
        <div className="bg-white rounded-xl p-4 flex items-center justify-between">
          <Button variant={"outline"} size={"lg"} onClick={() => navigate("/")}>
            Back to Editor
          </Button>

          <Button variant={"default"} size={"lg"} onClick={handleShare}>
            Share
          </Button>
        </div>
        {loading ? (
          <div className="flex items-center justify-center h-[50vh]">
            <Spinner className="size-24" color="#fff" />
          </div>
        ) : (
          <PhoneMockup
            links={links}
            className="bg-transparent"
            user={{
              displayName: user?.displayName ?? "",
              photoURL: user?.photoURL ?? "",
            }}
          />
        )}
      </div>
    </div>
  );
}

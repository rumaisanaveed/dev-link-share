import { useEffect, useState } from "react";
import { toast } from "sonner";
import Header from "../components/Header";
import LinksForm, {
  platformOptions,
  type PlatformOption,
} from "../components/LinksForm";
import PhoneMockup from "../components/PhoneMockup";
import ProfileDetails from "../components/Profile";
import { useAuth } from "../context/AuthContext";
import { getLinks, saveLinks } from "../services/links";

export type LinkItem = {
  id: string;
  platform: string;
  url: string;
};

export default function Home() {
  const [activeTab, setActiveTab] = useState("links");
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const { loading, user } = useAuth();

  const usedPlatforms = links.map((link) => link.platform);

  const availablePlatforms: PlatformOption[] = platformOptions.filter(
    (platform) => !usedPlatforms.includes(platform.value),
  );

  const addLink = () => {
    if (availablePlatforms.length === 0) return;

    setLinks((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        platform: availablePlatforms[0].value,
        url: "",
      },
    ]);
  };

  const removeLink = (id: string) => {
    setLinks((prev) => prev.filter((link) => link.id !== id));
  };

  const updatePlatform = (id: string, platform: string) => {
    setLinks((prev) =>
      prev.map((link) => (link.id === id ? { ...link, platform } : link)),
    );
  };

  const updateUrl = (id: string, url: string) => {
    setLinks((prev) =>
      prev.map((link) => (link.id === id ? { ...link, url } : link)),
    );
  };

  const handleSave = async () => {
    setIsSaving(true);

    try {
      await saveLinks(links);

      toast.success("Links saved!");
    } catch {
      toast.error("Unable to save.");
    } finally {
      setIsSaving(false);
    }
  };

  const loadLinks = async (uid: string) => {
    try {
      const data = await getLinks(uid);
      setLinks(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load links.");
    }
  };

  useEffect(() => {
    if (loading) return;

    if (!user) return;

    loadLinks(user.uid);
  }, [loading, user]);

  return (
    <div className="min-h-screen bg-gray-50 py-5 lg:py-10">
      <div className="max-w-11/12 mx-auto flex flex-col gap-10">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="grid grid-cols-1 md:grid-cols-7 gap-5">
          <PhoneMockup
            links={links}
            user={{
              displayName: user?.displayName ?? "",
              photoURL: user?.photoURL ?? "",
            }}
          />
          {activeTab === "links" && (
            <LinksForm
              links={links}
              setLinks={setLinks}
              availablePlatforms={availablePlatforms}
              add={addLink}
              remove={removeLink}
              updatePlatform={updatePlatform}
              updateLink={updateUrl}
              onSave={handleSave}
              isSaving={isSaving}
            />
          )}

          {activeTab === "profile" && <ProfileDetails />}
        </div>
      </div>
    </div>
  );
}

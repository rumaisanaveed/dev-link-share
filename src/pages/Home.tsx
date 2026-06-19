import { useState } from "react";
import Header from "../components/Header";
import LinksForm, {
  platformOptions,
  type PlatformOption,
} from "../components/LinksForm";
import PhoneMockup from "../components/PhoneMockup";
import ProfileDetails from "../components/Profile";

export type LinkItem = {
  id: string;
  platform: string;
  url: string;
};

export default function Home() {
  const [activeTab, setActiveTab] = useState("links");
  const [links, setLinks] = useState<LinkItem[]>([]);

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

  return (
    <div className="min-h-screen bg-gray-50 py-5 lg:py-10">
      <div className="max-w-11/12 mx-auto flex flex-col gap-10">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="grid grid-cols-1 md:grid-cols-7 gap-5">
          <PhoneMockup />
          {activeTab === "links" && (
            <LinksForm
              links={links}
              setLinks={setLinks}
              availablePlatforms={availablePlatforms}
              add={addLink}
              remove={removeLink}
              updatePlatform={updatePlatform}
              updateLink={updateUrl}
            />
          )}

          {activeTab === "profile" && <ProfileDetails />}
        </div>
      </div>
    </div>
  );
}

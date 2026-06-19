import { Eye, Link2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { TabItems } from "../layouts/home/constants";
import { Button } from "./ui/button";

type HeaderProps = {
  activeTab: string;
  setActiveTab: (value: string) => void;
};

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl p-4 flex items-center justify-between">
      <Link to="/" className="text-primary text-lg md:text-2xl font-bold">
        <span className="md:hidden">
          <Link2 />
        </span>
        <span className="hidden md:block">DevLinkShare</span>
      </Link>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          {TabItems.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              <tab.icon size={24} />
              <span className="hidden md:block">{tab.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <Button
        variant={"outline"}
        size={"lg"}
        onClick={() => navigate("/public-profile")}
      >
        <span className="hidden md:block">Preview</span>
        <span className="md:hidden">
          <Eye />
        </span>
      </Button>
    </div>
  );
}

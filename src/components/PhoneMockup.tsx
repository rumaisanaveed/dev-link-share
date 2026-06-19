import { ArrowRight, Copy } from "lucide-react";
import DevToIcon from "../assets/icons/DevTo.svg";
import FbIcon from "../assets/icons/Facebook.svg";
import FreeCodeCampIcon from "../assets/icons/FreeCodeCamp.svg";
import GithubIcon from "../assets/icons/Github.svg";
import HashnodeIcon from "../assets/icons/Hashnode.svg";
import InstaIcon from "../assets/icons/Insta.svg";
import LinkedinIcon from "../assets/icons/Linkedin.svg";
import PortfolioIcon from "../assets/icons/Portfolio.svg";
import StackOverflowIcon from "../assets/icons/StackOverflow.svg";
import TwitterIcon from "../assets/icons/Twitter.svg";
import YoutubeIcon from "../assets/icons/Youtube.svg";
import { cn } from "../lib/utils";
import { toast } from "sonner";

export default function PhoneMockup({ className }: { className?: string }) {
  const copyLink = async (e: React.MouseEvent, url: string) => {
    e.stopPropagation();

    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link Copied to clipboard!");
    } catch (error) {
      toast.error(error as string);
      console.error(error);
    }
  };

  return (
    <div
      className={cn(
        "md:col-span-3 flex items-center justify-center bg-white rounded-xl py-7 h-fit",
        className,
      )}
    >
      {/* Phone Frame */}
      <div className="w-[300px] h-[600px] bg-white rounded-[3rem] p-[10px] border border-gray-900">
        {/* Screen */}
        <div className="w-full h-full bg-white rounded-[2.5rem] flex flex-col border border-gray-900">
          {/* Top Notch */}
          <div className="h-6 flex items-center justify-center mt-1">
            <div className="w-16 h-2 bg-gray-300 rounded-full" />
          </div>

          {/* Profile Section */}
          <div className="flex flex-col items-center px-4 pt-2">
            <div className="w-20 h-20 rounded-full bg-gray-200" />
            <h2 className="mt-3 font-semibold text-lg">Your Name</h2>
            <p className="text-sm text-gray-500">@username</p>
          </div>

          {/* Links */}
          <div className="flex-1 px-5 mt-5 space-y-3 overflow-y-auto hide-scrollbar">
            {/* GitHub */}
            {StaticLinks.map((link) => (
              <div
                onClick={() => window.open(link.url, "_blank")}
                key={link.name}
                className="w-full h-12 rounded-xl flex items-center justify-between px-4"
                style={{
                  backgroundColor: link.bgColor,
                }}
              >
                <div className="flex items-center gap-3">
                  <img height={20} width={20} src={link.icon} />
                  <span className="text-white text-sm font-medium">
                    {link.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => copyLink(e, link.url)}
                    className="text-white/80 hover:text-white"
                    type="button"
                  >
                    <Copy size={15} />
                  </button>

                  <ArrowRight size={15} color="#fff" />
                </div>
              </div>
            ))}
          </div>

          {/* Bottom safe space */}
          <div className="h-6" />
        </div>
      </div>
    </div>
  );
}

const StaticLinks = [
  {
    name: "Instagram",
    url: "https://instagram.com",
    icon: InstaIcon,
    bgColor: "#E4405F",
  },
  {
    name: "Facebook",
    url: "https://facebook.com",
    icon: FbIcon,
    bgColor: "#1877F2",
  },
  {
    name: "GitHub",
    url: "https://github.com",
    icon: GithubIcon,
    bgColor: "#24292F",
  },
  {
    name: "Hashnode",
    url: "https://hashnode.com",
    icon: HashnodeIcon,
    bgColor: "#2962FF",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com",
    icon: LinkedinIcon,
    bgColor: "#0A66C2",
  },
  {
    name: "Stack Overflow",
    url: "https://stackoverflow.com",
    icon: StackOverflowIcon,
    bgColor: "#F48024",
  },
  {
    name: "Youtube",
    url: "https://youtube.com",
    icon: YoutubeIcon,
    bgColor: "#FF0000",
  },
  {
    name: "Portfolio",
    url: "https://rumaisa.netlify.app",
    icon: PortfolioIcon,
    bgColor: "#633CFF", // Your app primary color
  },
  {
    name: "Dev.To",
    url: "https://dev.to",
    icon: DevToIcon,
    bgColor: "#0A0A0A",
  },
  {
    name: "Twitter",
    url: "https://twitter.com",
    icon: TwitterIcon,
    bgColor: "#1DA1F2",
  },
  {
    name: "Free Code Camp",
    url: "https://freecodecamp.org",
    icon: FreeCodeCampIcon,
    bgColor: "#0A0A23",
  },
];

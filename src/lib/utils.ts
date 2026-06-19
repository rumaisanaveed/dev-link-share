import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
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

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const getPlatformColor = (platform: string) => {
  switch (platform) {
    case "instagram":
      return "#E4405F";
    case "facebook":
      return "#1877F2";
    case "github":
      return "#24292F";
    case "hashnode":
      return "#2962FF";
    case "linkedin":
      return "#0A66C2";
    case "stackoverflow":
      return "#F48024";
    case "youtube":
      return "#FF0000";
    case "portfolio":
      return "#633CFF";
    case "dev-to":
      return "#0A0A0A";
    case "twitter":
      return "#1DA1F2";
    case "free-code-camp":
      return "#0A0A23";
    default:
      return "#24292F";
  }
};

export const getPlatformIcon = (platform: string) => {
  switch (platform) {
    case "instagram":
      return InstaIcon;
    case "facebook":
      return FbIcon;
    case "github":
      return GithubIcon;
    case "hashnode":
      return HashnodeIcon;
    case "linkedin":
      return LinkedinIcon;
    case "stackoverflow":
      return StackOverflowIcon;
    case "youtube":
      return YoutubeIcon;
    case "portfolio":
      return PortfolioIcon;
    case "twitter":
      return TwitterIcon;
    case "free-code-camp":
      return FreeCodeCampIcon;
    case "dev.to":
      return DevToIcon;
    default:
      return GithubIcon;
  }
};

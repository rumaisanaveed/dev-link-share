import { ArrowRight, Copy } from "lucide-react";
import { toast } from "sonner";
import { cn, getPlatformColor, getPlatformIcon } from "../lib/utils";
import type { LinkItem } from "../pages/Home";
import { platformOptions } from "./LinksForm";

export default function PhoneMockup({
  className,
  links,
  user,
}: {
  className?: string;
  links: LinkItem[];
  user?: {
    displayName?: string;
    photoURL?: string;
  };
}) {
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

  const previewLinks = links.flatMap((link) => {
    const meta = platformOptions.find((p) => p.value === link.platform);

    if (!meta) return [];

    return [
      {
        name: meta.label,
        icon: getPlatformIcon(meta.value),
        url: link.url,
        bgColor: getPlatformColor(meta.value),
      },
    ];
  });

  const displayedLinks = [
    ...previewLinks,
    ...Array.from({
      length: Math.max(0, 6 - previewLinks.length),
    }).map((_, index) => ({
      id: `placeholder-${index}`,
      isPlaceholder: true,
    })),
  ];

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
            <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-600 font-bold">
                  {user?.displayName?.charAt(0)?.toUpperCase() || "U"}
                </div>
              )}
            </div>
            <h2 className="mt-3 font-semibold text-lg">
              {user?.displayName || "Anonymous"}
            </h2>
            <p className="text-sm text-gray-500">
              {user?.displayName ? `@${user.displayName}` : "@username"}
            </p>
          </div>

          {/* Links */}
          <div className="flex-1 px-5 mt-5 space-y-3 overflow-y-auto hide-scrollbar">
            {displayedLinks.map((link) => {
              if ("isPlaceholder" in link) {
                return (
                  <div
                    key={link.id}
                    className="w-full h-12 rounded-xl bg-gray-200 animate-pulse flex items-center justify-between px-4"
                  ></div>
                );
              }

              return (
                <div
                  key={link.name}
                  onClick={() => window.open(link.url, "_blank")}
                  className="w-full h-12 rounded-xl flex items-center justify-between px-4 cursor-pointer"
                  style={{
                    backgroundColor: link.bgColor,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <img
                      height={20}
                      width={20}
                      src={link.icon}
                      alt={link.name}
                    />

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
              );
            })}
          </div>
          <div className="h-6" />
        </div>
      </div>
    </div>
  );
}

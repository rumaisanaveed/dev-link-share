import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Link2, Plus } from "lucide-react";
import DevToIcon from "../assets/icons/DevToGrey.svg";
import FbIcon from "../assets/icons/FacebookGrey.svg";
import FreeCodeCampIcon from "../assets/icons/FreeCodeCampGrey.svg";
import GithubIcon from "../assets/icons/GithubGrey.svg";
import HashnodeIcon from "../assets/icons/HashnodeGrey.svg";
import InstaIcon from "../assets/icons/InstaGrey.svg";
import LinkedinIcon from "../assets/icons/LinkedInGrey.svg";
import PortfolioIcon from "../assets/icons/PortfolioGrey.svg";
import StackOverflowIcon from "../assets/icons/StackOverflowGrey.svg";
import TwitterIcon from "../assets/icons/TwitterGrey.svg";
import YoutubeIcon from "../assets/icons/YoutubeGrey.svg";
import NoLinkIllustraion from "../assets/images/NoLinkIllustration.svg";
import type { LinkItem } from "../pages/Home";
import { Button } from "./ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export type PlatformOption = {
  label: string;
  value: string;
  icon: string;
};

type LinksFormProps = {
  links: LinkItem[];
  availablePlatforms: PlatformOption[];
  setLinks: React.Dispatch<React.SetStateAction<LinkItem[]>>;
  add: () => void;
  remove: (id: string) => void;
  updatePlatform: (id: string, url: string) => void;
  updateLink: (id: string, url: string) => void;
  onSave: () => void;
  isSaving: boolean;
};

export default function LinksForm(props: LinksFormProps) {
  const { links, setLinks, onSave, isSaving, ...rest } = props;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = links.findIndex((l) => l.id === active.id);
    const newIndex = links.findIndex((l) => l.id === over.id);

    const newLinks = arrayMove(links, oldIndex, newIndex);

    setLinks(newLinks);
  };

  return (
    <div className="bg-white rounded-xl py-7 px-10 md:col-span-4 flex flex-col gap-4">
      <LinksHeader
        availablePlatforms={rest.availablePlatforms}
        add={rest.add}
      />
      {/* Links Container */}
      <div className="flex flex-col gap-3">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={links.map((l) => l.id)}
            strategy={verticalListSortingStrategy}
          >
            {links.length === 0 ? (
              <NoLinkState />
            ) : (
              links.map((link, index) => {
                const currentPlatform = link.platform;

                const options: PlatformOption[] = platformOptions.filter(
                  (option) =>
                    option.value === currentPlatform ||
                    !links.some(
                      (l) => l.platform === option.value && l.id !== link.id,
                    ),
                );

                return (
                  <LinkCard
                    key={link.id}
                    link={link}
                    index={index}
                    options={options}
                    {...rest}
                  />
                );
              })
            )}
          </SortableContext>
        </DndContext>
      </div>
      <div className="flex justify-end">
        <Button
          variant={"default"}
          size={"lg"}
          onClick={onSave}
          disabled={isSaving}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

type LinkCardProps = Omit<
  LinksFormProps,
  "links" | "setLinks" | "availablePlatforms" | "onSave" | "isSaving"
> & {
  link: LinkItem;
  index: number;
  options: PlatformOption[];
};
const LinkCard = ({
  link,
  index,
  options,
  remove,
  updateLink,
  updatePlatform,
}: LinkCardProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: link.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-gray-100 rounded-lg p-4 grid gap-3"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link2 className="text-gray-400" />
          <p className="text-gray-500 font-semibold">Link # {index + 1}</p>
        </div>
        <Button variant={"secondary"} onClick={() => remove(link.id)}>
          Remove
        </Button>
      </div>

      <div className="grid gap-5">
        <div className="grid gap-2">
          <Label className="text-gray-500 font-normal">Platform</Label>
          <Select
            value={link.platform}
            onValueChange={(value) => updatePlatform(link.id, value)}
          >
            <SelectTrigger className="w-full">
              <div className="flex items-center gap-2">
                <SelectValue placeholder="Select a platform" />
              </div>
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                {options.map((option) => {
                  return (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        <img
                          src={option.icon}
                          alt={option.label}
                          className="h-4 w-4 text-gray-500"
                        />
                        <span>{option.label}</span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label className="text-gray-500 font-normal">Link</Label>
          <InputGroup className="bg-white">
            <InputGroupAddon>
              <Link2 className="size-5 text-gray-500" />
            </InputGroupAddon>

            <InputGroupInput
              value={link.url}
              placeholder="e.g. https://www.github.com/johnappleseed"
              onChange={(e) => updateLink(link.id, e.target.value)}
            />
          </InputGroup>
        </div>
      </div>
    </div>
  );
};

const NoLinkState = () => {
  return (
    <div className="bg-zinc-50 rounded-lg p-10 flex flex-col gap-5 items-center justify-center text-center">
      <img src={NoLinkIllustraion} />
      <h3 className="text-3xl font-bold">Let's get you started</h3>
      <p className="text-zinc-500 font-normal max-w-md w-full">
        Use the “Add new link” button to get started. Once you have more than
        one link, you can reorder and edit them. We’re here to help you share
        your profiles with everyone!
      </p>
    </div>
  );
};

type LinksHeaderProps = Pick<LinksFormProps, "add" | "availablePlatforms">;
const LinksHeader = ({ add, availablePlatforms }: LinksHeaderProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-3">
        <h2 className="text-black font-bold text-lg md:text-3xl">
          Customize your links
        </h2>
        <p className="text-gray-600 font-normal text-base">
          Add/edit/remove links below and then share all your profiles with the
          world
        </p>
      </div>
      <Button
        variant={"outline"}
        className="w-full"
        size={"lg"}
        onClick={() => add()}
        disabled={availablePlatforms.length === 0}
      >
        <Plus size={20} color="#633cff" />
        <p>Add New Link</p>
      </Button>
    </div>
  );
};

export const platformOptions = [
  {
    label: "Instagram",
    value: "instagram",
    icon: InstaIcon,
  },
  {
    label: "Facebook",
    value: "facebook",
    icon: FbIcon,
  },
  {
    label: "GitHub",
    value: "github",
    icon: GithubIcon,
  },
  {
    label: "Hashnode",
    value: "hashnode",
    icon: HashnodeIcon,
  },
  {
    label: "LinkedIn",
    value: "linkedin",
    icon: LinkedinIcon,
  },
  {
    label: "Stack Overflow",
    value: "stackoverflow",
    icon: StackOverflowIcon,
  },
  {
    label: "Youtube",
    value: "youtube",
    icon: YoutubeIcon,
  },
  {
    label: "Portfolio",
    value: "portfolio",
    icon: PortfolioIcon,
  },
  {
    label: "Dev.To",
    value: "dev-to",
    icon: DevToIcon,
  },
  {
    label: "Twitter",
    value: "twitter",
    icon: TwitterIcon,
  },
  {
    label: "Free Code Camp",
    value: "free-code-camp",
    icon: FreeCodeCampIcon,
  },
];

import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

const ProfileCard = ({
  img = "/images/dummy-profile-pic.svg",
  imgSize = 35,
  imgAlt = "Profile Picture",
  imgRound = true,
  imgClass = "",
  head = "Heading here...",
  headClamp = true,
  headClass = "",
  subHead = "Sub headig here...",
  subHeadClamp = true,
  subHeadClass = "",
}: {
  img?: string | StaticImport;
  imgSize?: number;
  imgAlt?: string;
  imgRound?: boolean;
  imgClass?: string;
  head: string;
  headClamp?: boolean;
  headClass?: string;
  subHead?: string;
  subHeadClamp?: boolean;
  subHeadClass?: string;
}) => {
  return (
    <div className="grid grid-flow-col grid-cols-[minmax(0px,_2.5rem)_1fr] items-center gap-3">
      <Image
        priority
        src={img}
        height={imgSize}
        width={imgSize}
        alt={imgAlt}
        className={`inline aspect-square ${
          imgRound ? "rounded-full" : ""
        } ring-1 ring-gray-600 ring-opacity-50 ${imgClass}`}
      />
      <div>
        <h4
          className={`text-md ${headClamp ? "line-clamp-1" : ""} ${headClass}`}
        >
          {head}
        </h4>
        {subHead && (
          <p
            className={`text-xs text-slate-500 dark:text-gray-400 ${
              subHeadClamp ? "line-clamp-1" : ""
            } ${subHeadClass}`}
          >
            {subHead}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;

import { ITeam } from "@/utils/interfaces/team";
import avatar from "./avatar.module.css";
import perfil from "@/assets/perfil01.png";
//icons
import { FaPlus } from "react-icons/fa6";
import { useState, useEffect } from "react";

interface Props {
  TeamLogo?: ITeam["badge"] | undefined;
  height?: string;
  width?: string;
  src?: string | undefined;
  alt?: string;
  path?: string;
  addImage?: boolean;
  handlePhoto?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Avatar({
  height,
  width,
  alt,
  src,
  path,
  addImage,
  handlePhoto,
}: Props) {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`http://localhost:8080/${src}`);

        if (response.ok) {
          const data = await response.blob();
          const url = URL.createObjectURL(data);
          setImageUrl(url);
        } else {
          console.error("Failed to fetch image");
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    })();
  }, [src]);
  return (
    <>
      <a href={path ? path : "#"}>
        <img
          className={`${avatar.avatar} `}
          height={height}
          width={width}
          src={!imageUrl ? perfil : imageUrl}
          alt={alt}
        />
        {addImage && (
          <label htmlFor="image-upload" className={avatar.imageUploadLabel}>
            <p className={avatar.addPicIcon}>
              <FaPlus size={20} color="white" background-color="blue" />
            </p>
            <input
              type="file"
              id="image-upload"
              accept="image/png, image/jpeg"
              onChange={handlePhoto}
              style={{ display: "none" }}
            />
          </label>
        )}
      </a>
    </>
  );
}

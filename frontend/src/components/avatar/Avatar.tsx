import { useState, useEffect, ChangeEvent } from "react";
import avatar from "./avatar.module.css";
import { FaPlus } from "react-icons/fa6";
//img
import perfil from "@/assets/perfil01.png";
//interfaces
import { ITeam } from "@/utils/interfaces/team";
interface Props {
  TeamLogo?: ITeam["badge"] | undefined;
  height?: string;
  width?: string;
  src?: string | undefined;
  alt?: string;
  path?: string;
  addImage?: boolean;
  handleSelectFile?: (file: File) => void;
}

const MAX_FILE_SIZE = 16777216; // 16 MB

export default function Avatar({
  height,
  width,
  alt,
  src,
  path,
  addImage,
  handleSelectFile,
}: Props) {
  const [previewImage, setPreviewImage] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");

  //img upload
  const handlePhoto = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log(file.size);

    if (file.size >= MAX_FILE_SIZE) {
      return alert("File size too large! Please choose a smaller file.");
    }
    setPreviewImage(URL.createObjectURL(file));
    handleSelectFile?.(file);
  };

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

    return () => {
      URL.revokeObjectURL(imageUrl);
    };
  }, [src, imageUrl]);

  return (
    <>
      <a href={path}>
        <img
          className={`${avatar.avatar} `}
          height={height}
          width={width}
          src={imageUrl || previewImage || perfil}
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

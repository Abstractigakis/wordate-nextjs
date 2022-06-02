import React, { FC } from "react";

export interface IUserImageProps {
  src: string;
}

const UserImage: FC<IUserImageProps> = ({ src }) => {
  return (
    <img
      className="m-2 p-2 mx-auto rounded-full w-40 h-40"
      src={src}
      alt="user image"
    />
  );
};

export default UserImage;

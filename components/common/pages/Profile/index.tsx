import PlayButton from "@components/app/PlayButton";
import LogoutButton from "@components/common/Auth/LogoutButton";
import DisplayField from "@components/common/Fields/DisplayStringField/DisplayField";
import UserImage from "@components/common/Fields/Images/UserImage";
import { FC } from "react";
import ChangeDisplayName from "./ChangeDisplayName";
import { IProfileProps } from "./types";

const Profile: FC<IProfileProps> = ({ faunaUser }) => {
  return (
    <div className="grid place-items-center">
      <div>
        <UserImage
          src={
            faunaUser?.image ||
            "https://randomuser.me/api/portraits/women/81.jpg"
          }
        />
        <DisplayField fieldName={"Name"} fieldValue={faunaUser.name} />
        <DisplayField
          fieldName={"Display Name"}
          fieldValue={faunaUser.displayName || faunaUser.name}
        />
        <DisplayField fieldName={"Email"} fieldValue={faunaUser.email} />
      </div>

      <ChangeDisplayName faunaUser={faunaUser} />
      <div className="grid place-items-center">
        <LogoutButton />
        <PlayButton />
      </div>
    </div>
  );
};

export default Profile;

import Button from "@components/common/Button";
import { useFaunaUserUpdateMutation } from "hooks";
import React, { FC, useState } from "react";
import toast from "react-hot-toast";
import { IProfileProps } from "../types";

const ChangeDisplayName: FC<IProfileProps> = ({ faunaUser }) => {
  const faunaUserUpdateMutation = useFaunaUserUpdateMutation(faunaUser.email);

  const [newDisplayName, setNewDisplayName] = useState<string>("");
  const [updatedDisplayName, setUpdatedDisplayName] = useState<
    string | undefined
  >();

  return (
    <div className="grid place-items-center my-8 mx-2 ">
      <form className="w-full max-w-sm">
        <div className={`flex items-center border-b p-2 border-blue-600`}>
          <input
            className="bg-transparent w-full focus:outline-none text-yellow-300  placeholder:text-yellow-300"
            type="text"
            placeholder="Change Name"
            value={newDisplayName}
            onChange={(e) => setNewDisplayName(e.target.value)}
          />
          <Button
            type="green"
            onClick={(e) => {
              e.preventDefault();
              let newUser = faunaUser;
              newUser.displayName = newDisplayName;
              faunaUserUpdateMutation.mutate(newUser);
              toast.success(`Successfully changed name to ${newDisplayName}`);
              setUpdatedDisplayName(newDisplayName);
              setNewDisplayName("");
            }}
          >
            Submit
          </Button>
          <Button
            type="red"
            onClick={(e) => {
              e.preventDefault();
              setNewDisplayName("");
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChangeDisplayName;

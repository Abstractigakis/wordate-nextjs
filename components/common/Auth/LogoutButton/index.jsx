import Button from "@components/common/Button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

const LogoutButton = () => {
  const router = useRouter();
  return (
    <Button
      type="red"
      onClick={() => {
        router.push("/").then(() => signOut());
      }}
    >
      Sign Out
    </Button>
  );
};

export default LogoutButton;

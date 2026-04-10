
import Button from "./Button";
import { useAuth } from "../../context/AuthContext";

export const LogoutButton = () => {
    const { logout } = useAuth();
      return (
        <Button size="md" color="delight-blue" text="Logout" onClick={logout}/>
    );
};
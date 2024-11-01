import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useLogout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove session data like tokens stored in localStorage or sessionStorage
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");

    // Redirect user to the login page
    navigate("/login");
    toast.success("You are Loged Out")
  };

  return handleLogout;
};

export default useLogout;

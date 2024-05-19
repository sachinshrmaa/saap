import { useNavigate } from "react-router-dom";

const verifyUser = () => {
  const naviagate = useNavigate();
  const token = localStorage.getItem("token");
  if (!token) {
    naviagate("/login");
  }
  // send an api call to verify the token
  return true;
};

export default verifyUser;

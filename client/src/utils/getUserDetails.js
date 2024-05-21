import axios from "axios";
import { useNavigate } from "react-router-dom";

const getUserDetails = async () => {
  const naviagate = useNavigate();
  try {
    const res = await axios.get("http://localhost:3000/api/v1/auth/");
    if (res.data.status === 200) {
      localStorage.setItem("name", res.data.user.name);
      localStorage.setItem("email", res.data.user.email);
      localStorage.setItem("phone", res.data.user.phone);
      localStorage.setItem("role", res.data.user.role);
    }
    if (res.data.status === 401) {
      localStorage.removeItem("token");
      naviagate("/login");
    }
  } catch (error) {
    console.log(error);
  }
};

export { getUserDetails };

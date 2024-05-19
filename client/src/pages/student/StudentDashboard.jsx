import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentDasboard() {
  const naviagate = useNavigate();

  useEffect(() => {
    const verify = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        naviagate("/login");
      }
    };
    verify();
  }, []);

  return (
    <div>
      <h1>Student Dashboard</h1>
    </div>
  );
}

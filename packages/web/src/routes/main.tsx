import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Static {
  path: string;
}

const MainPage: React.FC & Static = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const ip = localStorage.getItem("ip");
    if (!ip) {
      navigate("/start");
    }
  }, [navigate]);

  return <p>test</p>;
};

MainPage.path = "/";

export default MainPage;

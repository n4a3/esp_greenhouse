import React from "react";
import { useNavigate } from "react-router-dom";

interface OwnProps {}

type IndexProps = OwnProps;

const Index: React.FC<IndexProps> = () => {
  const navigate = useNavigate();

  const ip = localStorage.getItem("ip");

  if (!ip) {
    navigate("/start");
    return null;
  }

  return <p>{ip}</p>;
};

export default Index;

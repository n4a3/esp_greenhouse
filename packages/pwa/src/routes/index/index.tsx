import { h } from "preact";
import { route } from "preact-router";

interface OwnProps {}

type IndexProps = OwnProps;

const Index: React.FC<IndexProps> = () => {
  const ip = localStorage.getItem("ip");

  if (!ip) {
    route("/start");
    return null;
  }

  return <p>{ip}</p>;
};

export default Index;

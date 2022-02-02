import React from "react";

import Start from "components/templates/Start";

interface Static {
  path: string;
}

const StartPage: React.FC & Static = () => {
  return <Start />;
};

StartPage.path = "/start";

export default StartPage;

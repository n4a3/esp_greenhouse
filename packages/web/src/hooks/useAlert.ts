import { GlobalAlertContext } from "providers/GlobalAlertProvider";
import { useContext } from "react";

export const useAlert = () => {
  const { alerts, addAlert, removeAlert } = useContext(GlobalAlertContext);

  return { alerts, addAlert, removeAlert };
};

import React, { useState, useCallback } from "react";
import { ToastContainer } from "react-bootstrap";

import { useBreakpoint } from "hooks/useBreakpoints";
import GlobalAlert from "components/atoms/GlobalAlert";

export const GlobalAlertContext = React.createContext<IGlobalAlertContext>({
  alerts: [],
  addAlert: () => 0,
  removeAlert: () => {},
});

GlobalAlertContext.displayName = "GlobalAlertContext";

const GlobalAlertProvider: React.FC = ({ children }) => {
  const [alerts, setAlerts] = useState<TGlobalALert>([]);

  const breakpoint = useBreakpoint();

  const addAlert: IGlobalAlertContext["addAlert"] = (props) => {
    const id = +new Date();
    const newAlert: IGlobalAlert = { id, ...props };

    setAlerts((pS) => [...pS, newAlert]);

    console.log(newAlert);

    return id;
  };

  const removeAlert: IGlobalAlertContext["removeAlert"] = (id) =>
    setAlerts((pS) => {
      const idx = pS.findIndex((alert) => alert.id === id);
      const newAlerts = [...pS.slice(0, idx), ...pS.slice(idx + 1)];

      return newAlerts;
    });

  const renderAlerts = () => {
    return alerts.map((props) => {
      const remove = () => removeAlert(props.id);

      return <GlobalAlert key={props.id} onClose={remove} {...props} />;
    });
  };

  const contextValue: IGlobalAlertContext = {
    alerts,
    addAlert: useCallback((props) => addAlert(props), []),
    removeAlert: useCallback((id) => removeAlert(id), []),
  };

  const isSmall = breakpoint === "xs" || breakpoint === "sm";

  const position = isSmall ? "bottom-center" : "bottom-end";

  const fullWidth = isSmall ? "w-100" : "";

  return (
    <GlobalAlertContext.Provider value={contextValue}>
      {children}

      <ToastContainer
        position={position}
        className={`p-3 ${fullWidth}`}
        style={{ maxHeight: 400, overflow: "scroll", pointerEvents: "visible" }}
      >
        {renderAlerts()}
      </ToastContainer>
    </GlobalAlertContext.Provider>
  );
};

export default GlobalAlertProvider;

import { h } from "preact";
import { useCallback, useEffect, useState } from "preact/hooks";
import { Col, Dropdown } from "react-bootstrap";
import { WifiNetwork } from "esp_greenhouse/src/types/api";
import { getWifis } from "../../../api";
import WiFiNetwork from "../../molecules/WiFiNetwork";

interface OwnProps {
  onSelect: (ssid: string) => void;
}

type ConnectToWiFiProps = OwnProps;

const ConnectToWiFi: React.FC<ConnectToWiFiProps> = ({ onSelect }) => {
  const [networks, setNetworks] = useState<WifiNetwork[]>([]);
  const [selectedNetwork, setSelectedNetwork] = useState<number | null>(null);

  const loadWifis = useCallback(async () => {
    const wifis = await getWifis();

    setNetworks(wifis);
  }, []);

  useEffect(() => {
    loadWifis();
  }, []);

  const renderCurrentWifi = () =>
    selectedNetwork !== null
      ? networks[selectedNetwork].ssid
      : "Select WiFi...";

  return (
    <Dropdown>
      <Dropdown.Toggle variant="outline-primary">
        {renderCurrentWifi()}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {networks.map((network, i) => {
          const onClick = () => {
            setSelectedNetwork(i);
            onSelect(networks[i].ssid);
          };

          return <WiFiNetwork key={i} onClick={onClick} {...network} />;
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ConnectToWiFi;

const HOSTNAME = "espg";

export const getIP = async (host: string): Promise<string | null> => {
  try {
    const res = await fetch(`http://${host}:3241/get-ip/`);
    const json = await res.json();
    const ip = json["ip"];

    return ip;
  } catch (e) {
    console.error(e);

    return null;
  }
};

export const findESP = async (): Promise<string | null> =>
  await getIP(HOSTNAME);

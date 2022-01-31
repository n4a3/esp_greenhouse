const HOSTNAME = "127.0.0.1";

export const getIP = async (host: string): Promise<string | null> => {
  try {
    return (await (await fetch(`http://${host}:3241/get-ip/`)).json())["ip"];
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const findESP = async (): Promise<string | null> =>
  await getIP(HOSTNAME);

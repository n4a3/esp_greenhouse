declare module "*.svg" {
  export const ReactComponent: React.FunctionComponent<
    React.SVGAttributes<SVGElement>
  >;
  const src: string;
  export default src;
}

declare interface IGlobalAlert {
  id: number;
  message: string;
  autoClose?: boolean | number;
  variant?: import("react-bootstrap/esm/types").Variant;
}

declare type TGlobalALert = IGlobalAlert[];

declare interface IGlobalAlertContext {
  alerts: TGlobalALert;
  addAlert: (props: Omit<IGlobalAlert, "id">) => number;
  removeAlert: (id: number) => void;
}

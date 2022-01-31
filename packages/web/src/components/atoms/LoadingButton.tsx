import React from "react";
import { Button, ButtonProps, Spinner } from "react-bootstrap";

interface OwnProps {
  loading: boolean;
  disabled?: boolean;
}

type LoadingButtonProps = ButtonProps & OwnProps;

const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading,
  disabled: _disabled = false,
  children,
  ...props
}) => {
  const disabled = (!loading && _disabled) || loading;
  const content = loading ? <Spinner animation="border" size="sm" /> : children;

  return (
    <Button disabled={disabled} {...props}>
      {content}
    </Button>
  );
};

export default LoadingButton;

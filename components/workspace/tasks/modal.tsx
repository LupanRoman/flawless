import React from "react";

type Props = {
  children: React.ReactNode;
};

function Modal({ children }: Props) {
  return (
    <>
      <div>{children}</div>
    </>
  );
}

export default Modal;

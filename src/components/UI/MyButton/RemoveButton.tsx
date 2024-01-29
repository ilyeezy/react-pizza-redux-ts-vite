import { MouseEventHandler, ReactNode } from "react";
import cs from "./RemoveButton.module.scss";
type RemoveButtonProps = {
  onClick: MouseEventHandler<HTMLDivElement>;
  children?: ReactNode;
};

export default function RemoveButton({ onClick, children }: RemoveButtonProps) {
  return (
    <div onClick={() => onClick} className={cs.button}>
      {children}
    </div>
  );
}

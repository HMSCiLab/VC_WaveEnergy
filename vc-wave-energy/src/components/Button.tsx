import { ReactNode, ButtonHTMLAttributes } from "react";

type Props = {
  children?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>

function Button({ children, ...rest }: Props) {
  return (
    <button {...rest}>
      {children}
    </button>
  
  );
}

export default Button;

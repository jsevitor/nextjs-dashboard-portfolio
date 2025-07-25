import { ButtonProps } from "../types";

export function ButtonHamburger({ action, icon }: ButtonProps) {
  return (
    <button
      className="lg:hidden text-foreground text-3xl z-[60]"
      onClick={action}
    >
      <i className={icon}></i>
    </button>
  );
}

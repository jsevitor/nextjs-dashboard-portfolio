export type ButtonProps = {
  action?: () => void;
  label?: string;
  icon?: string;
  url?: string;
  className?: string;
};

export type ButtonVariantProps = ButtonProps & {
  variant: "save" | "close" | "add" | "edit" | "delete";
};

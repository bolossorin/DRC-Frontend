import { FC } from "react";

// libs
import cn from "classnames";

// assets
import styles from "./Button.module.scss";
import Link from "next/link";

interface IButton {
  children: string;
  classname?: string;
  icon?: string;
  disabled?: boolean;
  size: "small" | "medium" | "big";
  color: "green" | "grey" | "red" | "blue" | "lightGrey";
  href?: string;
  target?: string;
  onClick?: () => void;
}

export const Button: FC<IButton> = ({ icon, classname, children, size, onClick, color, disabled, href, target }) => {
  return href && !disabled ? (
    <Link
      href={href}
      target={target}
      className={cn(
        "font-medium flex items-center justify-center rounded transition-all select-none",
        styles.button,
        styles[size],
        styles[color],
        classname
      )}
    >
      {icon && <img src={icon} alt="" />}
      {children}
    </Link>
  ) : (
    <button
      disabled={disabled}
      type="button"
      onClick={onClick}
      className={cn(
        "font-medium flex items-center justify-center rounded transition-all select-none",
        styles.button,
        styles[size],
        styles[color],
        classname
      )}
    >
      {icon && <img src={icon} alt="" />}
      {children}
    </button>
  );
};

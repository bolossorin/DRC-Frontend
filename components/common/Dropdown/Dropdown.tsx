import { FC, useEffect, useRef, useState } from "react";
import cn from "classnames";

interface IDropdownProps {
  open: boolean;
  trigger: React.ReactNode;
  children: React.ReactNode;
  classname?: string;
}

export const Dropdown: FC<IDropdownProps> = ({ open, trigger, children, classname }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isBottom, setIsBottom] = useState(true);

  useEffect(() => {
    const setContentPosition = () => {
      if (contentRef.current && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();

        const bottomSpace = window.innerHeight - rect.bottom;
        const topSpace = window.innerHeight - rect.top;
        const contentHeight = contentRef.current.clientHeight;

        if (bottomSpace - contentHeight < 20) {
          return setIsBottom(false);
        }
        if (topSpace - contentHeight < 20) {
          setIsBottom(true);
        }
      }
    };

    window.addEventListener("scroll", setContentPosition);

    setContentPosition();

    return () => window.removeEventListener("scroll", setContentPosition);
  }, []);

  return (
    <div ref={containerRef} className="dropdown">
      {trigger}
      <div
        ref={contentRef}
        className={cn(
          "absolute z-10 left-0",
          classname,
          open ? "visible" : "invisible",
          !isBottom ? "-translate-y-full top-3" : "translate-y-full bottom-3"
        )}
      >
        {children}
      </div>
    </div>
  );
};

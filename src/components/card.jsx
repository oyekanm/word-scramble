import React from "react";

export function Card({ children,clx }) {
  return <div className={` ${clx}`}>{children}</div>;
}
export function CardHeaderContainer({children}) {
  return <div className="p-4">{children}</div>;
}
export function CardContent({children}) {
  return <div className="">{children}</div>;
}

export function CardTitle({ text }) {
  return (
    <p className="text-xl font-semibold text-gray-800 dark:text-neutral-300 dark:hover:text-white">
      {text}
    </p>
  );
}

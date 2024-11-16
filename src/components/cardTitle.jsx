import React from "react";

export default function CardTitle({ text }) {
    return (
      <p className="text-xl text-center font-semibold text-gray-800 dark:text-neutral-300 dark:hover:text-white">
        {text}
      </p>
    );
  }
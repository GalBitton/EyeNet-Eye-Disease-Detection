import React from "react";
import { Link } from "react-router-dom";

const VARIANT_CLASSES = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 border-transparent",
  secondary:
    "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent",
};

const Button = ({ to, children, iconLeft, iconRight, variant = "primary" }) => (
  <Link
    to={to}
    className={`px-8 py-4 rounded-lg text-lg font-semibold transition-colors flex items-center justify-center gap-2 ${VARIANT_CLASSES[variant]}`}
  >
    {iconLeft}
    {children}
    {iconRight}
  </Link>
);

export default Button;
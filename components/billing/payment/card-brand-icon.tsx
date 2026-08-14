interface CardBrandIconProps {
  brand: "visa" | "mastercard" | "amex" | "discover";
}

const brandConfig = {
  visa: { label: "VISA", className: "bg-blue-600 text-white" },
  mastercard: { label: "MC", className: "bg-orange-500 text-white" },
  amex: { label: "AMEX", className: "bg-slate-700 text-white" },
  discover: { label: "DISC", className: "bg-orange-600 text-white" },
};

export function CardBrandIcon({ brand }: CardBrandIconProps) {
  const config = brandConfig[brand];
  return (
    <span
      className={`flex h-8 w-12 shrink-0 items-center justify-center rounded-md text-[10px] font-bold tracking-wide ${config.className}`}
    >
      {config.label}
    </span>
  );
}
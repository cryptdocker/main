import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "white" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: Variant;
	size?: Size;
	children: ReactNode;
}

const variantStyles: Record<Variant, string> = {
	primary: "bg-teal-600 text-white hover:bg-teal-700 shadow-sm",
	secondary: "bg-teal-50 text-teal-700 hover:bg-teal-100",
	outline:
		"border border-slate-300 text-slate-700 hover:border-teal-500 hover:text-teal-600",
	white: "bg-white text-teal-700 hover:bg-teal-50 shadow-sm",
	ghost: "border border-white/30 text-white hover:bg-white/10",
};

const sizeStyles: Record<Size, string> = {
	sm: "px-4 py-2 text-sm",
	md: "px-6 py-2.5 text-sm",
	lg: "px-8 py-3 text-base",
};

export const Button: React.FC<ButtonProps> = ({
	variant = "primary",
	size = "md",
	className = "",
	children,
	...props
}) => {
	return (
		<button
			className={`inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 cursor-pointer ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
			{...props}
		>
			{children}
		</button>
	);
};

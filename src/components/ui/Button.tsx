type ButtonVariant = "primary" | "delete" | "complete";

type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
};

function Button({
  children,
  variant = "primary",
  type = "button",
  disabled = false,
  onClick,
  ariaLabel,
}: ButtonProps) {
  return (
    <button
      className={`button button--${variant}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

export default Button;
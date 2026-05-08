type CardProps = {
  children: React.ReactNode;
  className?: string;
};

function Card({ children, className = "" }: CardProps) {
  return <article className={`card ${className}`}>{children}</article>;
}

export default Card;
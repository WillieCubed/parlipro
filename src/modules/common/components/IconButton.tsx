import { Link } from "react-router-dom";

interface IconButtonProps {
  icon?: JSX.Element;
  color?: string;
  onClick?: () => void;
  to?: string;
}

export default function IconButton({
  icon,
  color,
  children,
  to = "#",
  onClick = () => undefined,
}: React.PropsWithChildren<IconButtonProps>) {
  return (
    <Link
      onClick={onClick}
      to={to}
      className="inline-block p-3 space-x-4 rounded-md shadow-sm hover:shadow-md focus:shadow-md bg-red-400 text-white"
      style={{
        color: color,
      }}
    >
      {icon}
      {children}
    </Link>
  );
}

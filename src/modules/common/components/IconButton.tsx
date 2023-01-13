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
      className="inline-flex px-3 py-2 space-x-4 rounded-xl shadow-sm hover:shadow-md focus:shadow-md bg-red-400 text-white font-semibold font-display"
      style={{
        backgroundColor: color,
      }}
    >
      {icon && <span className="mr-4">{icon}</span>}
      {children}
    </Link>
  );
}

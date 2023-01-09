import { Link } from "react-router-dom";

interface IconButtonProps {
  icon?: JSX.Element;
  color?: string;
  to?: string;
}

export default function IconButton({
  icon,
  color,
  children,
  to = "#",
}: React.PropsWithChildren<IconButtonProps>) {
  return (
    <Link
      to={to}
      className="inline-block p-3 space-x-4 rounded-md shadow-sm hover:shadow-md focus:shadow-md bg-red-400 text-white"
      style={{
        color: color,
      }}
    >
      {children}
    </Link>
  );
}

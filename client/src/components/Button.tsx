export const Button = ({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) => {
  return (
    <a
      onClick={onClick}
      className={`group inline-block rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white  ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      href="#"
    >
      <span className="block rounded-full px-8 py-2 text-sm font-medium group-hover:bg-transparent">
        {children}
      </span>
    </a>
  );
};

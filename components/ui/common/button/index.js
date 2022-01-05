export default function Button({
  children,
  hoverable = true,
  variant = "purple",
  className,
  ...rest
}) {
  const variants = {
    white: `text-black bg-white`,
    lightPurple: `text-indigo-700 bg-indigo-100 ${
      hoverable && "hover:bg-indigo-200"
    }`,
    purple: `text-white bg-indigo-600 ${hoverable && "hover:bg-indigo-700"}`,
    red: `text-white bg-red-600 ${hoverable && "hover:bg-red-700"}`,
  };
  return (
    <button
      {...rest}
      className={`disabled:opacity-50 disabled:cursor-not-allowed p-2 xs:px-8 xs:py-3 border rounded-md text-base font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

const SIZES = {
  sm: "w-2 h-2",
  md: "w-4 h-4",
  lg: "w-6 h-6",
};

export default function Loader({ size = "md" }) {
  return (
    <div className={`spinner `}>
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={`bounce-${i}`}
          className={`bounce${i + 1} ${SIZES[size]} bg-indigo-800`}
        ></div>
      ))}
    </div>
  );
}

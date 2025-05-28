export const GridLayout = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`grid w-full grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3 ${className}`}
  >
    {children}
  </div>
);

import { ReactNode } from 'react';

interface FilterButtonProps {
  onClick: () => void;
  children: ReactNode;
  enabled: boolean;
}
export const FilterButton = ({
  onClick,
  children,
  enabled,
}: FilterButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 text-sm rounded-full flex items-center gap-1 shadow-sm transition-colors ${
        enabled
          ? 'bg-accent text-accent-foreground'
          : 'bg-secondary text-secondary-foreground hover:bg-secondary/90'
      }`}
    >
      <div>{children}</div>
    </button>
  );
};

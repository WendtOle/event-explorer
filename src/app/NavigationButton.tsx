"use client"

interface NavigationButtonProps {
  label: string;
  onClick: () => void;
  direction?: 'left' | 'right';
  selected?: boolean;
}

const NavigationButton = ({ label, onClick, direction, selected = false }: NavigationButtonProps): JSX.Element => (
  <button 
    onClick={onClick}
    className={`px-4 py-1.5 text-sm rounded-full transition-colors flex items-center gap-1 shadow-sm ${
      selected 
        ? 'bg-blue-100 text-blue-800 font-semibold' 
        : 'bg-accent text-accent-foreground hover:bg-accent/90'
    }`}
  >
    {direction === 'left' && <span>←</span>}
    <span>{label}</span>
    {direction === 'right' && <span>→</span>}
  </button>
);

export default NavigationButton;
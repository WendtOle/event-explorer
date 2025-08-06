"use client"

interface NavigationButtonProps {
  label: string;
  onClick: () => void;
  direction: 'left' | 'right';
}

const NavigationButton = ({ label, onClick, direction }: NavigationButtonProps): JSX.Element => (
  <button 
    onClick={onClick}
    className="px-4 py-2 text-sm bg-accent text-accent-foreground rounded-full hover:bg-accent/90 transition-colors flex items-center gap-1 shadow-sm"
  >
    {direction === 'left' && <span>←</span>}
    <span>{label}</span>
    {direction === 'right' && <span>→</span>}
  </button>
);

export default NavigationButton;
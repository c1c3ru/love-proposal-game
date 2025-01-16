import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProposalButtonProps {
  variant: 'yes' | 'no';
  onClick: () => void;
  style?: React.CSSProperties;
  className?: string;
}

const ProposalButton: React.FC<ProposalButtonProps> = ({
  variant,
  onClick,
  style,
  className
}) => {
  return (
    <Button
      className={cn(
        "min-w-[120px] transition-all duration-300",
        variant === 'yes' 
          ? "bg-primary hover:bg-primary/90 text-white" 
          : "bg-secondary hover:bg-secondary/90 text-black",
        className
      )}
      style={style}
      onClick={onClick}
    >
      {variant === 'yes' ? 'Sim' : 'Não'}
    </Button>
  );
};

export default ProposalButton;
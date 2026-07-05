import React from 'react';
import { Loader2 } from 'lucide-react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-primary to-accent text-white border-transparent shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:brightness-110 active:brightness-95',
  secondary:
    'bg-gradient-to-r from-secondary to-accent text-white border-transparent shadow-lg shadow-secondary/20 hover:shadow-secondary/40 hover:brightness-110 active:brightness-95',
  outline:
    'bg-transparent text-foreground border-border hover:border-primary/50 hover:text-primary hover:bg-primary/5',
  ghost:
    'bg-transparent text-foreground/80 border-transparent hover:bg-white/5 hover:text-foreground',
};

const sizeClasses: Record<Size, string> = {
  sm: 'h-8 px-3.5 text-xs rounded-lg gap-1.5',
  md: 'h-10 px-5 text-sm rounded-xl gap-2',
  lg: 'h-12 px-7 text-base rounded-xl gap-2.5',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading = false, disabled, className = '', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={[
          'inline-flex items-center justify-center font-semibold border transition-all duration-200 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 disabled:opacity-50 disabled:cursor-not-allowed',
          variantClasses[variant],
          sizeClasses[size],
          className,
        ].join(' ')}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Caricamento...</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

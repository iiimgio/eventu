import React from 'react';
import { Loader2 } from 'lucide-react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'white';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-primary hover:bg-primary-hover text-white border-transparent shadow-[0_10px_30px_-12px_rgba(139,92,246,0.45)] transition-all',
  secondary:
    'bg-secondary hover:bg-border/70 text-foreground border-transparent transition-colors',
  outline:
    'bg-[#14141c] text-foreground border-border hover:border-primary/50 hover:bg-[#1b1b24] transition-colors',
  ghost:
    'bg-transparent text-foreground/80 border-transparent hover:bg-white/5 hover:text-foreground transition-colors',
  white:
    'bg-white/95 text-primary hover:bg-white border-transparent shadow-[0_8px_24px_-10px_rgba(255,255,255,0.35)] transition-all',
};

const sizeClasses: Record<Size, string> = {
  sm: 'h-8 px-3.5 text-xs rounded-full gap-1.5',
  md: 'h-10 px-5 text-sm rounded-full gap-2',
  lg: 'h-12 px-7 text-base rounded-full gap-2.5',
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

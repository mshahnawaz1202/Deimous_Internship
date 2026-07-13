import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type Variant = 'primary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  disabled?: boolean;
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  'aria-label'?: string;
}

const SIZE_CLASSES: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
};

function getVariantStyle(variant: Variant): React.CSSProperties {
  switch (variant) {
    case 'primary':
      return {
        background: 'var(--primary)',
        color: 'var(--primary-fg)',
        border: '1.5px solid transparent',
      };
    case 'ghost':
      return {
        background: 'transparent',
        color: 'var(--text)',
        border: '1.5px solid var(--border)',
      };
    case 'danger':
      return {
        background: 'var(--danger)',
        color: '#fff',
        border: '1.5px solid transparent',
      };
  }
}

/**
 * Reusable button with three variants, three sizes,
 * loading state, and Framer Motion hover/tap animations.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  children,
  onClick,
  type = 'button',
  className = '',
  'aria-label': ariaLabel,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      whileHover={!isDisabled ? { scale: 1.02, y: -1 } : {}}
      whileTap={!isDisabled  ? { scale: 0.97 }         : {}}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      aria-label={ariaLabel}
      aria-disabled={isDisabled}
      aria-busy={loading}
      className={`
        inline-flex items-center justify-center gap-2
        rounded-xl font-semibold
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
        ${SIZE_CLASSES[size]}
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      style={{
        ...getVariantStyle(variant),
        fontFamily: 'inherit',
        /* Transition colours but NOT transform (let Framer handle that) */
        transition: 'background-color 0.2s ease, border-color 0.2s ease, opacity 0.2s ease',
      }}
    >
      {loading ? (
        <>
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 0.75, repeat: Infinity, ease: 'linear' }}
            className="block w-4 h-4 rounded-full border-2 border-current border-t-transparent"
            aria-hidden="true"
          />
          {children}
        </>
      ) : (
        children
      )}
    </motion.button>
  );
}

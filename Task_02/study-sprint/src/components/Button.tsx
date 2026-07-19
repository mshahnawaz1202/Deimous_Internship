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
        background: 'var(--primary-gradient)',
        color: 'var(--primary-fg)',
        border: '1px solid transparent',
      };
    case 'ghost':
      return {
        background: 'rgba(255, 255, 255, 0.02)',
        color: 'var(--text)',
        border: '1px solid var(--border)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      };
    case 'danger':
      return {
        background: 'var(--danger-gradient)',
        color: '#FFFFFF',
        border: '1px solid transparent',
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
      whileHover={!isDisabled ? { scale: 1.015, y: -0.5 } : {}}
      whileTap={!isDisabled  ? { scale: 0.98 }         : {}}
      transition={{ type: 'spring', stiffness: 450, damping: 25 }}
      aria-label={ariaLabel}
      aria-disabled={isDisabled}
      aria-busy={loading}
      className={`
        inline-flex items-center justify-center gap-2
        rounded-xl font-semibold
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
        ${SIZE_CLASSES[size]}
        ${isDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
        ${variant === 'primary' ? 'shadow-[0_4px_12px_rgba(99,102,241,0.15)] dark:shadow-[0_4px_16px_rgba(139,92,246,0.2)] hover:shadow-[0_6px_20px_rgba(99,102,241,0.3)] dark:hover:shadow-[0_6px_24px_rgba(139,92,246,0.35)]' : ''}
        ${className}
      `}
      style={{
        ...getVariantStyle(variant),
        fontFamily: 'inherit',
        /* Transition colours but NOT transform (let Framer handle that) */
        transition: 'background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease',
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

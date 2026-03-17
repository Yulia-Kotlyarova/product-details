import {
  forwardRef,
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  iconOnly?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      startAdornment,
      endAdornment,
      iconOnly = false,
      fullWidth = false,
      loading = false,
      disabled = false,
      className,
      type = 'button',
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={[
          styles.button,
          styles[`variant_${variant}`],
          styles[`size_${size}`],
          iconOnly ? styles.iconOnly : '',
          fullWidth ? styles.fullWidth : '',
          loading ? styles.loading : '',
          className ?? '',
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        {loading ? (
          <span className={styles.loader} aria-hidden="true" />
        ) : (
          <>
            {startAdornment && (
              <span className={styles.adornment}>{startAdornment}</span>
            )}

            {!iconOnly && <span className={styles.content}>{children}</span>}

            {endAdornment && (
              <span className={styles.adornment}>{endAdornment}</span>
            )}

            {iconOnly && (
              <span className={styles.iconOnlyContent}>{children}</span>
            )}
          </>
        )}
      </button>
    );
  },
);

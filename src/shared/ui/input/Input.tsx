import {
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
  useId,
} from 'react';
import styles from './Input.module.css';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  fullWidth?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      startAdornment,
      endAdornment,
      fullWidth = true,
      className,
      id,
      disabled,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div
        className={[
          styles.root,
          fullWidth ? styles.fullWidth : '',
          disabled ? styles.disabled : '',
          error ? styles.hasError : '',
          className ?? '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {label ? (
          <label className={styles.label} htmlFor={inputId}>
            {label}
          </label>
        ) : null}

        <div className={styles.field}>
          {startAdornment ? (
            <div className={styles.startAdornment}>{startAdornment}</div>
          ) : null}

          <input
            ref={ref}
            id={inputId}
            className={[
              styles.input,
              startAdornment ? styles.inputWithStartAdornment : '',
              endAdornment ? styles.inputWithEndAdornment : '',
            ]
              .filter(Boolean)
              .join(' ')}
            disabled={disabled}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${inputId}-error` : undefined}
            {...props}
          />

          {endAdornment ? (
            <div className={styles.endAdornment}>{endAdornment}</div>
          ) : null}
        </div>

        {error ? (
          <span id={`${inputId}-error`} className={styles.error}>
            {error}
          </span>
        ) : null}
      </div>
    );
  },
);

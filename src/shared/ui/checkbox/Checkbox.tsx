import {
  forwardRef,
  type InputHTMLAttributes,
  useId,
} from 'react';
import styles from './Checkbox.module.css';

export type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type'
> & {
  label?: string;
  description?: string;
  error?: string;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, error, id, className, disabled, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div
        className={[
          styles.root,
          disabled ? styles.disabled : '',
          error ? styles.hasError : '',
          className ?? '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <label className={styles.labelWrapper} htmlFor={inputId}>
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            className={styles.input}
            disabled={disabled}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${inputId}-error` : undefined}
            {...props}
          />

          <span className={styles.control} aria-hidden="true" />

          {(label || description) && (
            <span className={styles.textContent}>
              {label && <span className={styles.label}>{label}</span>}
              {description && (
                <span className={styles.description}>{description}</span>
              )}
            </span>
          )}
        </label>

        {error ? (
          <span id={`${inputId}-error`} className={styles.error}>
            {error}
          </span>
        ) : null}
      </div>
    );
  },
);

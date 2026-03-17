import styles from './ProductRating.module.css';

interface ProductRatingProps {
  value: number;
}

export const ProductRating = ({ value }: ProductRatingProps) => {
  const isLowRating = value < 3;

  return (
    <span className={isLowRating ? styles.low : styles.normal}>
      {value}
    </span>
  );
};

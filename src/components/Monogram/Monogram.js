import { forwardRef, useId } from 'react';
import { classes } from 'utils/style';
import styles from './Monogram.module.css';

export const Monogram = forwardRef(({ highlight, className, ...props }, ref) => {
  const id = useId();
  const clipId = `${id}monogram-clip`;

  return (
    <svg
      aria-hidden
      className={classes(styles.monogram, className)}
      width="46"
      height="46"
      viewBox="0 0 46 46"
      ref={ref}
      {...props}
    >
      <defs>
        <clipPath id={clipId}>
          <path d="M 26.244 29.16 L 29.16 29.16 C 31.104 29.16 33.048 28.08 34.02 24.84 V 22.68 C 33.696 21.6 33.372 21.6 33.048 21.6 H 32.076 C 29.16 21.6 29.16 22.68 29.16 22.68 V 24.84 C 29.16 24.12 29.16 23.76 29.16 22.68 C 29.16 23.76 28.188 24.84 27.216 25.92 C 25.272 27 24.3 27 22.356 25.92 C 14.58 22.68 12.636 12.96 22.356 4.32 C 23.328 3.24 25.272 3.24 26.244 3.24 C 27.216 3.24 28.188 4.32 28.188 4.32 C 30.132 6.48 34.992 7.56 34.02 4.32 L 34.02 4.32 C 33.048 2.16 32.076 0 29.16 0 c -2.3008 0 -4.86 0 -7.1608 0 a 0.9061 0.8155 90 0 0 0 29.16 z z" />
        </clipPath>
      </defs>

      {highlight && (
        <g clipPath={`url(#${clipId})`}>
          <rect className={styles.highlight} width="100%" height="100%" />
        </g>
      )}
      <rect className={styles.customColor} clipPath={`url(#${clipId})`} width="100%" height="100%" />
    </svg>
  );
});

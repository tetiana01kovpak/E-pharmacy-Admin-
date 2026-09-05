export default function Icon({ name, className, size = 20, ...rest }) {
  return (
    <svg
      className={['icon', className].filter(Boolean).join(' ')}
      width={size}
      height={size}
      aria-hidden="true"
      {...rest}
    >
      <use href={`/icons/sprite.svg#icon-${name}`} />
    </svg>
  );
}

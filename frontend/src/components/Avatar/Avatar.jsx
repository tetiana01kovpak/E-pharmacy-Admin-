import styles from './Avatar.module.css';

const PALETTE = ['#59B17A', '#4C8CE0', '#E0A64C', '#E06B9C', '#8C6CE0', '#4CB8B1'];

function getInitials(name = '') {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function getColor(name = '') {
  const sum = [...name].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return PALETTE[sum % PALETTE.length];
}

export default function Avatar({ name, size = 36, className }) {
  return (
    <span
      className={[styles.avatar, className].filter(Boolean).join(' ')}
      style={{ width: size, height: size, background: getColor(name), fontSize: size * 0.36 }}
      title={name}
    >
      {getInitials(name)}
    </span>
  );
}

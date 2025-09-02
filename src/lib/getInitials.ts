export function getInitials(name: string): string {
  if (!name) return '';
  // Split by space, hyphen, or apostrophe, filter empty, and map to first letter
  const parts = name
    .trim()
    .split(/[\s\-']+/)
    .filter(Boolean);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0][0].toUpperCase();
  // Take first letter of first and last part
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

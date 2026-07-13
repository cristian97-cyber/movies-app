export function formatDuration(durationMinutes: number | null) {
  if (!durationMinutes || durationMinutes <= 0) {
    return null;
  }

  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;

  if (hours === 0) {
    return `${minutes}m`;
  }

  return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
}

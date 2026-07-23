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

export function formatLanguage(languageCode: string) {
  if (!languageCode) {
    return "Non disponibile";
  }

  try {
    return (
      new Intl.DisplayNames(["it"], { type: "language" }).of(languageCode) ??
      languageCode.toUpperCase()
    );
  } catch {
    return languageCode.toUpperCase();
  }
}

export function formatMediaStatus(status: string) {
  if (!status) {
    return "Non disponibile";
  }

  const statuses: Record<string, string> = {
    Canceled: "Cancellato",
    Ended: "Terminata",
    "In Production": "In produzione",
    Pilot: "Episodio pilota",
    Planned: "Pianificato",
    "Post Production": "In post-produzione",
    Released: "Distribuito",
    "Returning Series": "In corso",
    Rumored: "Non confermato",
  };

  return statuses[status] ?? status;
}

export function formatLocalDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

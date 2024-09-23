export function formatDate(dateString: string | Date | undefined): string {
  if (!dateString) return ''; // Handle undefined or empty dates
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
  };
  const formattedDate = date.toLocaleDateString("es-ES", options);
  const capitalizedMonth = formattedDate.replace(/\b(\w)/g, (match) => match.toUpperCase());
  return capitalizedMonth;
}

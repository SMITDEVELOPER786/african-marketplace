export function addToCalendar(reservation: {
  restaurant: string
  date: string
  time: string
  guests: number
  address: string
  phone: string
}) {
  // Create iCalendar format
  const startDate = new Date(`${reservation.date}T${reservation.time}:00`)
  const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000) // Add 2 hours

  const formatDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
  }

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//AfroMarket//Reservation//FR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `DTSTART:${formatDate(startDate)}`,
    `DTEND:${formatDate(endDate)}`,
    `SUMMARY:Réservation - ${reservation.restaurant}`,
    `DESCRIPTION:Réservation pour ${reservation.guests} personne(s) chez ${reservation.restaurant}.\\nAdresse: ${reservation.address}\\nTéléphone: ${reservation.phone}`,
    `LOCATION:${reservation.address}`,
    "STATUS:CONFIRMED",
    "BEGIN:VALARM",
    "TRIGGER:-PT1H",
    "ACTION:DISPLAY",
    "DESCRIPTION:Rappel: Réservation dans 1 heure",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n")

  // Create blob and download
  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `reservation-${reservation.restaurant.replace(/\s+/g, "-")}-${reservation.date}.ics`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

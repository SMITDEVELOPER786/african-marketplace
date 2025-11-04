export function exportToPDF(data: any[], filename: string, title: string) {
  // Create a simple HTML table for PDF export
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${title}</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        h1 { color: #333; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        th { background-color: #f4f4f4; font-weight: bold; }
        tr:nth-child(even) { background-color: #f9f9f9; }
      </style>
    </head>
    <body>
      <h1>${title}</h1>
      <p>Généré le ${new Date().toLocaleDateString("fr-FR")}</p>
      ${generateTableHTML(data)}
    </body>
    </html>
  `

  const blob = new Blob([htmlContent], { type: "text/html" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `${filename}.html`
  link.click()
  URL.revokeObjectURL(url)
}

export function exportToExcel(data: any[], filename: string) {
  if (data.length === 0) return

  // Convert data to CSV format
  const headers = Object.keys(data[0])
  const csvContent = [
    headers.join(","),
    ...data.map((row) =>
      headers
        .map((header) => {
          const value = row[header]
          // Escape commas and quotes
          if (typeof value === "string" && (value.includes(",") || value.includes('"'))) {
            return `"${value.replace(/"/g, '""')}"`
          }
          return value
        })
        .join(","),
    ),
  ].join("\n")

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `${filename}.csv`
  link.click()
  URL.revokeObjectURL(url)
}

export function exportToWord(data: any[], filename: string, title: string) {
  const htmlContent = `
    <!DOCTYPE html>
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word'>
    <head>
      <meta charset='utf-8'>
      <title>${title}</title>
    </head>
    <body>
      <h1>${title}</h1>
      <p>Généré le ${new Date().toLocaleDateString("fr-FR")}</p>
      ${generateTableHTML(data)}
    </body>
    </html>
  `

  const blob = new Blob([htmlContent], { type: "application/msword" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `${filename}.doc`
  link.click()
  URL.revokeObjectURL(url)
}

function generateTableHTML(data: any[]): string {
  if (data.length === 0) return "<p>Aucune donnée à afficher</p>"

  const headers = Object.keys(data[0])
  return `
    <table>
      <thead>
        <tr>
          ${headers.map((h) => `<th>${h}</th>`).join("")}
        </tr>
      </thead>
      <tbody>
        ${data
          .map(
            (row) => `
          <tr>
            ${headers.map((h) => `<td>${row[h] || ""}</td>`).join("")}
          </tr>
        `,
          )
          .join("")}
      </tbody>
    </table>
  `
}

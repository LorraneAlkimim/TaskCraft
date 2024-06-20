export function formatDate(date) {
  const newDate = new Date(date);

  return new Date(newDate)
    .toLocaleDateString("pt-BR", {
      dateStyle: "medium",
    })
    .replace(/()\.|de\b/g, "")
    .split(" ")
    .filter(Boolean)
    .join(" ");
}

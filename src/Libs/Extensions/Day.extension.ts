export const day = (timestamp: string) => {
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).replace(/\//g, "-");
  return formattedDate;
};




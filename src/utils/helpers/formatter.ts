export const formatRuntime = (runtime: number) => {
  const horas = Math.floor(runtime / 60);
  const minutos = runtime % 60;
  return `${horas}h ${minutos}min`;
};

export const formatDateBR = (date: string) => {
  const d = new Date(date);
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

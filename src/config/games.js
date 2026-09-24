export const games = [
  { slug: "bingo-invitados", name: "Invitados" },
  { slug: "bingo-canciones", name: "Canciones" },
  { slug: "busqueda-del-tesoro", name: "Tesoro" },
];

export function getGameBySlug(slug) {
  return games.find((game) => game.slug === slug) ?? null;
}

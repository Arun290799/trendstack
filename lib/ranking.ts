export function calculateScore(stars: number = 0, forks: number = 0, comments: number = 0): number {
  return stars + (forks * 2) + (comments * 3);
}

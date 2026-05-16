export function getMbtiCategoryIndex(value: string): number {
  if (value === "E" || value === "I") return 0;
  if (value === "S" || value === "N") return 1;
  if (value === "T" || value === "F") return 2;
  return 3;
}

const bikeCategory = ["Mountain", "Hybrid", "Electric", "Sport"];

export const categoryOptions = bikeCategory.map((item) => ({
  label: item,
  value: item,
}));

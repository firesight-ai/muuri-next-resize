const types = ["Account", "Monthly Budget", "Goals"];

export const generateItems = (amount = 9) =>
  Array(amount)
    .fill()
    .map((_, id) => ({
      id,
      type: types[id % types.length]
    }));

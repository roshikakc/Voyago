export function knapsackSelect(
  items = [],
  totalBudget = 0,
  maxActivities = Infinity
) {
  if (!Array.isArray(items)) return [];

  const candidates = items.map(i => ({ ...i }));

  const zeroCost = candidates
    .filter(i => !i.cost || i.cost === 0)
    .sort((a, b) => (b.score || 0) - (a.score || 0));

  const paid = candidates.filter(i => i.cost && i.cost > 0);

  const selected = [];
  let usedBudget = 0;

  //  Take free activities first (best score first)
  for (const z of zeroCost) {
    if (selected.length < maxActivities) {
      selected.push(z);
    }
  }

  // Sort paid by value (score per cost)
  paid.sort((a, b) => {
    const da = (a.score || 0) / (a.cost || 1);
    const db = (b.score || 0) / (b.cost || 1);
    if (db === da) return (b.score || 0) - (a.score || 0);
    return db - da;
  });

  //  Add paid activities within budget & count
  for (const p of paid) {
    if (
      usedBudget + p.cost <= totalBudget &&
      selected.length < maxActivities
    ) {
      selected.push(p);
      usedBudget += p.cost;
    }
  }

  //  Return best-first
  return selected.sort(
    (a, b) => (b.score || 0) - (a.score || 0)
  );
}

export function estimateCostFromTags(tags = []) {
  const t = (tags || []).join("").toLowerCase();
  if (!t) return 100;
  if (t.includes("museum")) return 1000;
  if (t.includes("temple") || t.includes("stupa") || t.includes("religion")) return 500;
  if (t.includes("park")) return 0;
  if (t.includes("viewpoint") || t.includes("hill")) return 100;
  if (t.includes("hiking") || t.includes("trail")) return 200;
  if (t.includes("palace") || t.includes("gallery")) return 500;
  if (t.includes("amusement")) return 1200;
  if (t.includes("castle")) return 800;
  if (t.includes("zoo")) return 600;
  if (t.includes("garden")) return 300;
  if (t.includes("beach")) return 0;
  if (t.includes("theme_park")) return 1500;
  if (t.includes("monument")) return 400;
  if (t.includes("historic")) return 500;
  return 200;
}

// export function estimateDurationFromTags(tags = []) {
//   const t = (tags || []).join(" ").toLowerCase();
//   if (t.includes("museum")) return 3;
//   if (t.includes("hiking") || t.includes("trail")) return 6;
//   if (t.includes("park")) return 2;
//   if (t.includes("temple")) return 1;
//   if (t.includes("viewpoint")) return 2;
//   return 2;
// }

export function estimateActivities(list = []) {
  return list.map(a => {
    const cost = a.cost != null ? a.cost : estimateCostFromTags(a.tags);
    return { ...a, cost: Math.max(0, Math.round(cost)) };
  });
}
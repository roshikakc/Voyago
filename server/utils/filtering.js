export function computeScore(activity, interests = []) {
    const tags = (activity.tags || []).map(t => (t || "").toLowerCase());
    let score = 0;
    for (const i of interests) {
        for (const t of tags) {
            if (t.includes(i)) score += 3;
        }
    }

    if (tags.some(t => t.includes("museum"))) score += 1;
    if (tags.some(t => t.includes("heritage") || t.includes("landmark"))) score += 0.8;
    return score;
}

export function applyFiltering(list = [], interests = []) {
    const normInterests = interests
    .map(i => i.toLowerCase().trim())
    .filter(Boolean);

    return list
    .map(a => ({ ...a, score: computeScore(a, normInterests) }))
    .sort((x, y) => y.score - x.score);
}
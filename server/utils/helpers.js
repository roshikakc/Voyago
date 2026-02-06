export function parseCities(cityField){
    if(!cityField) return [];
    return cityField.split(",").map(c=> c.trim()).filter(Boolean);
}
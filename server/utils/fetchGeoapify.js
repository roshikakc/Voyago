import fetch from "node-fetch";

/** fetch
 *  returns array of name, location,cost, duration */

export async function fetchPOIsGeoapify(lat, lon, categories = [], text = "") {
  if (!lat || !lon) {
    console.error("Missing lat/lon", { lat, lon });
    return [];
  }

  const KEY = process.env.GEOAPIFY_API_KEY;

  const categoryParam =
    categories.length > 0 ? `&categories=${categories.join(",")}` : "";

  const textParam = text ? `&text=${encodeURIComponent(text)}` : "";

  const url = `https://api.geoapify.com/v2/places?lat=${lat}&lon=${lon}&radius=5000&limit=50${categoryParam}${textParam}&apiKey=${KEY}`;

  console.log("Geoapify URL:", url);

  const response = await fetch(url);

  if (!response.ok) {
    console.error("Geoapify response not ok:", response.status);
    return [];
  }

  const data = await response.json();
  return data.features || [];
}

import fetch from "node-fetch";

// ============================================
// WIKIPEDIA IMAGE (BEST FOR DESTINATIONS)
// ============================================
export async function getWikiImage(query) {
    try {
        const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;
        const res = await fetch(url);

        if (!res.ok) return null;

        const data = await res.json();
        return data.thumbnail?.source || null;
    } catch (err) {
        console.error("Wikipedia image error:", err);
        return null;
    }
}


// ============================================
// DUCKDUCKGO IMAGE SEARCH (NO API KEY)
// ============================================
export async function duckduckgoImage(query) {
    try {
        const searchUrl = `https://duckduckgo.com/?q=${encodeURIComponent(query)}&iax=images&ia=images`;
        const searchRes = await fetch(searchUrl);
        const searchHTML = await searchRes.text();

        const tokenMatch = searchHTML.match(/vqd='([^']+)'/);

        if (!tokenMatch) return null;

        const vqd = tokenMatch[1];

        const apiUrl = `https://duckduckgo.com/i.js?l=us-en&o=json&q=${encodeURIComponent(query)}&vqd=${vqd}`;
        const imgRes = await fetch(apiUrl);
        const data = await imgRes.json();

        return data?.results?.[0]?.image || null;
    } catch (err) {
        console.error("DuckDuckGo image error:", err);
        return null;
    }
}


// ============================================
// PIXABAY FALLBACK (OPTIONAL FREE KEY)
// ============================================
export async function pixabayImage(query) {
    try {
        if (!process.env.PIXABAY_KEY) return null;

        const url = `https://pixabay.com/api/?key=${process.env.PIXABAY_KEY}&q=${encodeURIComponent(query)}&image_type=photo`;
        const res = await fetch(url);
        const data = await res.json();
        return data.hits?.[0]?.largeImageURL || null;
    } catch (err) {
        console.error("Pixabay error:", err);
        return null;
    }
}


// ============================================
// MAIN DESTINATION IMAGE FETCHER
// ============================================
export async function getBestImage(query) {
    let img;

    img = await getWikiImage(query);
    if (img) return img;

    img = await duckduckgoImage(query);
    if (img) return img;

    img = await pixabayImage(query);
    if (img) return img;

    return null;
}


// ============================================
// HOTEL IMAGE FETCHER
// ============================================
export async function getBestHotelImage(name) {
    let img;

    img = await duckduckgoImage(`${name} hotel`);
    if (img) return img;

    img = await pixabayImage(`${name} hotel`);
    if (img) return img;

    return null;
}

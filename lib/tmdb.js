// lib/tmdb.js
const BASE_URL = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const API_KEY  = process.env.TMDB_API_KEY;

/** 人気映画を取得して配列を返す（サーバー専用） */
export async function fetchPopularMovies(lang = "ja-JP", page = 1) {
    const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=${lang}&page=${page}`;

    const res = await fetch(url);
    if (!res.ok) {
        const detail = await res.text();
        throw new Error(`TMDB 取得失敗 (${res.status}): ${detail}`);
    }

    const { results } = await res.json();
    return results;
}

/** 映画の詳細情報を取得（サーバー専用） */
export async function fetchMovieDetails(movieId, lang = "ja-JP") {
    const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=${lang}&append_to_response=credits,videos`;

    const res = await fetch(url);
    if (!res.ok) {
        const detail = await res.text();
        throw new Error(`映画詳細取得失敗 (${res.status}): ${detail}`);
    }

    return res.json();
}

/** 画像URLを生成 */
export function getImageUrl(path, size = "w500") {
    if (!path) return null;
    return `https://image.tmdb.org/t/p/${size}${path}`;
}
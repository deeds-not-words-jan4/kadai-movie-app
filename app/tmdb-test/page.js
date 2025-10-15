// app/tmdb-test/page.js
import { fetchPopularMovies, getImageUrl } from "@/lib/tmdb";
import Image from "next/image";
import Link from "next/link";
import "./styles.css";

export const metadata = { title: "人気映画一覧 | Kadai App" };

export default async function TmdbTestPage() {
  const movies = await fetchPopularMovies();

  return (
    <main style={{ padding: "1.5rem", maxWidth: "1400px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem", textAlign: "center" }}>
        人気映画一覧
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "2rem",
        }}
      >
        {movies.map((movie) => (
          <Link
            key={movie.id}
            href={`/tmdb-test/${movie.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              className="movie-card"
              style={{
                backgroundColor: "white",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
            >
              {/* ポスター画像 */}
              <div style={{ position: "relative", width: "100%", height: "420px", backgroundColor: "#e5e7eb" }}>
                {movie.poster_path ? (
                  <Image
                    src={getImageUrl(movie.poster_path, "w500")}
                    alt={movie.title}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#9ca3af",
                      fontSize: "0.875rem",
                    }}
                  >
                    画像なし
                  </div>
                )}
              </div>

            {/* カード情報 */}
            <div style={{ padding: "1.25rem" }}>
              {/* タイトル */}
              <h2
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "700",
                  marginBottom: "0.75rem",
                  minHeight: "3.5rem",
                  lineHeight: "1.4",
                  color: "#1f2937",
                }}
              >
                {movie.title}
              </h2>

              {/* 公開日 */}
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "#6b7280",
                  marginBottom: "0.5rem",
                }}
              >
                📅 {movie.release_date || "公開日未定"}
              </p>

              {/* 評価 */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {[...Array(5)].map((_, index) => {
                    const rating = movie.vote_average / 2;
                    const isFilled = index < Math.floor(rating);
                    const isHalf = !isFilled && index < Math.ceil(rating);

                    return (
                      <span
                        key={index}
                        style={{
                          fontSize: "1.25rem",
                          color: isFilled || isHalf ? "#fbbf24" : "#d1d5db",
                        }}
                      >
                        {isFilled ? "★" : isHalf ? "★" : "☆"}
                      </span>
                    );
                  })}
                </div>
                <span
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    color: "#374151",
                  }}
                >
                  {movie.vote_average.toFixed(1)}
                </span>
              </div>
            </div>
            </div>
          </Link>
        ))}
      </div>

      {movies.length === 0 && (
        <p style={{ textAlign: "center", color: "#6b7280", marginTop: "3rem" }}>
          映画が見つかりませんでした。
        </p>
      )}
    </main>
  );
}

// app/tmdb-test/[id]/page.js
import { fetchMovieDetails, fetchPopularMovies, getImageUrl } from "@/lib/tmdb";
import Image from "next/image";
import Link from "next/link";
import BackButton from "@/app/components/BackButton";

// 静的生成用のパラメータを生成
export async function generateStaticParams() {
  const movies = await fetchPopularMovies('ja-JP', 1);
  return movies.slice(0, 20).map((movie) => ({
    id: movie.id.toString(),
  }));
}

export async function generateMetadata({ params }) {
  const movie = await fetchMovieDetails(params.id);
  return {
    title: `${movie.title} | Kadai Movie App`,
    description: movie.overview || "映画の詳細情報",
  };
}

export default async function MovieDetailPage({ params }) {
  let movie = null;
  let error = null;

  try {
    movie = await fetchMovieDetails(params.id);
  } catch (err) {
    error = err.message;
  }

  if (error) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem", color: "#ef4444", marginBottom: "1rem" }}>
          ⚠️ エラーが発生しました
        </h1>
        <p style={{ color: "#666", marginBottom: "2rem" }}>{error}</p>
        <Link
          href="/tmdb-test"
          style={{
            display: "inline-block",
            padding: "0.75rem 1.5rem",
            backgroundColor: "#0070f3",
            color: "white",
            textDecoration: "none",
            borderRadius: "8px",
          }}
        >
          映画一覧に戻る
        </Link>
      </div>
    );
  }

  if (!movie) {
    return <div style={{ padding: "2rem" }}>読み込み中...</div>;
  }

  // 上映時間を時間と分に変換
  const hours = Math.floor(movie.runtime / 60);
  const minutes = movie.runtime % 60;
  const runtimeText = movie.runtime ? `${hours}時間${minutes}分` : "不明";

  // 主要キャスト（最大6人）
  const cast = movie.credits?.cast?.slice(0, 6) || [];

  // 監督を取得
  const director = movie.credits?.crew?.find((person) => person.job === "Director");

  // 予告編動画（YouTube）
  const trailer = movie.videos?.results?.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#fafafa" }}>
      {/* 背景画像ヘッダー */}
      <div
        style={{
          position: "relative",
          width: "100%",
          minHeight: "500px",
          backgroundImage: movie.backdrop_path
            ? `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url(${getImageUrl(
                movie.backdrop_path,
                "original"
              )})`
            : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          padding: "2rem",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* 戻るボタン */}
          <BackButton />

          <div
            style={{
              display: "flex",
              gap: "2rem",
              marginTop: "2rem",
              flexWrap: "wrap",
            }}
          >
            {/* ポスター画像 */}
            <div
              style={{
                flexShrink: 0,
                width: "300px",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
              }}
            >
              {movie.poster_path ? (
                <Image
                  src={getImageUrl(movie.poster_path, "w500")}
                  alt={movie.title}
                  width={300}
                  height={450}
                  style={{ width: "100%", height: "auto", display: "block" }}
                  priority
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "450px",
                    backgroundColor: "#374151",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  画像なし
                </div>
              )}
            </div>

            {/* 基本情報 */}
            <div style={{ flex: 1, minWidth: "300px" }}>
              <h1
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                  lineHeight: 1.2,
                }}
              >
                {movie.title}
              </h1>
              <p style={{ fontSize: "1.25rem", opacity: 0.8, marginBottom: "1.5rem" }}>
                {movie.original_title}
              </p>

              {/* メタ情報 */}
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  flexWrap: "wrap",
                  marginBottom: "1.5rem",
                  fontSize: "1rem",
                }}
              >
                <span>📅 {movie.release_date || "公開日未定"}</span>
                <span>⏱️ {runtimeText}</span>
              </div>

              {/* ジャンル */}
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
                {movie.genres?.map((genre) => (
                  <span
                    key={genre.id}
                    style={{
                      padding: "0.25rem 0.75rem",
                      backgroundColor: "rgba(255,255,255,0.2)",
                      borderRadius: "20px",
                      fontSize: "0.875rem",
                    }}
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              {/* 評価 */}
              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  {[...Array(5)].map((_, index) => {
                    const rating = movie.vote_average / 2;
                    const isFilled = index < Math.floor(rating);
                    return (
                      <span
                        key={index}
                        style={{
                          fontSize: "1.5rem",
                          color: isFilled ? "#fbbf24" : "rgba(255,255,255,0.3)",
                        }}
                      >
                        ★
                      </span>
                    );
                  })}
                  <span style={{ fontSize: "1.25rem", fontWeight: "bold", marginLeft: "0.5rem" }}>
                    {movie.vote_average.toFixed(1)}
                  </span>
                  <span style={{ fontSize: "0.875rem", opacity: 0.7 }}>
                    ({movie.vote_count.toLocaleString()} 票)
                  </span>
                </div>
              </div>

              {/* 監督 */}
              {director && (
                <div style={{ marginBottom: "1rem" }}>
                  <strong>監督:</strong> {director.name}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        {/* あらすじ */}
        <section style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "1.75rem",
              fontWeight: "bold",
              marginBottom: "1rem",
              color: "#1f2937",
            }}
          >
            あらすじ
          </h2>
          <p style={{ fontSize: "1.125rem", lineHeight: 1.8, color: "#4b5563" }}>
            {movie.overview || "あらすじ情報がありません。"}
          </p>
        </section>

        {/* キャスト */}
        {cast.length > 0 && (
          <section style={{ marginBottom: "3rem" }}>
            <h2
              style={{
                fontSize: "1.75rem",
                fontWeight: "bold",
                marginBottom: "1.5rem",
                color: "#1f2937",
              }}
            >
              キャスト
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {cast.map((person) => (
                <div key={person.id} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: "150px",
                      height: "150px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      margin: "0 auto 0.75rem",
                      backgroundColor: "#e5e7eb",
                    }}
                  >
                    {person.profile_path ? (
                      <Image
                        src={getImageUrl(person.profile_path, "w185")}
                        alt={person.name}
                        width={150}
                        height={150}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "3rem",
                          color: "#9ca3af",
                        }}
                      >
                        👤
                      </div>
                    )}
                  </div>
                  <p style={{ fontWeight: "600", color: "#1f2937", marginBottom: "0.25rem" }}>
                    {person.name}
                  </p>
                  <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>{person.character}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 予告編 */}
        {trailer && (
          <section style={{ marginBottom: "3rem" }}>
            <h2
              style={{
                fontSize: "1.75rem",
                fontWeight: "bold",
                marginBottom: "1.5rem",
                color: "#1f2937",
              }}
            >
              予告編
            </h2>
            <div
              style={{
                position: "relative",
                paddingBottom: "56.25%",
                height: 0,
                overflow: "hidden",
                borderRadius: "12px",
              }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="予告編"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: "none",
                }}
              />
            </div>
          </section>
        )}

        {/* 戻るボタン（下部） */}
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <BackButton />
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        Kadai App
      </h1>
      <p style={{ marginBottom: '1.5rem', color: '#666' }}>
        TMDB API を使った映画アプリです。
      </p>
      <div>
        <a
          href="/tmdb-test"
          style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#0070f3',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: '500',
          }}
        >
          人気映画を見る →
        </a>
      </div>
    </main>
  );
}


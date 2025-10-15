import './globals.css';

export const metadata = {
  title: 'Kadai App',
  description: 'TMDB API を使った映画アプリ',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>
        {children}
      </body>
    </html>
  );
}


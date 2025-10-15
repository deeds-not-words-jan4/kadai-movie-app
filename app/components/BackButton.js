'use client';

import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    // ブラウザの履歴があるかチェック
    if (window.history.length > 1) {
      router.back(); // 履歴があれば前のページへ
    } else {
      // 履歴がない場合は映画一覧ページへ
      router.push('/tmdb-test');
    }
  };

  return (
    <button
      onClick={handleBack}
      style={{
        padding: '0.5rem 1rem',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        color: 'white',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '1rem',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        transition: 'all 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
      }}
    >
      ← 戻る
    </button>
  );
}


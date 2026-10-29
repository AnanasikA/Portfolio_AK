import Link from 'next/link';

export default function RootNotFound() {
  return (
    <html lang="pl">
      <body style={{ fontFamily: 'system-ui, sans-serif', display: 'grid', placeItems: 'center', minHeight: '100vh', margin: 0, textAlign: 'center' }}>
        <div>
          <h1>404</h1>
          <p>Tej strony nie ma.</p>
          <Link href="/pl">Wróć na stronę główną</Link>
        </div>
      </body>
    </html>
  );
}

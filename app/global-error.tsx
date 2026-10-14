"use client";

export default function GlobalError() {
  return (
    <html lang="en">
      <body>
        <main style={{ alignItems: "center", display: "flex", minHeight: "100svh", justifyContent: "center" }}>
          <div>
            <h1>Something went wrong</h1>
            <p>Please try again later.</p>
          </div>
        </main>
      </body>
    </html>
  );
}

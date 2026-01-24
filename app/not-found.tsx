import Link from "next/link";

export default function NotFound() {
  return (
    <section className="w-full max-w-2xl mx-5 flex flex-col items-center justify-center">
      <Link className="mt-[30%] no-underline" href="/">
        <h1>404 - Not Found</h1>
      </Link>
    </section>
  );
}

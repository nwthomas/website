import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bikes | Nathan Thomas",
  description: "Why I love bicycles—riding, fixing, and the freedom of two wheels.",
  metadataBase: new URL("https://www.nathanthomas.dev"),
  openGraph: {
    title: "Bikes",
    description: "Why I love bicycles—riding, fixing, and the freedom of two wheels.",
    url: "https://www.nathanthomas.dev/bikes",
    siteName: "Nathan Thomas",
    locale: "en_US",
    type: "website",
    images: [{ url: "/opengraph-image" }],
  },
};

export default function Page() {
  return (
    <section className="w-full max-w-2xl mx-5">
      <p>
        I really like bikes. Not in a casual “I should ride more” way—in a this-makes-me-happier, clearer-headed, and more
        connected to the world kind of way. Two wheels, a chain, and pedals turn an ordinary day into something that
        feels alive.
      </p>
      <h2 className="mt-5">What I love about them</h2>
      <ul className="mt-4">
        <li>
          <strong className="font-medium">Motion without noise.</strong> You hear wind, tires on pavement, birds, and
          your own breathing. It is the opposite of being sealed in a box.
        </li>
        <li>
          <strong className="font-medium">Honest effort.</strong> Hills do not care about your resume. You earn the
          downhill.
        </li>
        <li>
          <strong className="font-medium">Simple machines, deep rabbit holes.</strong> You can ride a bike forever
          without thinking about it—or spend a lifetime learning bearings, gearing, fit, and tires. Both are good.
        </li>
        <li>
          <strong className="font-medium">Cities open up.</strong> Short trips stop feeling like chores. Coffee, a
          friend, a sunset—you are already outside.
        </li>
      </ul>
      <h2 className="mt-5">The small rituals</h2>
      <p className="mt-4">
        Checking tire pressure. Oiling the chain after rain. The click of a good shifter. Rolling away from the curb
        when the light turns. These tiny habits add up to a life that feels less rushed and more intentional.
      </p>
      <h2 className="mt-5">If you are curious</h2>
      <p className="mt-4">
        You do not need the perfect bike to start—you need one that fits and a route you enjoy. I will keep writing
        elsewhere on this site about tech and work; this page is just here to say: bikes are wonderful, and I am glad
        they exist.
      </p>
      <p className="mt-5">
        <Link aria-label="Back to Nathan's home page" href="/">
          ← Home
        </Link>
      </p>
    </section>
  );
}

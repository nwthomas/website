export type Bookmark = {
  date: string;
  url: string;
  title: string;
};

export type Bookmarks = Array<Bookmark>;

export const BOOKMARKS: Bookmarks = [
  {
    date: "2026-01-12",
    title: "Backpressure in JavaScript: The Hidden Force Behind Streams, Fetch, and Async Code",
    url: "https://blog.gaborkoos.com/posts/2026-01-06-Backpressure-in-JavaScript-the-Hidden-Force-Behind-Streams-Fetch-and-Async-Code",
  },
  {
    date: "2026-01-09",
    title: "RTX 5090 + Raspberry Pi: Can it Game?",
    url: "https://scottjg.com/posts/2026-01-08-crappy-computer-showdown",
  },
  {
    date: "2026-01-08",
    title: "A Call for New Aesthetics",
    url: "https://newaesthetics.art",
  },
  {
    date: "2026-01-07",
    title: "How Rippling Raised a $45M Series A — Without a Pitch Deck",
    url: "https://www.rippling.com/blog/rippling-series-a-pitch-deck-and-memo",
  },
  {
    date: "2026-01-07",
    title: "Anthropic: Claude Code in Action",
    url: "https://anthropic.skilljar.com/claude-code-in-action",
  },
  {
    date: "2026-01-06",
    title: "Cloudflare: Trapping Misbehaving Bots in an AI Labyrinth",
    url: "https://blog.cloudflare.com/ai-labyrinth",
  },
  {
    date: "2026-01-05",
    title: "Databases in 2025: A Year in Review",
    url: "https://www.cs.cmu.edu/~pavlo/blog/2026/01/2025-databases-retrospective.html",
  },
  {
    date: "2026-01-05",
    title: "StackOverflow: The Great Unracking - Saying Goodbye to the Servers at Our Physical Datacenter",
    url: "https://stackoverflow.blog/2025/12/24/the-great-unracking-saying-goodbye-to-the-servers-at-our-physical-datacenter/",
  },
  {
    date: "2026-01-04",
    title: "Change Data Capture for DynamoDB Streams",
    url: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.html",
  },
  {
    date: "2026-01-04",
    title: "How uv Got So Fast",
    url: "https://nesbitt.io/2025/12/26/how-uv-got-so-fast.html",
  },
  {
    date: "2026-01-01",
    title: "Creating a Programming Language with Rust",
    url: "https://createlang.rs/intro.html",
  },
  {
    date: "2026-01-01",
    title: "Performance, Complexity, Killer Updates from Shopify Engineering",
    url: "https://www.shopify.com/news/performance%F0%9F%91%86-complexity%F0%9F%91%87-killer-updates-from-shopify-engineering",
  },
  {
    date: "2025-12-31",
    title: "Building an Internal Agent: Context Window Compaction",
    url: "https://lethain.com/agents-context-compaction",
  },
  {
    date: "2025-12-30",
    title: "LinkedIn: What Every Engineer Should Know About Real-Time Data's Unifying Abstraction",
    url: "https://engineering.linkedin.com/distributed-systems/log-what-every-software-engineer-should-know-about-real-time-datas-unifying",
  },
  {
    date: "2025-12-30",
    title: "Jimmy Bogard: Six Little Lines of Fail",
    url: "https://www.youtube.com/watch?v=VvUdvte1V3s",
  },
  {
    date: "2025-12-28",
    title: "MongoBleed Explained Simply",
    url: "https://bigdata.2minutestreaming.com/p/mongobleed-explained-simply",
  },
  {
    date: "2025-12-27",
    title: "OpenAI: Why We Built the Responses API",
    url: "https://developers.openai.com/blog/responses-api",
  },
  {
    date: "2025-12-25",
    title: "PostgreSQL is Enough",
    url: "https://gist.github.com/cpursley/c8fb81fe8a7e5df038158bdfe0f06dbb",
  },
  {
    date: "2025-12-24",
    title: "StackOverflow: 2025 Developer Survey",
    url: "https://survey.stackoverflow.co/2025",
  },
  {
    date: "2025-12-22",
    title: "How Discord Stores Trillions of Messages",
    url: "https://discord.com/blog/how-discord-stores-trillions-of-messages",
  },
  {
    date: "2025-12-21",
    title: "Clever Code",
    url: "https://www.pcloadletter.dev/blog/clever-code",
  },
  {
    date: "2025-12-19",
    title: "Full Text Search over Postgres: Elasticsearch vs. Alternatives",
    url: "https://www.paradedb.com/blog/elasticsearch-vs-postgres",
  },
  {
    date: "2025-12-19",
    title: "Clerk: Migrating from Pages Router to App Router",
    url: "https://clerk.com/blog/migrating-pages-router-to-app-router-an-incremental-guide",
  },
  {
    date: "2025-12-18",
    title: "Dan Abramov: Introducing RSC Explorer",
    url: "https://overreacted.io/introducing-rsc-explorer",
  },
  {
    date: "2025-12-18",
    title: "MIT: Enabling Small Language Models to Solve Complex Reasoning Tasks",
    url: "https://news.mit.edu/2025/enabling-small-language-models-solve-complex-reasoning-tasks-1212",
  },
  {
    date: "2025-12-17",
    title: "Meta: Collective Communication for 100k+ GPUs",
    url: "https://arxiv.org/pdf/2510.20171",
  },
  {
    date: "2025-12-17",
    title: "The Rust Programming Language",
    url: "https://doc.rust-lang.org/stable/book",
  },
  {
    date: "2025-12-17",
    title: "Rustlings",
    url: "https://rustlings.rust-lang.org/",
  },
  {
    date: "2025-12-16",
    title: "OWASP: Cross Site Scripting Prevention Cheat Sheet",
    url: "https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html",
  },
  {
    date: "2025-12-15",
    title: "Bitcoin Is Dead",
    url: "https://bitcoindeaths.com",
  },
  {
    date: "2025-12-14",
    title: "Anthropic: Effective Harnesses for Long-Running Agents",
    url: "https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents",
  },
  {
    date: "2025-12-12",
    title: "Do You Know How Much Your Computer Can Do in a Second?",
    url: "https://computers-are-fast.github.io/",
  },
  {
    date: "2025-12-11",
    title: "Server-Sent Events are Still Not Production-Ready After a Decade",
    url: "https://dev.to/miketalbot/server-sent-events-are-still-not-production-ready-after-a-decade-a-lesson-for-me-a-warning-for-you-2gie",
  },
  {
    date: "2025-12-10",
    title: "Vim for React Developers",
    url: "https://vimforreactdevs.com",
  },
  {
    date: "2025-12-09",
    title: "Facebook Redesign",
    url: "https://engineering.fb.com/2020/05/08/web/facebook-redesign",
  },
  {
    date: "2025-12-09",
    title: "pyinfra",
    url: "https://pyinfra.com",
  },
  {
    date: "2025-12-09",
    title: "Writing an OS in Rust",
    url: "https://os.phil-opp.com",
  },
  {
    date: "2025-12-09",
    title: "Agents.md",
    url: "https://agents.md",
  },
  {
    date: "2025-12-08",
    title: "Enabling Real-Time Collaboration with RSocket",
    url: "https://www.canva.dev/blog/engineering/enabling-real-time-collaboration-with-rsocket",
  },
  {
    date: "2025-12-06",
    title: "GitHub: Downtime last Saturday",
    url: "https://github.blog/news-insights/the-library/downtime-last-saturday",
  },
  {
    date: "2025-12-06",
    title: "The Network is Reliable: An Informal Survey of Real-World Communications Failures",
    url: "https://queue.acm.org/detail.cfm?id=2655736",
  },
  {
    date: "2025-12-06",
    title: "The Chubby Lock Service for Loosely-Coupled Distributed Systems",
    url: "https://research.google.com/archive/chubby.html",
  },
  {
    date: "2025-12-06",
    title: "Martin Kleppmann: How to Do Distributed Locking",
    url: "https://martin.kleppmann.com/2016/02/08/how-to-do-distributed-locking.html",
  },
  {
    date: "2025-12-05",
    title: "Wiz Research Uncovers Exposed DeepSeek Database Leaking Sensitive Information",
    url: "https://www.wiz.io/blog/wiz-research-uncovers-exposed-deepseek-database-leak",
  },
  {
    date: "2025-12-05",
    title: "How I Reverse Engineered a Billion-Dollar Legal AI Tool and Found 100k+ Confidential Files",
    url: "https://alexschapiro.com/security/vulnerability/2025/12/02/filevine-api-100k.html",
  },
  {
    date: "2025-12-04",
    title: "Y Combinator: Should You Follow Your Passion?",
    url: "https://www.ycombinator.com/library/DW-dalton-michael-should-you-follow-your-passion",
  },
  {
    date: "2025-12-04",
    title: "Canva: Realtime Mouse Pointers",
    url: "https://www.canva.dev/blog/engineering/realtime-mouse-pointers",
  },
  {
    date: "2025-12-03",
    title: "Anthropic: How AI is Transforming Work at Anthropic",
    url: "https://www.anthropic.com/research/how-ai-is-transforming-work-at-anthropic",
  },
  {
    date: "2025-12-02",
    title: "Jason Scheirer: Vignettes",
    url: "https://www.jasonscheirer.com/weblog/vignettes",
  },
  {
    date: "2025-12-01",
    title: "LLM VRAM Estimator",
    url: "https://vram.asmirnov.xyz",
  },
  {
    date: "2025-12-01",
    title: "LLM Model, Can I run it?",
    url: "https://huggingface.co/spaces/NyxKrage/LLM-Model-VRAM-Calculator",
  },
  {
    date: "2025-12-01",
    title: "Transformer Math",
    url: "https://blog.eleuther.ai/transformer-math",
  },
  {
    date: "2025-12-01",
    title: 'Sycophancy is the first LLM "dark pattern"',
    url: "https://www.seangoedecke.com/ai-sycophancy",
  },
  {
    date: "2025-12-01",
    title: "Hugging Face: Faster Transformers",
    url: "https://huggingface.co/blog/faster-transformers",
  },
  {
    date: "2025-11-10",
    title: "Berkshire Hathaway: November 2025 Letter",
    url: "https://berkshirehathaway.com/news/nov1025.pdf",
  },
  {
    date: "2025-10-30",
    title: "Fast.ai: Build to Last",
    url: "https://www.fast.ai/posts/2025-10-30-build-to-last.html",
  },
  {
    date: "2025-07-29",
    title: "The Haters Guide to the AI Bubble",
    url: "https://www.wheresyoured.at/the-haters-gui",
  },
  {
    date: "2025-07-23",
    title: "OpenAI Reflections",
    url: "https://calv.info/openai-reflections",
  },
  {
    date: "2025-06-26",
    title: "AI-assisted coding for teams that can't get away with vibes",
    url: "https://blog.nilenso.com/blog/2025/05/29/ai-assisted-coding",
  },
  {
    date: "2025-04-23",
    title: "Horseless Carriages",
    url: "https://koomen.dev/essays/horseless-carriages",
  },
  {
    date: "2025-04-03",
    title: "AI-2027",
    url: "https://ai-2027.com",
  },
  {
    date: "2025-02-02",
    title: "Andrej Karpathy: Zero to Hero",
    url: "https://karpathy.ai/zero-to-hero.html",
  },
  {
    date: "2025-11-20",
    title: "LLM Visualization",
    url: "https://bbycroft.net/llm",
  },
  {
    date: "2024-09-02",
    title: "Paul Graham: Founder Mode",
    url: "https://paulgraham.com/foundermode.html",
  },
  {
    date: "2024-08-17",
    title: "Alex Karp: Palantir",
    url: "https://www.nytimes.com/2024/08/17/style/alex-karp-palantir.html",
  },
  {
    date: "2025-07-31",
    title: "A Visual Guide to Quantization",
    url: "https://newsletter.maartengrootendorst.com/p/a-visual-guide-to-quantization",
  },
  {
    date: "2024-07-28",
    title: "An Interview with SoftBank's CEO Masayoshi Son",
    url: "https://hbr.org/1992/01/japanese-style-entrepreneurship-an-interview-with-softbanks-ceo-masayoshi-son",
  },
  {
    date: "2024-07-25",
    title: "AI models collapse when trained on recursively generated data",
    url: "https://www.nature.com/articles/s41586-024-07566-y",
  },
  {
    date: "2024-07-21",
    title: "ChunkViz",
    url: "https://chunkviz.up.railway.app",
  },
  {
    date: "2024-07-01",
    title: "Fast.ai: Practical Deep Learning for Coders",
    url: "https://course.fast.ai",
  },
  {
    date: "2024-06-25",
    title: "How Cassandra Stores Data: An Exploration of Log Structured Merge Trees",
    url: "https://hackernoon.com/how-cassandra-stores-data-an-exploration-of-log-structured-merge-trees",
  },
  {
    date: "2024-03-20",
    title: "There is No Now in Distributed Systems",
    url: "https://cacm.acm.org/practice/there-is-no-now",
  },
  {
    date: "2023-01-22",
    title: "The Twelve_Factor App",
    url: "https://12factor.net",
  },
  {
    date: "2022-12-03",
    title: "Latency Numbers Every Programmer Should Know",
    url: "https://gist.github.com/jboner/2841832",
  },
  {
    date: "2022-12-01",
    title: "Twitter: Announcing Snowflake",
    url: "https://blog.x.com/engineering/en_us/a/2010/announcing-snowflake",
  },
  {
    date: "2022-12-01",
    title: "TwitterServer",
    url: "https://twitter.github.io/twitter-server",
  },
];

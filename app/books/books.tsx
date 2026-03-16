export type Book = {
  id: string;
  title: string;
  author: string;
  cover: string;
  url: string;
  height: number;
  width: number;
};

export const BOOKS: Book[] = [
  {
    id: "barbarian-days",
    title: "Barbarian Days",
    author: "William Finnegan",
    cover: "/images/blog/books/barbarian-days.webp",
    url: "https://amzn.to/4dngUos",
    height: 1000,
    width: 640,
  },
  {
    id: "the-power-broker",
    title: "The Power Broker",
    author: "Robert A. Caro",
    cover: "/images/blog/books/the-power-broker.webp",
    url: "https://amzn.to/4lBeEwe",
    height: 1000,
    width: 655,
  },
  {
    id: "mans-search-for-meaning",
    title: "Mans Search for Meaning",
    author: "Viktor E. Frankl",
    cover: "/images/blog/books/mans-search-for-meaning.webp",
    url: "https://amzn.to/3P92kXQ",
    height: 2048,
    width: 1272,
  },
  {
    id: "when-money-dies",
    title: "When Money Dies",
    author: "Adam Fergusson",
    cover: "/images/blog/books/when-money-dies.webp",
    url: "https://amzn.to/47A8TJb",
    height: 1000,
    width: 666,
  },
  {
    id: "inside-delta-force",
    title: "Inside Delta Force",
    author: "Eric L. Haney",
    cover: "/images/blog/books/inside-delta-force.webp",
    url: "https://amzn.to/4ly92CM",
    height: 1000,
    width: 713,
  },
  {
    id: "the-obstacle-is-the-way",
    title: "The Obstacle is the Way",
    author: "Ryan Holiday",
    cover: "/images/blog/books/the-obstacle-is-the-way.webp",
    url: "https://amzn.to/4bwLc5X",
    height: 1000,
    width: 709,
  },
  {
    id: "the-psychology-of-money",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    cover: "/images/blog/books/the-psychology-of-money.webp",
    url: "https://amzn.to/4bgUnHe",
    height: 1000,
    width: 647,
  },
  {
    id: "the-castle",
    title: "The Castle",
    author: "Franz Kafka",
    cover: "/images/blog/books/the-castle.webp",
    url: "https://amzn.to/3Nj3QWO",
    height: 1000,
    width: 663,
  },
  {
    id: "shoe-dog",
    title: "Shoe Dog",
    author: "Phil Knight",
    cover: "/images/blog/books/shoe-dog.webp",
    url: "https://amzn.to/4bzsgDE",
    height: 1000,
    width: 652,
  },
];

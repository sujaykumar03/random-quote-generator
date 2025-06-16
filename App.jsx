import { useState, useEffect } from 'react';

export default function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);

  const localQuotes = [
  { q: "Life is what happens when you're busy making other plans.", a: "John Lennon" },
  { q: "The greatest glory in living lies not in never falling, but in rising every time we fall.", a: "Nelson Mandela" },
  { q: "Success is not final, failure is not fatal: It is the courage to continue that counts.", a: "Winston Churchill" },
  { q: "If you want to live a happy life, tie it to a goal, not to people or things.", a: "Albert Einstein" },
];

const fetchQuote = () => {
  setLoading(true);
  setTimeout(() => {
    const random = localQuotes[Math.floor(Math.random() * localQuotes.length)];
    setQuote(random.q);
    setAuthor(random.a);
    setLoading(false);
  }, 300); // simulate loading
};
  useEffect(() => { fetchQuote(); }, []);

  const copyQuote = () => {
    navigator.clipboard.writeText(`"${quote}" — ${author}`);
  };

  const tweetQuote = () => {
    const tweet = encodeURIComponent(`"${quote}" — ${author}`);
    window.open(`https://twitter.com/intent/tweet?text=${tweet}`, '_blank');
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <section className="bg-gray-800/80 p-8 rounded-xl shadow-lg w-full max-w-xl text-center space-y-6">
        <h1 className="text-2xl font-bold">📜 Random Quote Generator</h1>

        {loading ? (
          <div className="flex justify-center my-10">
            <div className="h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <p className="italic text-lg">"{quote}"</p>
            <p className="text-sm text-right text-gray-400">— {author}</p>
          </>
        )}

        <div className="flex flex-wrap justify-center gap-4">
          <button onClick={fetchQuote} className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded shadow">
            New Quote
          </button>
          <button onClick={copyQuote} className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded shadow">
            Copy
          </button>
          <button onClick={tweetQuote} className="bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded shadow">
            Tweet
          </button>
        </div>
      </section>
    </main>
  );
}

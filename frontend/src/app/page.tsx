'use client';
import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [books, setBooks] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  const fetchBooks = async () => {
    const res = await fetch(`/api/books?q=${encodeURIComponent(search)}`);
    const data = await res.json();
    setBooks(data.books || []);
  };

  return (
    <>
      <Head><title>Gutenberg Library</title></Head>
      <main className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-gray-900">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
              Gutenberg Library
            </h1>
            <p className="text-gray-400 text-xl">70,000+ free classic books</p>
          </div>
          <div className="flex gap-4 mb-8">
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search books..."
              className="flex-1 px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white" />
            <button onClick={fetchBooks} className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl">
              Search
            </button>
          </div>
          <div className="grid gap-4">
            {books.map((b, i) => (
              <div key={i} className="bg-gray-800/50 rounded-xl p-6 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-white">{b.title}</h3>
                  <p className="text-gray-400">{b.author}</p>
                </div>
                <div className="text-right">
                  <span className="text-emerald-400">{b.downloads.toLocaleString()} downloads</span>
                  <p className="text-gray-500 text-sm">{b.language}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

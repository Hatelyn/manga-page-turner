import React from 'react';
import { Link } from 'react-router-dom';
import MangaCard from '../components/MangaCard';
import { mangaList } from '../nav-items';

const Index = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-[#4a3728]">Popular Manga</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mangaList.map((manga) => (
          <Link key={manga.id} to={`/manga/${manga.id}`}>
            <MangaCard title={manga.title} image={manga.image} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Index;
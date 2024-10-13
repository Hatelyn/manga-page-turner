import React from 'react';
import { Link } from 'react-router-dom';
import MangaCard from '../components/MangaCard';

const mangaList = [
  { id: 1, title: 'Naruto', image: '/placeholder.svg' },
  { id: 2, title: 'One Piece', image: '/placeholder.svg' },
  { id: 3, title: 'Attack on Titan', image: '/placeholder.svg' },
  { id: 4, title: 'My Hero Academia', image: '/placeholder.svg' },
  { id: 5, title: 'Death Note', image: '/placeholder.svg' },
  { id: 6, title: 'Fullmetal Alchemist', image: '/placeholder.svg' },
];

const Index = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Popular Manga</h1>
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
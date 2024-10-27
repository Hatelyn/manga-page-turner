import React from 'react';
import { Link } from 'react-router-dom';
import MangaCard from '../components/MangaCard';
import { mangaList } from '../nav-items';

const Index = () => {
  return (
    <div className="relative min-h-screen">
      {/* Background image with overlay */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-30 z-0"
        style={{
          backgroundImage: `url('https://cdn.leonardo.ai/users/9b423084-7af3-4c04-82c9-ea794f137d9a/generations/90b146c1-be1d-4fcf-992f-93a6a3026e9c/variations/Default_Emerging_from_the_depths_sinister_shadowy_hands_claw_u_2_90b146c1-be1d-4fcf-992f-93a6a3026e9c_0.png?w=512')`
        }}
      />
      
      {/* Content */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        <h1 className="text-4xl font-bold mb-8 text-center text-primary">Popular Manga</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mangaList.map((manga) => (
            <Link key={manga.id} to={`/manga/${manga.id}`}>
              <MangaCard title={manga.title} image={manga.image} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
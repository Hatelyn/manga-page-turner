import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CommentSection from '../components/CommentSection';

const mangaData = {
  1: { id: 1, title: 'Naruto', description: 'A young ninja with a sealed demon inside him wishes to become the leader of his home village.', image: '/placeholder.svg' },
  2: { id: 2, title: 'One Piece', description: 'Follows the adventures of Monkey D. Luffy and his pirate crew in order to find the greatest treasure ever left by the legendary Pirate, Gold Roger.', image: '/placeholder.svg' },
  3: { id: 3, title: 'Attack on Titan', description: 'In a world where humanity lives inside cities surrounded by enormous walls due to the Titans, gigantic humanoid creatures who devour humans seemingly without reason.', image: '/placeholder.svg' },
  4: { id: 4, title: 'My Hero Academia', description: 'A superhero-loving boy without any powers is determined to enroll in a prestigious hero academy and learn what it really means to be a hero.', image: '/placeholder.svg' },
  5: { id: 5, title: 'Death Note', description: 'An intelligent high school student goes on a secret crusade to eliminate criminals from the world after discovering a notebook capable of killing anyone whose name is written into it.', image: '/placeholder.svg' },
  6: { id: 6, title: 'Fullmetal Alchemist', description: 'Two brothers search for a Philosopher\'s Stone after an attempt to revive their deceased mother goes awry and leaves them in damaged physical forms.', image: '/placeholder.svg' },
};

const MangaDetail = () => {
  const { id } = useParams();
  const manga = mangaData[id];

  if (!manga) {
    return <div>Manga not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <img src={manga.image} alt={manga.title} className="w-full md:w-1/3 h-96 object-cover rounded-lg" />
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">{manga.title}</h1>
          <p className="text-lg mb-6">{manga.description}</p>
          <Link to={`/manga/${id}/read`}>
            <Button>Read Manga</Button>
          </Link>
        </div>
      </div>
      <CommentSection mangaId={id} />
    </div>
  );
};

export default MangaDetail;
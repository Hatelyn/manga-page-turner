import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import CommentSection from '../components/CommentSection';

const mangaData = {
  1: { id: 1, title: 'Naruto', description: 'A young ninja with a sealed demon inside him wishes to become the leader of his home village.', image: 'https://m.media-amazon.com/images/I/71QYLrc-IQL._AC_UF1000,1000_QL80_.jpg', categories: ['Action', 'Adventure', 'Fantasy'], ageRecommendation: '13+' },
  2: { id: 2, title: 'One Piece', description: 'Follows the adventures of Monkey D. Luffy and his pirate crew in order to find the greatest treasure ever left by the legendary Pirate, Gold Roger.', image: 'https://m.media-amazon.com/images/M/MV5BODcwNWE3OTMtMDc3MS00NDFjLWE1OTAtNDU3NjgxODMxY2UyXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg', categories: ['Action', 'Adventure', 'Comedy'], ageRecommendation: '13+' },
  3: { id: 3, title: 'Attack on Titan', description: 'In a world where humanity lives inside cities surrounded by enormous walls due to the Titans, gigantic humanoid creatures who devour humans seemingly without reason.', image: 'https://flxt.tmsimg.com/assets/p10701949_b_v8_ah.jpg', categories: ['Action', 'Dark Fantasy', 'Post-apocalyptic'], ageRecommendation: '16+' },
  4: { id: 4, title: 'My Hero Academia', description: 'A superhero-loving boy without any powers is determined to enroll in a prestigious hero academy and learn what it really means to be a hero.', image: 'https://m.media-amazon.com/images/M/MV5BNmQzYmE2MGEtZjk4YS00YmVjLWEwZWMtODRkMjc4MTM5N2I3XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg', categories: ['Superhero', 'Action', 'School'], ageRecommendation: '13+' },
  5: { id: 5, title: 'Death Note', description: 'An intelligent high school student goes on a secret crusade to eliminate criminals from the world after discovering a notebook capable of killing anyone whose name is written into it.', image: 'https://m.media-amazon.com/images/M/MV5BNjRiNmNjMmMtN2U2Yi00ODgxLTk3OTMtMmI1MTI1NjYyZTEzXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1000_.jpg', categories: ['Thriller', 'Supernatural', 'Psychological'], ageRecommendation: '16+' },
  6: { id: 6, title: 'Fullmetal Alchemist', description: 'Two brothers search for a Philosopher\'s Stone after an attempt to revive their deceased mother goes awry and leaves them in damaged physical forms.', image: 'https://m.media-amazon.com/images/M/MV5BZmEzN2YzOTItMDI5MS00MGU4LWI1NWQtOTg5ZThhNGQwYTEzXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg', categories: ['Adventure', 'Steampunk', 'Dark Fantasy'], ageRecommendation: '14+' },
  7: { id: 7, title: 'Dragon Ball', description: 'Follow the adventures of Son Goku from childhood to adulthood as he trains in martial arts and explores the world in search of the seven mystical orbs known as the Dragon Balls.', image: 'https://m.media-amazon.com/images/M/MV5BYzI0YjYxY2UtNzRjNi00NTM2LTg4OTYtNjk5YWYyZjNkNDllXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg', categories: ['Action', 'Adventure', 'Comedy'], ageRecommendation: '12+' },
  8: { id: 8, title: 'Bleach', description: 'High school student Ichigo Kurosaki, who has the ability to see ghosts, gains soul reaper powers from Rukia Kuchiki and sets out to save the world from "Hollows".', image: 'https://m.media-amazon.com/images/M/MV5BZjE0YjVjODQtZGY2NS00MDcyLThhMDAtZGQwMTZiOWNmNjRiXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_FMjpg_UX1000_.jpg', categories: ['Supernatural', 'Action', 'Adventure'], ageRecommendation: '14+' },
  9: { id: 9, title: 'Hunter x Hunter', description: 'Gon Freecss aspires to become a Hunter, an exceptional being capable of greatness. With his friends and his potential, he seeks out his father, who left him when he was younger.', image: 'https://m.media-amazon.com/images/M/MV5BZjNmZDhkN2QtNDYyZC00YzJmLTg0ODUtN2FjNjhhMzE3ZmUxXkEyXkFqcGdeQXVyNjc2NjA5MTU@._V1_FMjpg_UX1000_.jpg', categories: ['Adventure', 'Fantasy', 'Martial Arts'], ageRecommendation: '14+' },
  10: { id: 10, title: 'Demon Slayer', description: 'A young man in search of a cure for his sister, who has been turned into a demon, joins the Demon Slayer Corps, a group dedicated to protecting humanity from demons.', image: 'https://m.media-amazon.com/images/M/MV5BZjZjNzI5MDctY2Y4YS00NmM4LTljMmItZTFkOTExNGI3ODRhXkEyXkFqcGdeQXVyNjc3MjQzNTI@._V1_.jpg', categories: ['Action', 'Dark Fantasy', 'Martial Arts'], ageRecommendation: '16+' },
};

const MangaDetail = () => {
  const { id } = useParams();
  const manga = mangaData[id];

  if (!manga) {
    return <div>Manga not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-[#f5e6d3]">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-[#4a3728]">{manga.title}</h1>
        <Link to="/">
          <Button variant="outline" className="bg-[#8c6d4f] text-[#f5e6d3] hover:bg-[#6b5744]">
            <Home className="h-4 w-4 mr-2" /> Home
          </Button>
        </Link>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <img src={manga.image} alt={manga.title} className="w-full md:w-1/3 h-96 object-cover rounded-lg shadow-lg" />
        <div className="flex-1">
          <p className="text-lg mb-6 text-[#4a3728]">{manga.description}</p>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2 text-[#4a3728]">Categories:</h2>
            <div className="flex flex-wrap gap-2">
              {manga.categories.map((category, index) => (
                <span key={index} className="bg-[#8c6d4f] text-[#f5e6d3] px-3 py-1 rounded-full text-sm">{category}</span>
              ))}
            </div>
          </div>
          <p className="text-[#4a3728] mb-6">Age Recommendation: <span className="font-semibold">{manga.ageRecommendation}</span></p>
          <Link to={`/manga/${id}/read`}>
            <Button className="bg-[#8c6d4f] text-[#f5e6d3] hover:bg-[#6b5744]">Read Manga</Button>
          </Link>
        </div>
      </div>
      <CommentSection mangaId={id} />
    </div>
  );
};

export default MangaDetail;
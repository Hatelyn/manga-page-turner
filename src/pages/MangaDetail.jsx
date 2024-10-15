import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Home } from 'lucide-react';
import CommentSection from '../components/CommentSection';

export const mangaData = {
  1: { id: 1, title: 'Naruto', description: 'A young ninja with a sealed demon inside him wishes to become the leader of his home village.', image: 'https://m.media-amazon.com/images/I/71QYLrc-IQL._AC_UF1000,1000_QL80_.jpg', categories: ['Action', 'Adventure', 'Fantasy'], ageRecommendation: '13+' },
  2: { id: 2, title: 'One Piece', description: 'Follows the adventures of Monkey D. Luffy and his pirate crew in order to find the greatest treasure ever left by the legendary Pirate, Gold Roger.', image: 'https://m.media-amazon.com/images/M/MV5BODcwNWE3OTMtMDc3MS00NDFjLWE1OTAtNDU3NjgxODMxY2UyXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg', categories: ['Action', 'Adventure', 'Comedy'], ageRecommendation: '13+' },
  3: { id: 3, title: 'Attack on Titan', description: 'In a world where humanity lives inside cities surrounded by enormous walls due to the Titans, gigantic humanoid creatures who devour humans seemingly without reason.', image: 'https://flxt.tmsimg.com/assets/p10701949_b_v8_ah.jpg', categories: ['Action', 'Dark Fantasy', 'Post-apocalyptic'], ageRecommendation: '16+' },
  4: { id: 4, title: 'My Hero Academia', description: 'A superhero-loving boy without any powers is determined to enroll in a prestigious hero academy and learn what it really means to be a hero.', image: 'https://m.media-amazon.com/images/M/MV5BNmQzYmE2MGEtZjk4YS00YmVjLWEwZWMtODRkMjc4MTM5N2I3XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg', categories: ['Superhero', 'Action', 'School'], ageRecommendation: '13+' },
  5: { id: 5, title: 'Death Note', description: 'An intelligent high school student goes on a secret crusade to eliminate criminals from the world after discovering a notebook capable of killing anyone whose name is written into it.', image: 'https://m.media-amazon.com/images/M/MV5BNjRiNmNjMmMtN2U2Yi00ODgxLTk3OTMtMmI1MTI1NjYyZTEzXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1000_.jpg', categories: ['Thriller', 'Supernatural', 'Psychological'], ageRecommendation: '16+' },
  6: { id: 6, title: 'Fullmetal Alchemist', description: 'Two brothers search for a Philosopher\'s Stone after an attempt to revive their deceased mother goes awry and leaves them in damaged physical forms.', image: 'https://m.media-amazon.com/images/M/MV5BZmEzN2YzOTItMDI5MS00MGU4LWI1NWQtOTg5ZThhNGQwYTEzXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg', categories: ['Adventure', 'Steampunk', 'Dark Fantasy'], ageRecommendation: '14+' },
  8: { id: 8, title: 'Bleach', description: 'High school student Ichigo Kurosaki, who has the ability to see ghosts, gains soul reaper powers from Rukia Kuchiki and sets out to save the world from "Hollows".', image: 'https://m.media-amazon.com/images/M/MV5BZjE0YjVjODQtZGY2NS00MDcyLThhMDAtZGQwMTZiOWNmNjRiXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_FMjpg_UX1000_.jpg', categories: ['Supernatural', 'Action', 'Adventure'], ageRecommendation: '14+' },
  9: { id: 9, title: 'Hunter x Hunter', description: 'Gon Freecss aspires to become a Hunter, an exceptional being capable of greatness. With his friends and his potential, he seeks out his father, who left him when he was younger.', image: 'https://m.media-amazon.com/images/M/MV5BZjNmZDhkN2QtNDYyZC00YzJmLTg0ODUtN2FjNjhhMzE3ZmUxXkEyXkFqcGdeQXVyNjc2NjA5MTU@._V1_FMjpg_UX1000_.jpg', categories: ['Adventure', 'Fantasy', 'Martial Arts'], ageRecommendation: '14+' },
  10: { id: 10, title: 'Demon Slayer', description: 'A young man in search of a cure for his sister, who has been turned into a demon, joins the Demon Slayer Corps, a group dedicated to protecting humanity from demons.', image: 'https://m.media-amazon.com/images/M/MV5BZjZjNzI5MDctY2Y4YS00NmM4LTljMmItZTFkOTExNGI3ODRhXkEyXkFqcGdeQXVyNjc3MjQzNTI@._V1_.jpg', categories: ['Action', 'Dark Fantasy', 'Martial Arts'], ageRecommendation: '16+' },
};

const similarMangaData = {
  1: [2, 4, 8],
  2: [1, 8, 9],
  3: [5, 9, 10],
  4: [1, 6, 9],
  5: [3, 8, 10],
  6: [4, 8, 9],
  8: [2, 5, 10],
  9: [3, 4, 6],
  10: [3, 5, 8],
};

export const volumesData = {
  1: [
    { volume: 1, chapters: [1, 2, 3, 4, 5, 6, 7] },
    { volume: 2, chapters: [8, 9, 10, 11, 12, 13, 14] },
    { volume: 3, chapters: [15, 16, 17, 18, 19, 20, 21] },
  ],
  2: [
    { volume: 1, chapters: [1, 2, 3, 4, 5] },
    { volume: 2, chapters: [6, 7, 8, 9, 10] },
    { volume: 3, chapters: [11, 12, 13, 14, 15] },
  ],
  3: [
    { volume: 1, chapters: [1, 2, 3, 4] },
    { volume: 2, chapters: [5, 6, 7, 8] },
    { volume: 3, chapters: [9, 10, 11, 12] },
  ],
  4: [
    { volume: 1, chapters: [1, 2, 3, 4, 5] },
    { volume: 2, chapters: [6, 7, 8, 9, 10] },
    { volume: 3, chapters: [11, 12, 13, 14, 15] },
  ],
  5: [
    { volume: 1, chapters: [1, 2, 3, 4, 5] },
    { volume: 2, chapters: [6, 7, 8, 9, 10] },
    { volume: 3, chapters: [11, 12, 13, 14, 15] },
  ],
  6: [
    { volume: 1, chapters: [1, 2, 3, 4, 5] },
    { volume: 2, chapters: [6, 7, 8, 9, 10] },
    { volume: 3, chapters: [11, 12, 13, 14, 15] },
  ],
  8: [
    { volume: 1, chapters: [1, 2, 3, 4, 5] },
    { volume: 2, chapters: [6, 7, 8, 9, 10] },
    { volume: 3, chapters: [11, 12, 13, 14, 15] },
  ],
  9: [
    { volume: 1, chapters: [1, 2, 3, 4, 5] },
    { volume: 2, chapters: [6, 7, 8, 9, 10] },
    { volume: 3, chapters: [11, 12, 13, 14, 15] },
  ],
  10: [
    { volume: 1, chapters: [1, 2, 3, 4, 5] },
    { volume: 2, chapters: [6, 7, 8, 9, 10] },
    { volume: 3, chapters: [11, 12, 13, 14, 15] },
  ],
};

const MangaDetail = () => {
  const { id } = useParams();
  const manga = mangaData[id];
  const similarManga = similarMangaData[id].map(similarId => mangaData[similarId]);
  const volumes = volumesData[id] || [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!manga) {
    return <div>Manga not found</div>;
  }

  const lastVolume = volumes[volumes.length - 1];
  const lastChapter = lastVolume ? Math.max(...lastVolume.chapters) : 0;

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
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="flex flex-col md:flex-row gap-8 mb-8">
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
              <Link to={`/manga/${id}/read/1-1`}>
                <Button className="bg-[#8c6d4f] text-[#f5e6d3] hover:bg-[#6b5744]">Read Manga</Button>
              </Link>
            </div>
          </div>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-[#4a3728]">Volumes and Chapters</h2>
            {volumes.map((volume) => (
              <div key={volume.volume} className="mb-4">
                <h3 className="text-xl font-semibold mb-2 text-[#4a3728]">Volume {volume.volume}</h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                  {volume.chapters.map((chapter) => (
                    <Link key={chapter} to={`/manga/${id}/read/${chapter}-1`}>
                      <Button variant="outline" className="w-full bg-[#e8d5b5] text-[#4a3728] hover:bg-[#d1b795]">
                        Chapter {chapter}
                      </Button>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <div className="mt-4 flex justify-between">
              <Link to={`/manga/${id}/read/1-1`}>
                <Button className="bg-[#8c6d4f] text-[#f5e6d3] hover:bg-[#6b5744]">
                  Start Reading
                </Button>
              </Link>
              <Link to={`/manga/${id}/read/${lastChapter}-1`}>
                <Button className="bg-[#8c6d4f] text-[#f5e6d3] hover:bg-[#6b5744]" disabled={lastChapter === 0}>
                  Latest Chapter
                </Button>
              </Link>
            </div>
          </div>
          <CommentSection mangaId={id} />
        </div>
        <aside className="lg:w-1/4">
          <h2 className="text-2xl font-bold mb-4 text-[#4a3728]">Similar Manga</h2>
          <div className="space-y-4">
            {similarManga.map((similar) => (
              <Link key={similar.id} to={`/manga/${similar.id}`} className="block">
                <div className="flex items-center bg-[#e8d5b5] p-2 rounded-lg shadow hover:shadow-md transition-shadow">
                  <img src={similar.image} alt={similar.title} className="w-16 h-24 object-cover rounded mr-4" />
                  <div>
                    <h3 className="font-semibold text-[#4a3728]">{similar.title}</h3>
                    <p className="text-sm text-[#6b5744]">{similar.categories.join(', ')}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default MangaDetail;
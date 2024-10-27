import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X, Bookmark } from 'lucide-react';
import { mangaData, volumesData } from './MangaDetail';

const lionchosis = ['https://itstud.hiof.no/~kingamj/lionchosis/chapter1/page1.png',
  'https://itstud.hiof.no/~kingamj/lionchosis/chapter1/page2.png',
  'https://itstud.hiof.no/~kingamj/lionchosis/chapter1/page3.png',
  'https://itstud.hiof.no/~kingamj/lionchosis/chapter1/page4.png',
  'https://itstud.hiof.no/~kingamj/lionchosis/chapter1/page5.png',
  'https://itstud.hiof.no/~kingamj/lionchosis/chapter1/page6.png',
  'https://itstud.hiof.no/~kingamj/lionchosis/chapter1/page7.png',
  'https://itstud.hiof.no/~kingamj/lionchosis/chapter1/page8.png',
  'https://itstud.hiof.no/~kingamj/lionchosis/chapter1/page9.png',
  'https://itstud.hiof.no/~kingamj/lionchosis/chapter1/page10.png',
  'https://itstud.hiof.no/~kingamj/lionchosis/chapter1/page11.png',
  'https://itstud.hiof.no/~kingamj/lionchosis/chapter1/page12.png',
  'https://itstud.hiof.no/~kingamj/lionchosis/chapter1/page13.png',
  'https://itstud.hiof.no/~kingamj/lionchosis/chapter1/page14.png',
  'https://itstud.hiof.no/~kingamj/lionchosis/chapter1/page15.png',
  'https://itstud.hiof.no/~kingamj/lionchosis/chapter1/page16.png',
  'https://itstud.hiof.no/~kingamj/lionchosis/chapter1/page17.png',
  'https://itstud.hiof.no/~kingamj/lionchosis/chapter1/page18.png',
  'https://itstud.hiof.no/~kingamj/lionchosis/chapter1/page19.png',
  'https://itstud.hiof.no/~kingamj/lionchosis/chapter1/page20.png',
]

const mangaPages = {
  1: Array(20).fill('/placeholder.svg'),
  2: Array(20).fill('/placeholder.svg'),
  3: Array(20).fill('/placeholder.svg'),
  4: Array(20).fill('/placeholder.svg'),
  5: Array(20).fill('/placeholder.svg'),
  6: Array(20).fill('/placeholder.svg'),
  8: Array(20).fill('/placeholder.svg'),
  9: Array(20).fill('/placeholder.svg'),
  10: Array(20).fill('/placeholder.svg'),
  11: lionchosis,
};

const MangaReader = () => {
  const { id, slug } = useParams();
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const pages = mangaPages[id] || [];
  const manga = mangaData[id] || { title: 'Unknown Manga' };
  const volumes = volumesData[id] || [];

  const [chapter, page] = slug ? slug.split('-').map(Number) : [1, 1];

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '{}');
    setIsBookmarked(!!bookmarks[id]);
    window.scrollTo(0, 0);
  }, [id, chapter, page]);

  const nextPage = () => {
    if (page < pages.length) {
      navigate(`/manga/${id}/read/${chapter}-${page + 1}`);
    } else if (chapter < Math.max(...volumes.flatMap(v => v.chapters))) {
      navigate(`/manga/${id}/read/${chapter + 1}-1`);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      navigate(`/manga/${id}/read/${chapter}-${page - 1}`);
    } else if (chapter > 1) {
      const prevChapterPages = mangaPages[id].length;
      navigate(`/manga/${id}/read/${chapter - 1}-${prevChapterPages}`);
    }
  };

  const exitReader = () => {
    navigate(`/manga/${id}`);
  };

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '{}');
    if (isBookmarked) {
      delete bookmarks[id];
    } else {
      const currentVolume = volumes.find(volume => volume.chapters.includes(chapter)) || { volume: 1 };
      bookmarks[id] = { page, chapter, volume: currentVolume.volume, slug: `${chapter}-${page}` };
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    setIsBookmarked(!isBookmarked);

    // Update user profile
    const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    userProfile.bookmarks = Object.entries(bookmarks).map(([mangaId, data]) => ({
      id: parseInt(mangaId),
      title: mangaData[mangaId]?.title || `Manga ${mangaId}`,
      page: data.page,
      chapter: data.chapter,
      volume: data.volume,
      slug: data.slug
    }));
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
  };

  const goToChapter = (newChapter) => {
    navigate(`/manga/${id}/read/${newChapter}-1`);
  };

  const currentVolume = volumes.find(volume => volume.chapters.includes(chapter));
  const lastChapter = Math.max(...volumes.flatMap(v => v.chapters));
  const isLastChapter = chapter === lastChapter;

  return (
    <div className="container mx-auto px-4 py-8 bg-background">
      <h1 className="text-3xl font-bold mb-4 text-center text-primary">{manga.title} - Volume {currentVolume?.volume || '?'}, Chapter {chapter}</h1>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
        <Button onClick={exitReader} variant="outline" className="bg-secondary text-secondary-foreground hover:bg-secondary/80">
          <X className="h-4 w-4 mr-2" /> Exit
        </Button>
        <Button onClick={toggleBookmark} variant="outline" className="bg-secondary text-secondary-foreground hover:bg-secondary/80">
          <Bookmark className={`h-4 w-4 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
          {isBookmarked ? 'Bookmarked' : 'Bookmark'}
        </Button>
      </div>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-2 mb-4">
        <Button onClick={() => goToChapter(chapter - 1)} disabled={chapter === 1} className="bg-primary text-primary-foreground hover:bg-primary/90">
          Previous Chapter
        </Button>
        <Button onClick={() => goToChapter(chapter + 1)} disabled={isLastChapter} className="bg-primary text-primary-foreground hover:bg-primary/90">
          Next Chapter
        </Button>
      </div>
      <div className="relative flex justify-center items-center">
        <Button
          onClick={prevPage}
          disabled={chapter === 1 && page === 1}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-primary/50 text-primary-foreground hover:bg-primary/70"
          size="icon"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <img src={pages[page - 1]} alt={`Page ${page}`} className="w-full max-w-2xl h-auto object-contain" />
        <Button
          onClick={nextPage}
          disabled={isLastChapter && page === pages.length}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-primary/50 text-primary-foreground hover:bg-primary/70"
          size="icon"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
      <div className="text-center mt-4 text-foreground">
        Page {page} of {pages.length}
      </div>
    </div>
  );
};

export default MangaReader;

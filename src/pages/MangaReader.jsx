import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X, Bookmark } from 'lucide-react';
import { mangaData, volumesData } from './MangaDetail';

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-center text-[#4a3728]">{manga.title} - Volume {currentVolume?.volume || '?'}, Chapter {chapter}</h1>
      <div className="flex justify-between items-center mb-4">
        <Button onClick={exitReader} variant="outline" className="bg-[#8c6d4f] text-[#f5e6d3] hover:bg-[#6b5744]">
          <X className="h-4 w-4 mr-2" /> Exit
        </Button>
        <Button onClick={toggleBookmark} variant="outline" className="bg-[#8c6d4f] text-[#f5e6d3] hover:bg-[#6b5744]">
          <Bookmark className={`h-4 w-4 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
          {isBookmarked ? 'Bookmarked' : 'Bookmark'}
        </Button>
      </div>
      <div className="flex flex-col items-center gap-4">
        <img src={pages[page - 1]} alt={`Page ${page}`} className="w-full max-w-2xl h-auto object-contain" />
        <div className="flex justify-between w-full max-w-2xl mt-4">
          <Button onClick={prevPage} disabled={chapter === 1 && page === 1} className="bg-[#8c6d4f] text-[#f5e6d3] hover:bg-[#6b5744]">
            <ChevronLeft className="h-4 w-4 mr-2" /> Previous
          </Button>
          <Button onClick={nextPage} disabled={isLastChapter && page === pages.length} className="bg-[#8c6d4f] text-[#f5e6d3] hover:bg-[#6b5744]">
            Next <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
      <div className="text-center mt-4 text-[#4a3728]">
        Page {page} of {pages.length}
      </div>
      <div className="flex justify-between mt-8">
        <Button onClick={() => goToChapter(chapter - 1)} disabled={chapter === 1} className="bg-[#8c6d4f] text-[#f5e6d3] hover:bg-[#6b5744]">
          Previous Chapter
        </Button>
        <Button onClick={() => goToChapter(chapter + 1)} disabled={isLastChapter} className="bg-[#8c6d4f] text-[#f5e6d3] hover:bg-[#6b5744]">
          Next Chapter
        </Button>
      </div>
    </div>
  );
};

export default MangaReader;
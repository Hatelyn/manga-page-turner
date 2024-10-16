import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X, Bookmark, Biohazard, Skull, Ghost } from 'lucide-react';
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
    <div className="container mx-auto px-4 py-8 bg-horror-900">
      <h1 className="text-3xl font-bold mb-4 text-center text-horror-100 flex items-center justify-center">
        <Biohazard className="mr-2" />
        {manga.title} - Volume {currentVolume?.volume || '?'}, Chapter {chapter}
      </h1>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
        <Button onClick={exitReader} variant="outline" className="bg-horror-700 text-horror-100 hover:bg-horror-600">
          <X className="h-4 w-4 mr-2" /> Exit
        </Button>
        <Button onClick={toggleBookmark} variant="outline" className="bg-horror-700 text-horror-100 hover:bg-horror-600">
          <Bookmark className={`h-4 w-4 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
          {isBookmarked ? 'Bookmarked' : 'Bookmark'}
        </Button>
      </div>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-2 mb-4">
        <Button onClick={() => goToChapter(chapter - 1)} disabled={chapter === 1} className="bg-horror-700 text-horror-100 hover:bg-horror-600">
          <Ghost className="mr-2" /> Previous Chapter
        </Button>
        <Button onClick={() => goToChapter(chapter + 1)} disabled={isLastChapter} className="bg-horror-700 text-horror-100 hover:bg-horror-600">
          Next Chapter <Skull className="ml-2" />
        </Button>
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className="w-full max-w-2xl">
          <img src={pages[page - 1]} alt={`Page ${page}`} className="w-full h-auto object-contain" />
        </div>
        <div className="flex justify-between w-full max-w-2xl mt-4">
          <Button onClick={prevPage} disabled={chapter === 1 && page === 1} className="bg-horror-700 text-horror-100 hover:bg-horror-600">
            <ChevronLeft className="h-4 w-4 mr-2" /> Previous
          </Button>
          <Button onClick={nextPage} disabled={isLastChapter && page === pages.length} className="bg-horror-700 text-horror-100 hover:bg-horror-600">
            Next <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
      <div className="text-center mt-4 text-horror-200">
        Page {page} of {pages.length}
      </div>
    </div>
  );
};

export default MangaReader;

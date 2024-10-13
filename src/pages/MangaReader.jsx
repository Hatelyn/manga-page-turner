import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X, Bookmark } from 'lucide-react';

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

const mangaTitles = {
  1: 'Naruto',
  2: 'One Piece',
  3: 'Attack on Titan',
  4: 'My Hero Academia',
  5: 'Death Note',
  6: 'Fullmetal Alchemist',
  8: 'Bleach',
  9: 'Hunter x Hunter',
  10: 'Demon Slayer',
};

const MangaReader = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const pages = mangaPages[id] || [];
  const mangaTitle = mangaTitles[id] || 'Unknown Manga';
  const chapter = parseInt(new URLSearchParams(location.search).get('chapter') || '1');

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '{}');
    setIsBookmarked(!!bookmarks[id]);
    setCurrentPage(bookmarks[id]?.page || 0);
  }, [id, chapter]);

  const nextPage = () => {
    if (currentPage < pages.length - 2) {
      setCurrentPage(currentPage + 2);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 2);
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
      bookmarks[id] = { page: currentPage, chapter };
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    setIsBookmarked(!isBookmarked);

    // Update user profile
    const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    userProfile.bookmarks = Object.entries(bookmarks).map(([mangaId, data]) => ({
      id: parseInt(mangaId),
      title: mangaTitles[mangaId] || `Manga ${mangaId}`,
      page: data.page,
      chapter: data.chapter
    }));
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
  };

  const goToChapter = (newChapter) => {
    navigate(`/manga/${id}/read?chapter=${newChapter}`);
    setCurrentPage(0); // Reset to page 1 (index 0) when changing chapters
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-center text-[#4a3728]">{mangaTitle} - Chapter {chapter}</h1>
      <div className="flex justify-between items-center mb-4">
        <Button onClick={exitReader} variant="outline" className="bg-[#8c6d4f] text-[#f5e6d3] hover:bg-[#6b5744]">
          <X className="h-4 w-4 mr-2" /> Exit
        </Button>
        <div>
          <Button onClick={() => goToChapter(chapter - 1)} disabled={chapter === 1} className="mr-2 bg-[#8c6d4f] text-[#f5e6d3] hover:bg-[#6b5744]">
            Previous Chapter
          </Button>
          <Button onClick={() => goToChapter(chapter + 1)} className="bg-[#8c6d4f] text-[#f5e6d3] hover:bg-[#6b5744]">
            Next Chapter
          </Button>
        </div>
        <Button onClick={toggleBookmark} variant="outline" className="bg-[#8c6d4f] text-[#f5e6d3] hover:bg-[#6b5744]">
          <Bookmark className={`h-4 w-4 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
          {isBookmarked ? 'Bookmarked' : 'Bookmark'}
        </Button>
      </div>
      <div className="flex justify-center items-center gap-4">
        <Button onClick={prevPage} disabled={currentPage === 0} className="bg-[#8c6d4f] text-[#f5e6d3] hover:bg-[#6b5744]">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex gap-2">
          <img src={pages[currentPage]} alt={`Page ${currentPage + 1}`} className="w-1/2 h-[70vh] object-contain" />
          <img src={pages[currentPage + 1]} alt={`Page ${currentPage + 2}`} className="w-1/2 h-[70vh] object-contain" />
        </div>
        <Button onClick={nextPage} disabled={currentPage >= pages.length - 2} className="bg-[#8c6d4f] text-[#f5e6d3] hover:bg-[#6b5744]">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="text-center mt-4 text-[#4a3728]">
        Page {currentPage + 1}-{currentPage + 2} of {pages.length}
      </div>
    </div>
  );
};

export default MangaReader;

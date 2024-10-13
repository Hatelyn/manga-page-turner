import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X, Bookmark, Home } from 'lucide-react';

const mangaPages = {
  1: Array(20).fill('/placeholder.svg'),
  2: Array(20).fill('/placeholder.svg'),
  3: Array(20).fill('/placeholder.svg'),
  4: Array(20).fill('/placeholder.svg'),
  5: Array(20).fill('/placeholder.svg'),
  6: Array(20).fill('/placeholder.svg'),
  7: Array(20).fill('/placeholder.svg'),
  8: Array(20).fill('/placeholder.svg'),
  9: Array(20).fill('/placeholder.svg'),
  10: Array(20).fill('/placeholder.svg'),
};

const MangaReader = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const pages = mangaPages[id] || [];

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '{}');
    setIsBookmarked(!!bookmarks[id]);
    setCurrentPage(bookmarks[id] || 0);
  }, [id]);

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
      bookmarks[id] = currentPage;
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    setIsBookmarked(!isBookmarked);

    // Update user profile
    const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    userProfile.bookmarks = Object.entries(bookmarks).map(([mangaId, page]) => ({
      id: parseInt(mangaId),
      title: `Manga ${mangaId}`,
      page: page
    }));
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <Button onClick={exitReader} variant="outline">
          <X className="h-4 w-4 mr-2" /> Exit
        </Button>
        <Link to="/">
          <Button variant="outline">
            <Home className="h-4 w-4 mr-2" /> Home
          </Button>
        </Link>
        <Button onClick={toggleBookmark} variant="outline">
          <Bookmark className={`h-4 w-4 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
          {isBookmarked ? 'Bookmarked' : 'Bookmark'}
        </Button>
      </div>
      <div className="flex justify-center items-center gap-4">
        <Button onClick={prevPage} disabled={currentPage === 0}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex gap-2">
          <img src={pages[currentPage]} alt={`Page ${currentPage + 1}`} className="w-1/2 h-[70vh] object-contain" />
          <img src={pages[currentPage + 1]} alt={`Page ${currentPage + 2}`} className="w-1/2 h-[70vh] object-contain" />
        </div>
        <Button onClick={nextPage} disabled={currentPage >= pages.length - 2}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="text-center mt-4">
        Page {currentPage + 1}-{currentPage + 2} of {pages.length}
      </div>
    </div>
  );
};

export default MangaReader;
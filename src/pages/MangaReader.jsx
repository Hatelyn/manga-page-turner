import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const mangaPages = {
  1: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
  2: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
  3: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
  4: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
  5: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
  6: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
};

const MangaReader = () => {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(0);
  const pages = mangaPages[id] || [];

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

  return (
    <div className="container mx-auto px-4 py-8">
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
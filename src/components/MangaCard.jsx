import React from 'react';

const MangaCard = ({ title, image }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img src={image} alt={title} className="w-full h-64 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
    </div>
  );
};

export default MangaCard;
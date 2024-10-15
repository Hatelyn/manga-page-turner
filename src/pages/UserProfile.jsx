import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mangaData, volumesData } from '../pages/MangaDetail';

const UserProfile = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    avatar: '/placeholder.svg',
    friends: ['Alice', 'Bob', 'Charlie'],
    bookmarks: [],
    readManga: [
      { id: 1, title: 'Naruto' },
      { id: 2, title: 'One Piece' },
      { id: 4, title: 'My Hero Academia' },
      { id: 6, title: 'Fullmetal Alchemist' },
    ],
  });

  useEffect(() => {
    const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    if (userProfile.bookmarks) {
      const updatedBookmarks = userProfile.bookmarks.map(bookmark => {
        const manga = mangaData[bookmark.id];
        const volumes = volumesData[bookmark.id] || [];
        if (manga) {
          const volume = volumes.find(v => v.chapters.includes(bookmark.chapter)) || { volume: 1 };
          return {
            ...bookmark,
            title: manga.title,
            volume: volume.volume,
          };
        }
        return bookmark;
      });
      setUser(prevUser => ({ ...prevUser, bookmarks: updatedBookmarks }));
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 bg-[#f5e6d3]">
      <div className="flex items-center mb-8">
        <Avatar className="h-24 w-24 mr-4">
          <img src={user.avatar} alt={user.name} className="rounded-full" />
        </Avatar>
        <h1 className="text-3xl font-bold text-[#4a3728]">{user.name}</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-[#e8d5b5] border-[#8c6d4f]">
          <CardHeader>
            <CardTitle className="text-[#4a3728]">Friends</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-[#6b5744]">
              {user.friends.map((friend, index) => (
                <li key={index}>{friend}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="bg-[#e8d5b5] border-[#8c6d4f]">
          <CardHeader>
            <CardTitle className="text-[#4a3728]">Bookmarks</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {user.bookmarks.map((bookmark) => (
                <li key={bookmark.id}>
                  <Link 
                    to={`/manga/${bookmark.id}/read?chapter=${bookmark.chapter}&page=${bookmark.page}`} 
                    className="text-[#8c6d4f] hover:underline"
                  >
                    {bookmark.title} (Volume {bookmark.volume}, Chapter {bookmark.chapter}, Page {bookmark.page + 1})
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="bg-[#e8d5b5] border-[#8c6d4f]">
          <CardHeader>
            <CardTitle className="text-[#4a3728]">Read Manga</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {user.readManga.map((manga) => (
                <li key={manga.id}>
                  <Link to={`/manga/${manga.id}`} className="text-[#8c6d4f] hover:underline">
                    {manga.title}
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
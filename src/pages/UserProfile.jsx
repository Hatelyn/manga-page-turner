import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mangaData, volumesData } from '../pages/MangaDetail';
import { Skull, Ghost, Biohazard } from 'lucide-react';

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
      setUser(prevUser => ({ ...prevUser, bookmarks: userProfile.bookmarks }));
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 bg-horror-900 text-horror-100">
      <div className="flex items-center mb-8">
        <Avatar className="h-24 w-24 mr-4">
          <img src={user.avatar} alt={user.name} className="rounded-full" />
        </Avatar>
        <h1 className="text-3xl font-bold flex items-center">
          <Skull className="mr-2" />
          {user.name}
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-horror-800 border-horror-700">
          <CardHeader>
            <CardTitle className="text-horror-100 flex items-center">
              <Ghost className="mr-2" />
              Friends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-horror-200">
              {user.friends.map((friend, index) => (
                <li key={index}>{friend}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="bg-horror-800 border-horror-700">
          <CardHeader>
            <CardTitle className="text-horror-100 flex items-center">
              <Biohazard className="mr-2" />
              Bookmarks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {user.bookmarks.map((bookmark) => (
                <li key={bookmark.id}>
                  <Link 
                    to={`/manga/${bookmark.id}/read/${bookmark.slug}`} 
                    className="text-horror-300 hover:text-horror-100 hover:underline"
                  >
                    {bookmark.title} (Volume {bookmark.volume}, Chapter {bookmark.chapter}, Page {bookmark.page})
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="bg-horror-800 border-horror-700">
          <CardHeader>
            <CardTitle className="text-horror-100 flex items-center">
              <Ghost className="mr-2" />
              Read Manga
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {user.readManga.map((manga) => (
                <li key={manga.id}>
                  <Link to={`/manga/${manga.id}`} className="text-horror-300 hover:text-horror-100 hover:underline">
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
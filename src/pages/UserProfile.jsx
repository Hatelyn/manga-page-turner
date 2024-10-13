import React from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const UserProfile = () => {
  const user = {
    name: 'John Doe',
    avatar: '/placeholder.svg',
    friends: ['Alice', 'Bob', 'Charlie'],
    bookmarks: [
      { id: 1, title: 'Naruto' },
      { id: 3, title: 'Attack on Titan' },
      { id: 5, title: 'Death Note' },
    ],
    readManga: [
      { id: 1, title: 'Naruto' },
      { id: 2, title: 'One Piece' },
      { id: 4, title: 'My Hero Academia' },
      { id: 6, title: 'Fullmetal Alchemist' },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Avatar className="h-24 w-24 mr-4">
          <img src={user.avatar} alt={user.name} className="rounded-full" />
        </Avatar>
        <h1 className="text-3xl font-bold">{user.name}</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Friends</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {user.friends.map((friend, index) => (
                <li key={index}>{friend}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Bookmarks</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {user.bookmarks.map((bookmark) => (
                <li key={bookmark.id}>{bookmark.title}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Read Manga</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {user.readManga.map((manga) => (
                <li key={manga.id}>{manga.title}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
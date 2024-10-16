import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const initialComments = {
  1: [
    { id: 1, name: 'Naruto Fan', content: 'Believe it! This manga is amazing!', timestamp: '2023-05-15' },
    { id: 2, name: 'Sasuke', content: 'Hn. It\'s not bad.', timestamp: '2023-05-16' },
  ],
  2: [
    { id: 1, name: 'Luffy', content: 'I\'m gonna be the Pirate King!', timestamp: '2023-05-14' },
    { id: 2, name: 'Zoro', content: 'Where am I? I got lost in this manga...', timestamp: '2023-05-15' },
  ],
  // ... Add initial comments for other manga IDs
};

const CommentSection = ({ mangaId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ name: '', content: '' });

  useEffect(() => {
    setComments(initialComments[mangaId] || []);
  }, [mangaId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.name && newComment.content) {
      const currentDate = new Date().toISOString().split('T')[0];
      setComments([...comments, { ...newComment, id: Date.now(), timestamp: currentDate }]);
      setNewComment({ name: '', content: '' });
    }
  };

  return (
    <div className="mt-12 bg-horror-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-horror-100">Comments</h2>
      <form onSubmit={handleSubmit} className="mb-8">
        <Input
          type="text"
          placeholder="Your Name"
          value={newComment.name}
          onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
          className="mb-2 bg-horror-700 text-horror-100"
        />
        <Textarea
          placeholder="Your Comment"
          value={newComment.content}
          onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
          className="mb-2 bg-horror-700 text-horror-100"
        />
        <Button type="submit" className="bg-horror-600 text-horror-100 hover:bg-horror-500">Post Comment</Button>
      </form>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-horror-700 p-4 rounded-lg shadow">
            <h3 className="font-bold text-horror-100">{comment.name}</h3>
            <p className="text-horror-200">{comment.content}</p>
            <p className="text-sm text-horror-300 mt-2">{comment.timestamp}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
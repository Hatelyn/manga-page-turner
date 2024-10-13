import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const CommentSection = ({ mangaId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ name: '', content: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.name && newComment.content) {
      setComments([...comments, { ...newComment, id: Date.now() }]);
      setNewComment({ name: '', content: '' });
    }
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <form onSubmit={handleSubmit} className="mb-8">
        <Input
          type="text"
          placeholder="Your Name"
          value={newComment.name}
          onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
          className="mb-2"
        />
        <Textarea
          placeholder="Your Comment"
          value={newComment.content}
          onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
          className="mb-2"
        />
        <Button type="submit">Post Comment</Button>
      </form>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-bold">{comment.name}</h3>
            <p>{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
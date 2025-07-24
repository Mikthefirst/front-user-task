import React, { useState } from 'react';
import { User as UserType } from '../../types';
import { Edit, Trash2, User } from 'lucide-react';
import { Button } from '../common/Button';

interface UserCardProps {
  user: UserType;
  onEdit: (user: UserType) => void;
  onDelete: (user: UserType) => void;
}

export function UserCard({ user, onEdit, onDelete }: UserCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="aspect-square relative">
        {!imageError ? (
          <img
            src={user.photo}
            alt={`${user.firstName} ${user.lastName}`}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <User size={64} className="text-gray-400" />
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {user.firstName} {user.lastName}
        </h3>
        
        <div className="space-y-1 text-sm text-gray-600 mb-4">
          <div className="flex justify-between">
            <span>Height:</span>
            <span>{user.height} cm</span>
          </div>
          <div className="flex justify-between">
            <span>Weight:</span>
            <span>{user.weight} kg</span>
          </div>
          <div className="flex justify-between">
            <span>Gender:</span>
            <span className="capitalize">{user.gender}</span>
          </div>
          <div className="text-xs text-gray-500 mt-2">
            <span>{user.residence}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => onEdit(user)}
            className="flex-1"
          >
            <Edit size={16} />
            Edit
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={() => onDelete(user)}
            className="flex-1"
          >
            <Trash2 size={16} />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
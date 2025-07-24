import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAPI } from '../hooks/useUserAPI';
import { CreateUserData } from '../types';
import { UserForm } from '../components/user/UserForm';
import { Button } from '../components/common/Button';
import { Toast } from '../components/common/Toast';
import { ArrowLeft } from 'lucide-react';

export function CreateUser() {
  const navigate = useNavigate();
  const { createUser } = useUserAPI();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'warning' } | null>(null);

  const handleSubmit = async (data: CreateUserData) => {
    setLoading(true);
    const result = await createUser(data);
    setLoading(false);

    if (result.success) {
      setToast({ message: 'User created successfully!', type: 'success' });
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } else {
      setToast({ message: result.message || 'Failed to create user', type: 'error' });
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => navigate('/')}
        >
          <ArrowLeft size={16} />
          Back to Users
        </Button>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Create New User</h2>
        <p className="text-gray-600">Add a new user to the database</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <UserForm
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
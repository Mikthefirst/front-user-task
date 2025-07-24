import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useUserAPI } from '../hooks/useUserAPI';
import { CreateUserData } from '../types';
import { UserForm } from '../components/user/UserForm';
import { Button } from '../components/common/Button';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { Toast } from '../components/common/Toast';
import { ArrowLeft } from 'lucide-react';

export function EditUser() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { state } = useUser();
  const { fetchUserById, updateUser } = useUserAPI();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'warning' } | null>(null);

  useEffect(() => {
    if (id) {
      fetchUserById(id);
    }
  }, [id]);

  const handleSubmit = async (data: CreateUserData) => {
    if (!id) return;

    setLoading(true);
    const result = await updateUser({ ...data, id });
    setLoading(false);

    if (result.success) {
      setToast({ message: 'User updated successfully!', type: 'success' });
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } else {
      setToast({ message: result.message || 'Failed to update user', type: 'error' });
    }
  };

  if (state.loading && !state.currentUser) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (state.error) {
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
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-red-800 mb-2">Error</h3>
          <p className="text-red-600">{state.error}</p>
          <Button 
            size="sm" 
            className="mt-4"
            onClick={() => id && fetchUserById(id)}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!state.currentUser) {
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
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">User not found</h3>
          <p className="text-gray-600">The user you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

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
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Edit User</h2>
        <p className="text-gray-600">
          Update information for {state.currentUser.firstName} {state.currentUser.lastName}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <UserForm
          initialData={state.currentUser}
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
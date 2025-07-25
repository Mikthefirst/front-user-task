import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useUserAPI } from '../hooks/useUserAPI';
import { User as UserType } from '../types';
import { UserCard } from '../components/user/UserCard';
import { Pagination } from '../components/user/Pagination';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { Modal } from '../components/common/Modal';
import { Button } from '../components/common/Button';
import { Toast } from '../components/common/Toast';
import { Plus, Search } from 'lucide-react';

export function UserList() {
  const navigate = useNavigate();
  const { state } = useUser();
  const { fetchUsers, deleteUser } = useUserAPI();
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; user: UserType | null }>({
    isOpen: false,
    user: null,
  });
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'warning' } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers(1, 10);
  }, []);

  const handlePageChange = (page: number) => {
    fetchUsers(page, state.pagination.limit);
  };

  const handleEdit = (user: UserType) => {
    navigate(`/edit/${user.id}`);
  };

  const handleDeleteClick = (user: UserType) => {
    setDeleteModal({ isOpen: true, user });
  };

const handleDeleteConfirm = async () => {
  if (!deleteModal.user) return;

  const result = await deleteUser(deleteModal.user.id);

  if (result.success) {
    setToast({ message: "User deleted successfully", type: "success" });

    const currentPage = state.pagination.currentPage;
    const limit = state.pagination.limit;
    const newTotal = state.pagination.total - 1;
    const newTotalPages = Math.ceil(newTotal / limit);

    // Decide what page to fetch after deletion
    let targetPage = currentPage;

    if (newTotal === 0) {
      targetPage = 1;
    } else if (currentPage > newTotalPages) {
      targetPage = newTotalPages;
    }

    fetchUsers(targetPage, limit);
  } else {
    setToast({
      message: result.message || "Failed to delete user",
      type: "error",
    });
  }

  setDeleteModal({ isOpen: false, user: null });
};


  const filteredUsers = Array.isArray(state.users)
    ? state.users.filter(
        (user) =>
          `${user.firstName} ${user.lastName}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          user.residence?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  if (state.loading && state.users.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Users</h2>
          <p className="text-gray-600">Manage your user database</p>
        </div>
        
        <Button onClick={() => navigate('/create')}>
          <Plus size={20} />
          Add New User
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search users by name or residence..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {state.error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{state.error}</p>
          <Button 
            size="sm" 
            className="mt-2"
            onClick={() => fetchUsers(state.pagination.currentPage, state.pagination.limit)}
          >
            Try Again
          </Button>
        </div>
      )}

      {filteredUsers.length === 0 && !state.loading ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Plus size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm ? 'No users match your search criteria.' : 'Get started by creating your first user.'}
          </p>
          {!searchTerm && (
            <Button onClick={() => navigate('/create')}>
              Create First User
            </Button>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredUsers.map(user => (
              <UserCard
                key={user.id}
                user={user}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>

          {!searchTerm && (
            <Pagination
              currentPage={state.pagination.currentPage}
              totalPages={state.pagination.totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}

      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, user: null })}
        title="Delete User"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete{' '}
            <strong>
              {deleteModal.user?.firstName} {deleteModal.user?.lastName}
            </strong>
            ? This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <Button
              variant="danger"
              onClick={handleDeleteConfirm}
              loading={state.loading}
              className="flex-1"
            >
              Delete
            </Button>
            <Button
              variant="secondary"
              onClick={() => setDeleteModal({ isOpen: false, user: null })}
              disabled={state.loading}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

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
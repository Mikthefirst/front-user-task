# User Management SPA

A modern, responsive single-page application for managing user data, built with React and TypeScript. Features full CRUD operations, pagination, search functionality, and a beautiful user interface.

## 🚀 Features

- **User Management**: Create, read, update, and delete users
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Search & Filter**: Find users by name or residence
- **Pagination**: Navigate through large datasets efficiently
- **Form Validation**: Comprehensive client-side validation
- **Modern UI**: Clean, professional interface with smooth animations
- **Type Safety**: Full TypeScript implementation
- **State Management**: Context API for global state
- **Mock API**: LocalStorage-based persistence for development

## 🛠️ Technologies

- **Frontend**: React 18 + TypeScript
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: Context API + useReducer
- **Build Tool**: Vite
- **Code Quality**: ESLint + TypeScript

## 📋 User Data Structure

Each user contains the following information:
- First Name & Last Name
- Height (cm) & Weight (kg)
- Gender (Male, Female, Other)
- Residence (City, Country)
- Photo (URL)
- Timestamps (Created/Updated)

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Generic components (Button, Modal, etc.)
│   ├── layout/         # Layout components (Header)
│   └── user/          # User-specific components
├── context/           # Context API setup
├── hooks/             # Custom React hooks
├── pages/             # Main page components
├── services/          # API service layer
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
└── main.tsx          # Application entry point
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd user-management-spa
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📱 Routes

- `/` - User list with pagination and search
- `/create` - Create new user form
- `/edit/:id` - Edit existing user form

## 🎨 Key Components

### UserCard
Displays user information in a card format with edit/delete actions.

### UserForm
Reusable form component for creating and editing users with validation.

### Pagination
Smart pagination component with ellipsis for large datasets.

### Modal
Accessible modal component for confirmations and dialogs.

## 🔧 API Endpoints (Mock)

The application uses a mock API service that simulates:

```typescript
GET    /users?page=1&limit=10  // Get paginated users
GET    /users/:id              // Get user by ID
POST   /users                  // Create new user
PUT    /users/:id              // Update user
DELETE /users/:id              // Delete user
```

## 📊 State Management

The application uses Context API with useReducer for predictable state management:

- **UserContext**: Manages user data, loading states, and errors
- **Custom Hooks**: Abstracts API calls and state updates
- **Type Safety**: Full TypeScript coverage for all state operations

## 🎯 Form Validation

Comprehensive validation includes:
- Required field validation
- Length constraints
- Numeric range validation
- URL format validation
- Real-time error display

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first approach
- Adaptive grid layouts
- Touch-friendly interactions
- Optimized for all screen sizes

## 🚀 Build & Deploy

### Build for production:
```bash
npm run build
```

### Preview production build:
```bash
npm run preview
```

### Lint code:
```bash
npm run lint
```

## 🔮 Future Enhancements

- Advanced filtering and sorting options
- Bulk operations (delete multiple users)
- Export data to CSV/Excel
- User profile images upload
- Advanced search with filters
- Data visualization and analytics
- Real backend integration
- Authentication and authorization
- Offline support with service workers

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

If you encounter any issues or have questions, please create an issue in the repository.
import React, { useState } from 'react';
import './SearchBar.css'; // Import the CSS file

const SearchBar = ({ users, onUserSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter users based on search query
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="dropdown-container">
      <input
        type="text"
        className="user-search"
        placeholder="Search for a user..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {searchQuery && (
        <div className="search-results">
          {filteredUsers.map((user, index) => (
            <div
              key={index}
              className="search-result-item"
              onClick={() => {
                onUserSelect(user);  // Pass selected user to parent
                setSearchQuery('');  // Clear search input after selection
              }}
            >
              {user.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

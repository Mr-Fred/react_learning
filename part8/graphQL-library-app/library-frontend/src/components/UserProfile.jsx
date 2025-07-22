// Edit user info form
import { useState, useEffect } from 'react';
import { UPDATE_USER } from '../lib/queries';
import { useMutation } from '@apollo/client';
import Recommendations from './Recommendations';
import PropTypes from 'prop-types';

const UserProfile = ({ user }) => {
  // Local state to store editable fields
  const [username, setUsername] = useState(user.username);
  const [favoriteGenre, setFavoriteGenre] = useState(user.favoriteGenre);
  const [isEditing, setIsEditing] = useState(false);

  const [updateUser] = useMutation(UPDATE_USER, {
    onError: (error) => {
      console.log(error.graphQLErrors)
    },


  })

  // Handle form submission (when user clicks 'Save')
  const handleSave = async () => {
    await updateUser(
      {
        variables: {
          username: username,
          favoriteGenre: favoriteGenre
        }
      }
    );
    setIsEditing(false);
    localStorage.setItem('library-user', username);
    localStorage.setItem('user-favorite-genre', favoriteGenre);
  };

  // Handle field changes
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleFavoriteGenreChange = (event) => {
    setFavoriteGenre(event.target.value);
  };

  // Toggle editing mode
  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  useEffect(() => {
    // If user prop changes (after a successful update), reset state
    setUsername(user.username);
    setFavoriteGenre(user.favoriteGenre);
  }, [user]);

  return (
    <div className="user-profile">
      <h2>User Profile</h2>

      <div className="user-info">
        <div>
          <strong>Username:</strong>
          {isEditing ? (
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
          ) : (
            <span>{username}</span>
          )}
        </div>

        <div>
          <strong>Favorite Genre:</strong>
          {isEditing ? (
            <input
              type="text"
              value={favoriteGenre}
              onChange={handleFavoriteGenreChange}
            />
          ) : (
            <span>{favoriteGenre}</span>
          )}
        </div>
      </div>

      <div className="buttons">
        {isEditing ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <button onClick={toggleEdit}>Edit</button>
        )}
      </div>
      <Recommendations user={user}/>
    </div>
  );
};

// Prop validation
UserProfile.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserProfile;

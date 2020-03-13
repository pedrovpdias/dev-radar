import React, { useState } from 'react';

import './style.css';

function DevItem({ dev, onSubmit }) {
const [ github_username, setGithub_username ] = useState();

  async function deleteHandler(e) {
    e.preventDefault();
    await onSubmit({
      github_username
    });
  
  }

    return (
        <li className="dev-item">
          <header>
            <img src={dev.avatar_url} alt={dev.name} />
            <div className="user-info">
              <strong>{dev.name}</strong>
              <span>{dev.techs.join(', ')}</span>
            </div>
            <div className="user-delete">
              <form onSubmit={deleteHandler}>
                <button type="submit" onClick={e => setGithub_username(e.target.value = dev.github_username)}>X</button>
              </form>
            </div>
          </header>
          <p>{dev.bio}</p>
          <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no Github</a>
        </li>
    );
};

export default DevItem;
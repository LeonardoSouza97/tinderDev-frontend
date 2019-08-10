import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Main.css';
import Logo from '../assets/logo.svg'
import Like from '../assets/like.svg'
import Dislike from '../assets/dislike.svg'
import api from '../services/api'
export default function Main({ match }) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function loadUsers() {
            const response = await api.get('/devs', {
                headers: {
                    user: match.params.id
                }
            });
            setUsers(response.data);
        }
        loadUsers();
    }, [match.params.id]);

    async function handleLike(id) {
        await api.post(`/devs/${id}/likes`, null, {
            headers: { user: match.params.id }
        });
        setUsers(users.filter(user => user._id !== id));
    }

    async function handleDislike(id) {
        await api.post(`/devs/${id}/dislikes`, null, {
            headers: { user: match.params.id }
        });
        setUsers(users.filter(user => user._id !== id));
    }


    return (
        <div id="main" className="main-container">
            <Link to="/">
                <img src={Logo} alt="Logo"></img>
            </Link>
            {users.length > 0 ? (<ul>
                {users.map(user => (
                    <li key={user._id}>
                        <img src={user.avatar} alt={user.name}></img>
                        <footer>
                            <strong>{user.name}</strong>
                            <p>{user.bio}</p>
                        </footer>
                        <div className="buttons">
                            <button type="button" onClick={() => handleLike(user._id)}>
                                <img src={Like} alt="Logo"></img>
                            </button>
                            <button type="button" onClick={() => handleDislike(user._id)}>
                                <img src={Dislike} alt="Logo"></img>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            ) : (
                    <div className="empty">Acabou :(</div>
                )}
        </div>
    )
}
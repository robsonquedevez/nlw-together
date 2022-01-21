import React from "react";
import { Link } from 'react-router-dom';

import Button from '../components/Button';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import '../styles/auth.scss';

const NewRoom: React.FC = () => {   
    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Illustration" />
                <strong>Create live Q&amp;A rooms</strong>
                <p>Clear the doubts of your audience in real time</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask brand" />
                    <h2>Create new room</h2>
                    <form>
                        <input 
                            type="text" 
                            placeholder="room name"
                            />
                        <Button
                            type="submit"
                            >
                            create room
                        </Button>
                    </form>
                    <p>
                        Want to join an existing room? <Link to="/">Click here</Link>
                    </p>
                </div>
            </main>
        </div>
    );
}

export default NewRoom;
import React, { useCallback } from "react";
import { useNavigate } from 'react-router-dom';

import Button from '../components/Button';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import '../styles/auth.scss';

const Home: React.FC = () => {
    const navegate = useNavigate();

    const navigateToNewRoom = useCallback(() => {
        navegate('/roons/new');
    }, []);


    const signIn = useCallback(() => {}, []);
    
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
                    <button onClick={navigateToNewRoom} className="create-room">
                        Create your room with Google
                        <img src={googleIconImg} alt="Google brand" />
                    </button>
                    <div className="separator">or enter a room</div>
                    <form>
                        <input 
                            type="text" 
                            placeholder="enter room code"
                            />
                        <Button
                            type="submit"
                            >
                            Enter the room
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default Home;
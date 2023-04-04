// import logo from './Notate-blue-rounded.svg';
import { Container } from 'react-bootstrap';
import LoginModal from './components/LoginModal';
import NavBar from './components/NavBar';
import SignUpModal from './components/SignUpModal';
import styles from './styles/NotesPage.module.css';
import { useEffect, useState } from 'react';
import { User } from './models/user';
import * as NotesApi from './network/notes_api';
import { set } from 'react-hook-form';
import NotesPageLoggedInView from './components/NotesPageLoggedInView';
import NotesPageLoggedOutView from './components/NotesPageLoggedOutView';

function App() {

    const[loggedInUser, setLoggedInUser] = useState<User|null>(null);
    const[showSignUpModal, setShowSignUpModal] = useState(false);
    const[showLoginModal, setShowLoginModal] = useState(false);

    useEffect(() => {
        async function fetchLoggedInUSer() {
            try {
                const user = await NotesApi.getLoggedInUser();   
                setLoggedInUser(user);              
            } catch (error) {
                console.error(error);
            }
        }
        fetchLoggedInUSer();
    }, []);

    return (
        <div>
            <NavBar
                loggedInUser={loggedInUser}
                onSignUpClicked={() => setShowSignUpModal(true)}
                onLoginClicked={() => setShowLoginModal(true)}
                onLogoutSuccessful={() => setLoggedInUser(null)}
            />
            <Container className={styles.notesPage}>
                <>
                { loggedInUser 
                    ? <NotesPageLoggedInView />
                    : <NotesPageLoggedOutView />
                }
                </>
            </Container>

            { showSignUpModal &&
                <SignUpModal
                    onDismiss={() => setShowSignUpModal(false)}
                    onSignUpSuccessful={(user) => {
                        setLoggedInUser(user);
                        setShowSignUpModal(false);
                    }}
                />
            }
            { showLoginModal &&
                <LoginModal
                    onDismiss={() => setShowLoginModal(false)}
                    onLoginSuccessful={(user) => {
                        setLoggedInUser(user);
                        setShowLoginModal(false);
                    }}
                />
            }
        </div>
    );
}

export default App;

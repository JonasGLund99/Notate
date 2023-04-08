import { Button, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import * as NotesApi from '../network/notes_api';

interface NavBarLoggedInViewProps {
    user: User,
    onLogoutSuccessful: () => void,
}

const NavBarLoggedInView = ({user, onLogoutSuccessful} : NavBarLoggedInViewProps) => {
    
    async function logout() {
        try {
            await NotesApi.logout();
            onLogoutSuccessful();
        } catch (error) {
            alert(error);
            console.error(error);
        }
        window.location.reload();
    }
    
    return (  
        <>
            <Navbar.Text className="me-2">
                Logged in as: {user.username}
            </Navbar.Text>
            <Button onClick={logout}>
                Log out
            </Button>
        </>
    );
}
 
export default NavBarLoggedInView;
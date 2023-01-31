import { Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import './NavBar.css'
const NavBar = () => {
    const navigate = useNavigate()
    return (
        <div className='NavBar'>
            <Button onClick={() => navigate('/signIn')}>Logout</Button>
        </div>
    )
}
export default NavBar;
import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const { isAuthenticated, login, logout } = useContext(AuthContext)
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
        navigate('/');
        
    }
    return (
        <nav className={styles.navbar}>
            <div>
                <img src="/logopy2.png" className={styles.navbarlogo} alt="logo" />
            </div>

            <ul className={styles.navbarLinks}>

                <li><Link to='/'>Home</Link></li>
                {isAuthenticated && (
                    <>
                        <li><Link to='profile'>Profile</Link></li>
                        <li><Link to='transaction'>Transaction</Link></li>
                        <li><Link to='admin'>Admin</Link></li>
                    </>
                )}
                <li><Link to='about'>About</Link></li>
                <li><Link to='contact'>Contact</Link></li>
                {/* {isAuthenticated ? <LogoutButton /> : <LoginButton />} */}
                {!isAuthenticated ? (
                    <li><Link to='/' onClick={login}>Login</Link></li>
                ) : (
                    <li><Link to='/' onClick={handleLogout}>Logout</Link></li>
                )}
                

            </ul>
        </nav>
    )
}

export default Navbar
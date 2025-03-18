import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {

    const { isAuthenticated, login, logout } = useContext(AuthContext)

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
        
    }
    return (
        <nav className={styles.navbar}>
            <div>
                <img src="/logopy.png" className={styles.navbarlogo} alt="logo" />
            </div>

            <ul className={styles.navbarLinks}>

                <li><Link to='/'>Home</Link></li>
                {isAuthenticated && (
                    <>
                        <li><Link to='profile'>Profile</Link></li>
                        <li><Link to='operation'>Operations</Link></li>
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
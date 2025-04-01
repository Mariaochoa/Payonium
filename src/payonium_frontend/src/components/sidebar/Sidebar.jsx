import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <ul>
        <li>
          <NavLink 
            to="/admin/profiles" 
            className={({ isActive }) => isActive ? styles.active : undefined}
          >
            Profiles
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/admin/accounts" 
            className={({ isActive }) => isActive ? styles.active : undefined}
          >
            Accounts
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/admin/orders" 
            className={({ isActive }) => isActive ? styles.active : undefined}
          >
            Orders
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/admin/transactions" 
            className={({ isActive }) => isActive ? styles.active : undefined}
          >
            Transactions
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;

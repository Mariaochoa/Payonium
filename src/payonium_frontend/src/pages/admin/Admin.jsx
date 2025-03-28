import Sidebar from '../../components/sidebar/Sidebar';
import { Routes, Route } from 'react-router-dom';
import styles from './Admin.module.css'; 
import Profiles from './profiles/Profiles'; 
import Accounts from './accounts/Accounts';
import Orders from './orders/Orders';
import Transactions from './transactions/Transactions';

function Admin() {
  return (
    <div className={styles.adminLayout}> 
      <Sidebar />
      <div className={styles.adminContent}>
        <h1>Administration</h1>
        {/* Rutas anidadas para cada sección */}
        <Routes>
        <Route path="/" element={<h2>Bienvenido</h2>} />
          <Route path="profiles" element={<Profiles />} />
          <Route path="accounts" element={<Accounts />} />
          <Route path="orders" element={<Orders />} />
          <Route path="transactions" element={<Transactions />} />
        </Routes>
      </div>
    </div>
  );
}

export default Admin;

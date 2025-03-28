
import { useContext, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { createActor } from 'declarations/payonium_backend';
import styles from '../../transaction/Transaction.module.css';

function orders() {


    const { isAuthenticated, identity } = useContext(AuthContext);
  
    let canisterId = process.env.CANISTER_ID_PAYONIUM_BACKEND;
  
    const backend = createActor(canisterId, {
      agentOptions: {
        identity: identity,
        host: "http://localhost:4943",
      },
    });
  
  
    const [principal, setPrincipal] = useState('');
    const [orderResult, setOrderResult] = useState(null);
    const [orderDniResult, setOrderDniResult] = useState(null);
    const [orderData, setOrderData] = useState({
      amount: 0,
      currency: '',
      account: '',
      description: '',
      dni: '',
      email: '',
    });
    const [userStatus, setUserStatus] = useState('');
    const [orders, setOrders] = useState([]);
    const [ordersDni, setOrdersDni] = useState([]);
    const [dniSearch, setDniSearch] = useState('');
  
  
  
    // Función para obtener el principal del usuario
    async function handleWhoAmI() {
      const principal = await backend.whoAmI();
      setPrincipal(principal.toString());
    }
  
    // Función para verificar si el usuario está activo
    async function isUserActive() {
      if (!isAuthenticated) {
        alert("Debe estar logueado para verificar el estado del usuario.");
        return;
      }
  
      const userPrincipalText = identity.getPrincipal().toText();
  
      try {
        const result = await backend.isUserActive(userPrincipalText);
        if (result) {
          //alert(result ? "El usuario está activo." : "El usuario no está activo.");
          setUserStatus("El usuario esta activo");
        } else {
          //alert("No se pudo verificar el estado del usuario.");
          setUserStatus("El usuario no esta activo")
        }
      } catch (err) {
        console.log(err);
        //alert("Error al verificar el estado del usuario.");
        setUserStatus("Error al verificar el estado del usuario");
      }
    }
  
    // Función para registrar una orden
    async function handleRegisterOrder(e) {
      e.preventDefault();
      if (!isAuthenticated) {
        alert("Debe estar logueado para registrar una orden.");
        return;
      }
  
      const newOrder = {
        amount: orderData.amount,
        currency: orderData.currency,
        account: orderData.account,
        description: orderData.description,
        dni: orderData.dni,
        email: orderData.email,
        owner: identity.getPrincipal(),
      };
  
      try {
        const result = await backend.registerOrder(newOrder);
        if (result) {
          setOrderResult("Orden registrada exitosamente.");
        } else {
          setOrderResult("Error al registrar la orden: " + result.err);
        }
      } catch (err) {
        console.log(err);
        setOrderResult("Error al registrar la orden.");
      }
    }
  
    // Manejadores para el formulario de la orden
    const handleOrderChange = (e) => {
      const { name, value } = e.target;
      setOrderData({
        ...orderData,
        [name]: name === 'amount' ? Number(value) : value,
      });
    };
  
    // Función para obtener todas las órdenes
    async function handleGetAllOrders() {
      try {
        const response = await backend.getAllOrders();
        const orders = response.ok.orders;
        console.log("Todas las órdenes:", orders);
        setOrders(orders);
        //setOrderResult("Órdenes obtenidas exitosamente.");
      } catch (err) {
        console.log(err);
        //setOrderResult("Error al obtener las órdenes.");
      }
    }
  
    // Función para obtener las órdenes por DNI
    async function handleGetOrdersByDni() {
      if (!dniSearch) {
        alert("Por favor ingrese un DNI para consultar las órdenes.");
        return;
      }
  
      try {
        const response = await backend.getOrdersByDni(dniSearch);
        const orders = response.ok.orders;
        console.log("Órdenes por DNI:", orders);
        setOrdersDni(orders);
        //setOrderResult("Órdenes obtenidas exitosamente.");
      } catch (err) {
        console.log(err);
        //setOrderResult("Error al obtener las órdenes por DNI.");
      }
    }
  
  
  
  
    return (
      <div className={styles.container}>
        <div className={styles.operationSection}>
          <button onClick={handleWhoAmI}>Who Am I?</button>
          <section id="principal">{principal}</section>
        </div>
  
        <div className={styles.isUserActiveWrapper}>
          <button onClick={isUserActive}>Check if User is Active</button>
          {userStatus && <div id="principal" className={styles.userStatus}>{userStatus}</div>}
        </div>
  
  
        <div className={styles.orderSection}>
          <h3>Register a New Order</h3>
          <form onSubmit={handleRegisterOrder}> 
            <input type="number" placeholder="Amount" name="amount" value={orderData.amount} onChange={handleOrderChange} />
            <input type="text" placeholder="Currency" name="currency" value={orderData.currency} onChange={handleOrderChange} />
            <input type="text" placeholder="Account" name="account" value={orderData.account} onChange={handleOrderChange} />
            <input type="text" placeholder="Description" name="description" value={orderData.description} onChange={handleOrderChange} />
            <input type="text" placeholder="DNI" name="dni" value={orderData.dni} onChange={handleOrderChange} />
            <input type="email" placeholder="Email" name="email" value={orderData.email} onChange={handleOrderChange} />
            <div className={styles.formFooter}>
              <button type="submit">Register Order</button>
            </div>
          </form>
  
          {orderResult && <div className={styles.orderResult}>{orderResult}</div>}
        </div>
  
        <div className={styles.orderQueryWrapper}>
          <button onClick={handleGetAllOrders}>Get All Orders</button>
          <div className={styles.orderSection}>
  
            {orders.length > 0 ? (
              <ul>
                <h3>All Orders</h3>
                {orders.map((order, index) => (
                  <li key={index}>
                    <div className="order-item">
                      <p><strong>DNI:</strong> {order.dni}</p>
                      <p><strong>Description:</strong> {order.description}</p>
                      <p><strong>Email:</strong> {order.email}</p>
                      <p><strong>Amount:</strong> {Number(order.amount)}</p>
                      <p><strong>Currency:</strong> {order.currency}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No orders available.</p>
            )}
          </div>
  
          <div className={styles.orderQueryWrapper}>
  
            <form onSubmit={(e) => { e.preventDefault(); handleGetOrdersByDni(); }}>
              <input type="text" placeholder="Ingrese dni a consultar" value={dniSearch} onChange={(e) => setDniSearch(e.target.value)} />
  
              <button type="submit">Get Orders by DNI</button>
            </form>
            {/* Mostramos el resultado de la consulta, ya sea un mensaje de éxito o error */}
            {orderDniResult && <div className={styles.orderResult}>{orderDniResult}</div>}
  
            <div className={styles.orderSection}>
              {ordersDni.length > 0 ? (
                <ul>
                  {ordersDni.map((order, index) => (
                    <li key={index}>
                      <div className="order-item">
                        <p><strong>DNI:</strong> {order.dni}</p>
                        <p><strong>Description:</strong> {order.description}</p>
                        <p><strong>Email:</strong> {order.email}</p>
                        <p><strong>Amount:</strong> {Number(order.amount)}</p>
                        <p><strong>Currency:</strong> {order.currency}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No orders found for the given DNI.</p>
              )}
            </div>
          </div>
  
  
        </div>
  
      </div>
    );
  }
  

export default orders






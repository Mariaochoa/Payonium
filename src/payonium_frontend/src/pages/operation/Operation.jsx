import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext'; 
import { createActor } from 'declarations/payonium_backend';
import styles from './Operation.module.css'; 

function Operation() {
  const { isAuthenticated, identity } = useContext(AuthContext); 
  const [principal, setPrincipal] = useState('');
  const [orderResult, setOrderResult] = useState(null); 
  const [orderData, setOrderData] = useState({
    amount: 0,
    currency: '',
    account: '',
    description: '',
    dni: '',
    email: '',
  });


  const canisterId = process.env.CANISTER_ID_PAYONIUM_BACKEND;
  const backend = createActor(canisterId, {
    agentOptions: {
      identity: identity,
      host: "http://localhost:4943", 
    },
  });

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
        alert(result ? "El usuario está activo." : "El usuario no está activo.");
      } else {
        alert("No se pudo verificar el estado del usuario.");
      }
    } catch (err) {
      console.log(err);
      alert("Error al verificar el estado del usuario.");
    }
  }

  // Función para registrar una orden
  async function handleRegisterOrder() {
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
    };

    try {
      const result = await backend.registerOrder(newOrder); 
      if (result.ok && result.ok.orderSuccessfullyAdded) {
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
      [name]: value,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.operationSection}>
        <button onClick={handleWhoAmI}>Who Am I?</button>
        <section id="principal">{principal}</section>
      </div>

      <div className={styles.isUserActiveWrapper}>
        <button onClick={isUserActive}>Check if User is Active</button>
      </div>

      <div className={styles.orderSection}>
        <h3>Register a New Order</h3>
        <form onSubmit={(e) => { e.preventDefault(); handleRegisterOrder(); }}>
          <input
            type="number"
            placeholder="Amount"
            name="amount"
            value={orderData.amount}
            onChange={handleOrderChange}
            required
          />
          <input
            type="text"
            placeholder="Currency"
            name="currency"
            value={orderData.currency}
            onChange={handleOrderChange}
            required
          />
          <input
            type="text"
            placeholder="Account"
            name="account"
            value={orderData.account}
            onChange={handleOrderChange}
            required
          />
          <input
            type="text"
            placeholder="Description"
            name="description"
            value={orderData.description}
            onChange={handleOrderChange}
            required
          />
          <input
            type="text"
            placeholder="DNI"
            name="dni"
            value={orderData.dni}
            onChange={handleOrderChange}
            required
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={orderData.email}
            onChange={handleOrderChange}
            required
          />
          <div className={styles.formFooter}>
            <button type="submit">Confirm Order</button>
          </div>
        </form>

        {orderResult && <div className={styles.orderResult}>{orderResult}</div>}
      </div>
    </div>
  );
}

export default Operation;

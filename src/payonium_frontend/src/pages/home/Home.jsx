import React from "react";
import styles from "./Home.module.css"; // Asegúrate de tener los estilos correspondientes

const Home = () => {
  return (
    <div className={styles.container}>

      <img src="/logopy.png" alt="PAYONIUM logo" className={styles.logopayonium2}/>

      <h1 className={styles.title}>Bienvenido a Payonium</h1>
      <p className={styles.subtitle}>Transformando los pagos transfronterizos para tu negocio</p>

      <section className={styles.section}>
        <div className={styles.imageContainer}>
          <img
            src="/AdobeStock_1046552719.jpeg"
            alt="Procesamiento de pagos"
            className={styles.image}
          />
        </div>
        <div className={styles.textContainer}>
          <h2 className={styles.sectionTitle}>Procesador de Pagos Global</h2>
          <p>
            Payonium es una plataforma de pagos que te permite aceptar pagos
            en cualquier moneda y por diversos métodos, sin importar la ubicación
            de tus clientes. Desde tarjetas de crédito hasta métodos de pago
            locales, Payonium facilita las transacciones de manera sencilla y
            rápida, permitiendo a los negocios recibir pagos de manera
            eficiente y segura.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.textContainer}>
          <h2 className={styles.sectionTitle}>Soluciones Flexibles para Negocios</h2>
          <p>
            Payonium ofrece soluciones adaptables para que tu negocio pueda
            gestionar pagos de manera eficiente. Con Payonium, puedes crear
            enlaces de pago personalizados y facilitar la integración en tu
            tienda en línea. Ya sea que vendes productos físicos, servicios o
            contenido digital, nuestra plataforma te ayuda a gestionar todos
            los pagos de manera centralizada.
          </p>
        </div>
        <div className={styles.imageContainer}>
          <img
            src="/AdobeStock_1059468704.jpeg"
            alt="Soluciones de pago"
            className={styles.image}
          />
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.imageContainer}>
          <img
            src="/AdobeStock_1063684972.jpeg"
            alt="Opciones de pago"
            className={styles.image}
          />
        </div>
        <div className={styles.textContainer}>
          <h2 className={styles.sectionTitle}>Opciones de Pago Internacionales</h2>
          <p>
            Con Payonium, puedes ofrecer a tus clientes la flexibilidad de pagar
            en su moneda local. Ya sea con tarjeta de crédito, transferencias
            bancarias o métodos de pago populares en su región, nuestra plataforma
            elimina las barreras y facilita las transacciones internacionales
            sin complicaciones, lo que te permite expandir tu negocio globalmente.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;

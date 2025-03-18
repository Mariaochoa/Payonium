import styles from './About.module.css'; 

const About = () => {
  return (
    <section className={styles.aboutWrapper}>
      <h1 className={styles.title}>Acerca de esta Plataforma</h1>
      <div className={styles.content}>
        <h2 className={styles.subtitle}>Bienvenido al Sistema mas <strong>facil</strong> y <strong>seguro</strong> de 
        transferencias de efectivo</h2>
        <p>
          Esta plataforma te permite realizar transferencias de efectivo a diferentes destinos.
          Además, podrás revisar el estado de tu transaccion asi como ver tu ultimo historial de transferencias.
        </p>
        
        <h3 className={styles.sectionTitle}>¿Cómo funciona?</h3>
        <ul className={styles.featureList}>
          <li>
            <strong>Seleccionar el tipo de envio:</strong> En la pagina de inicio proximamente, puedes navegar por una lista de metodos y 
            seleccionar aquel que tengas disponible y seleccionarlo.
          </li>
          <li>
            <strong>Iniciar sesión:</strong> Para poder operar en la plataforma, primero debes iniciar sesión 
            y se te mostrara un menu para que registres tus operaciones.
          </li>
          <li>
            <strong>Historial de transacciones:</strong> Además de la opcion de registro de transacciones, también tendrás proximamente 
            acceso a tul ultimas transacciones para que puedas validarlas, y mas adelante podras tambien exportarlas.
          </li>
        </ul>

        <h3 className={styles.sectionTitle}>¿Por qué elegir esta plataforma?</h3>
        <p>
          Esta plataforma está diseñada para ofrecerte una experiencia sencilla, agradable y segura. Puedes realizar operaciones,
          validar el estado, y ver el registro de tus ultimas operaciones.
        </p>

        <h3 className={styles.sectionTitle}>¿Cómo registrar una transaccion?</h3>
        <p>
          Al completar el formulario y darle click en confirmar, nuestro sistema se encargara de hacer todo por ti, avisarte en que
          estado esta tu operacion, y al finalizar podras observar que el servicio esta completado.
        </p>

        <p>
          ¡Gracias por usar nuestra plataforma! Esperamos que tu experiencia sea de haber recibido un servicio acorde con tus 
          expectativas.
        </p>
      </div>
    </section>
  );
};

export default About;



// import React from 'react'

// function About() {
//   return (
//     <div>Payonium es un Procesador de Pagos transfronterizos que permite 
//         aceptar pagos en cualquier moneda y con cualquier medio de pago, 
//         y permite a los negocios elegir en qué moneda desean recibir sus pagos, 
//         generando un link de pago, o integrando a Payonium en su canal online 
//         como un agregador de medios de pago alternativos (cryptos, fiat, medios 
//         de pago alternativos locales). 
        
//         Incorporamos la tecnología blockchain de ICP para procesar pagos 
//         transfronterizos en tiempo real y sin intermediarios, y para generar 
//         tokens de lealtad como cashback para compras futuras o para transferirlos 
//         entre usuarios de la red de Payonium. En el proceso interno utiliza 
//         stablecoins (USDC), rampas on/off chain para transferencias internacionales 
//         en tiempo real y a costo eficiente.</div>
//   )
// }

// export default About
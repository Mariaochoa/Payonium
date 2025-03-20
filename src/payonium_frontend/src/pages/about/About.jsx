import React from 'react';
import styles from './About.module.css';

function About() {
  return (
    <div className={styles.container}>
      <h1>Sobre Nosotros</h1>

      <section className={styles.companyInfo}>
        <h2>Reseña de la Empresa</h2>
        <p>
          Nuestra empresa fue fundada con el objetivo de transformar el mundo
          de la tecnología y los negocios, brindando soluciones innovadoras y
          disruptivas. Con un equipo comprometido, buscamos crear productos que
          mejoren la vida de nuestros usuarios y aporten valor real a la sociedad.
        </p>
      </section>

      <section className={styles.founders}>
        <h2>Fundadores</h2>
        <ul>
          <li className={styles.founder}>
            <img src="/maria.png" alt="Maria Rocio Ochoa La Torre" className={styles.founderImage} />
            <div className={styles.founderInfo}>
              <strong>Maria Rocio Ochoa La Torre</strong> - Co-fundadora y (cargo)
              <p>Emprendedora: fundadora de su propia empresa desde el año 2014, fundadora de ABPE (asociación blockchain Perú) 
                desde el 2022, conocimientos en el área financiera, modelos de negocio, ciencia de datos, blockchain, marketing digital, 
                copybranding, exportaciones, seguimiento de mercados, regulación, redacción y aplicación de normativas, arbitraje para 
                la solución de disputas en el ámbito privado.
                Economista de la UNFV (1998). Cursando una Maestría en Innovación Financiera y FINTECH de INESDI Business Techschool, 
                España, Programa de Especialización Analítica: "Advanced Data Scientist: Statistical Engineer, Machine Learning Scientist 
                and Deep Learning Scientist", (2022). Programa de Especialización en Tecnología Blockchain y Regulación de Criptoactivos, 
                Blockchain Academy Chile (2021). Diplomado Internacional de Arbitraje organizado por ESAN y La Cámara de Comercio de Lima 
                (2020). Formación de Auditor Interno en la Norma ISO/IEC 27001:2013 (Sistema de Gestión de Seguridad de la Información), 
                (2020). Egresada de la Maestría de Regulación de Servicios Públicos de la PUCP, (2007).  

</p>
            </div>
          </li>
          <li className={styles.founder}>
            <img src="/roberto.png" alt="Roberto Martinez" className={styles.founderImage} />
            <div className={styles.founderInfo}>
              <strong>Roberto Martinez</strong> - Co-fundador y (cargo)
              <p>Roberto es ......................., con más de ........ años de experiencia ..........................</p>
            </div>
          </li>
          <li className={styles.founder}>
            <img src="/gustavo.png" alt="Gustavo Fuentes Gonzales" className={styles.founderImage} />
            <div className={styles.founderInfo}>
              <strong>Gustavo Fuentes Gonzales</strong> - Co-fundador y (cargo)

              <p>Emprendedor: con 30 años de experiencia profesional, fundador de 4 empresas, algunas con más de 10 años de operación – Desarrollador de Soluciones Electrónicas 
                (ideación/prototipado/testing/fabricación/control de calidad/comercialización) de productos de seguridad y control de 
                energía para Cajeros Automáticos – Gerencia de Franquicia de Servicios de empresa Transnacional en el entorno Bancario 
                con políticas de calidad y SLA.
                Ingeniero en Electrónica de la URP (1995). Maestría en Blockchain y Smart Contract - Universidad Salamanca, España (2022), 
                Diplomado Comercio Electrónico Omnicanal y Marketing Digital Cámara Peruana de Comercio Electrónico (2020), Diplomado 
                Gerencia y Gestión de Proyectos - Colegio de Ingenieros del Perú – CESAP (2010), MBA egresado - Universidad Pacifico (2011). 
                Certificación Diseñador Cableado Estructurado - Siemon (2006), Certificación CCNA Cisco Systems (2003), Gestión de proyectos 
                con Metodología Agile – Google/Coursera (2023)
                Actualmente realiza la programacion del sistema Payonium.
</p>
            </div>
          </li>
        </ul>
      </section>

      {/* <section className={styles.partners}>
        <h2>Socios</h2>
        <p>
          Contamos con un equipo diverso de socios y colaboradores que contribuyen con su experiencia y talento para hacer crecer nuestra visión.
        </p>
      </section> */}
    </div>
  );
}

export default About;

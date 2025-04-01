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
              <strong>Maria Rocio Ochoa La Torre</strong> - Chief Executive Officer (CEO)
              <p>Economista con más de 20 años de ejercicio profesional, con formación multidisciplinaria en las áreas de finanzas, diseño de modelos de negocio y ajuste con el mercado, ciencia de datos, machine learning, Blockchain, Fintech, Innovación, Marketing Digital, copybranding, comercio internacional, seguimiento de mercados, regulación y compliance, políticas públicas, arbitraje para la solución de disputas en el ámbito privado. Actualmente Gerente General de Ocliz S.A.C. y Especialista de Interconexión en el Organismo Supervisor de Inversión Privada en Telecomunicaciones. Consultor de Naciones Unidas en temas de Blockchain y Comercio Internacional.
              </p>
              <p>Graduada del Founder Institute Inc en 2014 (www.fi.co), miembro de la ABPE (Asociación Blockchain Perú) desde el 2022, liderando actualmente la creación del Centro de Arbitraje de la ABPE para Solución de Disputas en el ámbito Privado en Asuntos de Tecnología. Actualmente cursando una Maestría en Innovación Financiera y FINTECH en INESDI Business Techschool, España. Certificación del Programa de Especialización Analítica: "Advanced Data Scientist: Statistical Engineer, Machine Learning Scientist and Deep Learning Scientist", (2022). Programa de Especialización en Tecnología Blockchain y Regulación de Criptoactivos, Blockchain Academy Chile (2021). Diplomado Internacional de Arbitraje organizado por ESAN y La Cámara de Comercio de Lima (2020). Formación de Auditor Interno en la Norma ISO/IEC 27001:2013 (Sistema de Gestión de Seguridad de la Información), (2020). Egresada de la Maestría de Regulación de Servicios Públicos de la PUCP, (2007). Economista de la UNFV (1998).
              </p>
            </div>
          </li>
          <li className={styles.founder}>
            <img src="/roberto.png" alt="Roberto Martinez" className={styles.founderImage} />
            <div className={styles.founderInfo}>
              <strong>Roberto Martinez</strong> - Chief Technology Officer (CTO)
              <p>Arquitecto de Software con más de 15 años de experiencia en el diseño, desarrollo y escalabilidad de soluciones basadas en Inteligencia Artificial, Blockchain y la Industria 4.0. Especializado en avatares conversacionales, NLP y síntesis de voz, he liderado equipos técnicos en startups y proyectos innovadores, creando soluciones seguras y altamente escalables. Actualmente, Director de I&D en Voila Technology y Chief Software Arquitect Blockchain en Lead Gods, Delaware, US. Asimismo, Director de Marketing en Asociación Blockchain & DLT Perú (hasta agosto 2023). Chief Software Architect en Houser, Lima, PE (hasta diciembre de 2021). Full Stack Developer en Neuro Hack, Lima, PE (hasta enero 2019).
              </p>
              <p>Formación especializada: Program for Leadership Development, Universidad del Pacifico, Lima – PE (2017), Master Business with specialization in Startups, Business School Materiabiz, Buenos Aires, AR (2011), Bachiller en Física, Universidad Nacional de San Agustín, Arequipa, PE (1998 – 2003). Competencias Técnicas: Algorithms, Python, Php, Java, R, Rust, Solidity. Solution architecture, Project management, Software development.  AngularJS, React, Vue, JSON, Tensorflow, Mysql, BigQuery. Microsoft Azure, .NET Framework, Amazon Web Services (AWS). Reconocimiento de voz, NLP y síntesis de voz natural.
              </p>
            </div>
          </li>
          <li className={styles.founder}>
            <img src="/gustavo.png" alt="Gustavo Fuentes Gonzales" className={styles.founderImage} />
            <div className={styles.founderInfo}>
              <strong>Gustavo Fuentes Gonzales</strong> - Chief Product Officer (CPO)

              <p>Ingeniero Senior en Electrónica, con más de 30 años de experiencia en el sector tecnológico, especializado en el diseño y desarrollo de soluciones en áreas de electrónica y sistemas de control para el sector Financiero. Fundador de cuatro empresas, algunas con más de diez años de operación, mi formación complementaria que incluye diplomados y maestrías me ha permitido integrar la parte técnica con un enfoque de negocio. A lo largo de mi carrera he liderado proyectos tecnológicos de gran impacto, trabajando con grandes clientes como bancos y cadenas comerciales a nivel nacional. Ha desarrollado innovaciones como sistemas antiskimming y sistemas de control remoto de energía para ATM’s, soluciones de control y monitoreo para dispositivos embebidos con programación en assembler y C, entre otros proyectos, mejorando la seguridad y eficiencia operativa.
              </p>
              <p>Con una formación académica sólida, que incluye una Maestría en Blockchain y Smart Contracts de la Universidad de Salamanca (2022), una Maestría en Administración de Empresas (MBA) por la Universidad del Pacífico (2011), un Bootcamp en Finanzas Desentralizadas DEFI (ABR-OCT 2023), un Diplomado en Comercio Electrónico y Marketing Digital (2020), un Diplomado en Gerencia y Gestión de Proyectos (2010), certificaciones en Redes y Conectividad (CCNA, SIEMON) y otros cursos relacionados tanto en el área técnica como administrativa. Programa Certified Tech Developer (2023-2025) en Digital House. Competencias en áreas como Desarrollo Web, Gestión de Proyectos con Metodologías Ágiles, Testing, AWS, Cloud Computing, Desing Thinking, UX/UI, desarrollo de aplicaciones con tecnologías como JavaScript, React, MySQL, HTML, CSS, Java. Certificaciones de ICP Mexico (2024/2025): ICP Motoko Developer - Certified Developer, ICP Frontend Developer - Certified Developer, ICP INNOVATION INTERNSHIP – ICP Expert Developer. Actualmente desarrolla la plataforma Payonium como Full Stack Developer, utilizando tecnologías como React en el front-end y Motoko en el backend.
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

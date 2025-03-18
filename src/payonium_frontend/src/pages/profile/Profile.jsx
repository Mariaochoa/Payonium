import { useContext, useState } from 'react';

import { AuthContext } from '../../context/AuthContext';
import { createActor } from 'declarations/payonium_backend';
import styles from './Profile.module.css';

function Profile() {

  const { isAuthenticated, identity } = useContext(AuthContext);
  
  let canisterId = process.env.CANISTER_ID_PAYONIUM_BACKEND;

  let backend = createActor(canisterId, {
    agentOptions: {
      identity: identity,
      host: "http://localhost:4943",
    },
  });


  const [principal, setPrincipal] = useState('');
  const [profiles, setProfiles] = useState([]);

  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [dni, setDni] = useState('');
  const [countryorigindocument, setCountryorigindocument] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [countryresidence, setCountryresidence] = useState('');

 
  async function handleWhoAmI() {
    const principal = await backend.whoAmI();
    setPrincipal(principal.toString());
  }

  async function getProfiles() {

    try {
      const result = await backend.getProfiles();
      console.log(result);
      if (result.ok.profiles){
        setProfiles(result.ok.profiles);
      } else {
        alert("Error al obtener los perfiles");
      } 
      
    }  catch (err) {
        console.log(err);
    };
  };

  async function registerUser(event) {
    event.preventDefault();
    if (!isAuthenticated) {
      alert("Debe estar logueado para registrar un usuario.");
      return;
    }

    const newProfile = {
      name, lastname, email, dni, countryorigindocument, phone, password, countryresidence, 
      owner: identity.getPrincipal(), 
      role: 'user',
    };
    try {
      console.log(newProfile);
      const result = await backend.registerUser(newProfile);
      if(result) {
        alert("usuario registrado exitosamente");

      }else {
        alert("error en el registro: " + result.err)
      };
    } catch (err) {
      console.log(err)
    }
    
  }




  return (
    <div className={styles.container}>
     
    
      <div className={styles.profileSection}>
        <button onClick={handleWhoAmI}>Who Am I?</button>
        <section id="principal">{principal}</section>
      </div>
      

        <div>
          <button onClick={getProfiles}>Get User Profiles</button>
        </div>
        <section id="profiles">
         
            <ul>
              {profiles.map((profile, index) => (
                <li key={index}>
                  <strong>{profile.name} {profile.lastname}</strong><br />
                  <span>Email: {profile.email}</span><br />
                  <span>DNI: {profile.dni}</span><br />
                  <span>Country of Origin: {profile.countryorigindocument}</span>
                  <span>Phone: {profile.phone}</span><br />
                  <span>Password: {profile.password}</span><br />
                  <span>Country of Residence: {profile.countryresidence}</span><br />
                  <span>Owner: {JSON.stringify(profile.owner)}</span><br />
                  <span>Role: {profile.role}</span><br />
                </li>
              ))}
            </ul>
        
        </section>

        <label>User registration</label>
        <br />
        <form onSubmit={registerUser}>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="text" placeholder="Lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="text" placeholder="DNI" value={dni} onChange={(e) => setDni(e.target.value)} required />
          <input type="text" placeholder="Country origin ID" value={countryorigindocument} onChange={(e) => setCountryorigindocument(e.target.value)}  required />
          <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <input type="text" placeholder="Country residence" value={countryresidence} onChange={(e) => setCountryresidence(e.target.value)} required />
          
          <div className={styles.formFooter} >
            <button type="submit">Confirm</button>
          </div>
          
        </form>

    </div>
  );
}

export default Profile;

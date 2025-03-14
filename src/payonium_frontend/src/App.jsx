import { useContext, useState } from 'react';
import LoginButton from './components/auth/LoginButton';
import LogoutButton from './components/auth/LogoutButton';
import { AuthContext } from './context/AuthContext';
import { createActor } from 'declarations/payonium_backend';
import './App.css';

function App() {

  const { isAuthenticated, identity } = useContext(AuthContext);
  
  let canisterId = process.env.CANISTER_ID_PAYONIUM_BACKEND;

  let backend = createActor(canisterId, {
    agentOptions: {
      identity: identity,
      host: "http://localhost:4943",
    },
  });

  const [greeting, setGreeting] = useState('');
  const [principal, setPrincipal] = useState('');
  const [profiles, setProfiles] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;

    if(!isAuthenticated){
      alert("Por favor, usted debe loguearse primero para ejecutar esta funcion");
      return;
    }

    backend.greet(name).then((greeting) => {
      setGreeting(greeting);
    });
    return false;
  }

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

  return (
    <div >
      <header className="App-header">
        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
        
      </header>
    <main>
      <img src="/payonium.jpg" alt="PAYONIUM logo" />

      <br />
      <form action="#" onSubmit={handleSubmit}>
        <label htmlFor="name">Enter your name: &nbsp;</label>
        <input id="name" alt="Name" type="text" />
        <button type="submit">Click Me!</button>
      </form>
      <section id="greeting">{greeting}</section>

      <br />
      <div>
      <button onClick={handleWhoAmI}>Who Am I?</button>
      </div>
      <section id="principal">{principal}</section>

      <br />
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
                  <span>Role: {Object.keys(profile.role).find(key => profile.role[key] === null) }</span><br />

                </li>
              ))}
            </ul>
        
        </section>

    </main>
    </div>
  );
}

export default App;

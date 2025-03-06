import { useState } from 'react';
import { payonium_backend } from 'declarations/payonium_backend';

function App() {
  const [greeting, setGreeting] = useState('');
  const [principal, setPrincipal] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    payonium_backend.greet(name).then((greeting) => {
      setGreeting(greeting);
    });
    return false;
  }

  async function handleWhoAmI() {
    const principal = await payonium_backend.whoAmI();
    setPrincipal(principal.toString());
  }

  return (
    <main>
      <img src="/payonium.jpg" alt="PAYONIUM logo" />
      <br />
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

    </main>
  );
}

export default App;

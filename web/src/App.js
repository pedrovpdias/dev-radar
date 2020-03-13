import React, { useState, useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevItem from  './components/DevItem';
import DevForm from './components/DevForm';
// Componente: Bloco isolado de HTML, CSS e JS, o qual não interfere no restante da aplicação
// Propriedade: Informações que um componente PAI passa para o componente FILHO
// Estado: Informações mantidas pelo componente (Lembrar: imutabilidade)

function App() {
  const [devs, setDevs] = useState([]);

  async function loadDevs(){
    const response = await api.get('/devs');

    setDevs(response.data);
  }  
  
  useEffect(() => {
    loadDevs();
  }, []);

  async function handleAddDev(data) {
    const response = await api.post('/devs', data);

    setDevs([...devs, response.data]); // Inclui o novo Dev no array
  }

  async function deleteHandle(data) {
    const response = await api.delete('/devs', data);
    
    loadDevs();

  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} onSubmit={deleteHandle} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;

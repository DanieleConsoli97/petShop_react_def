import React, { useState } from 'react';
import HoldButton from './HoldButton';

/**
 * Componente di esempio che mostra diversi utilizzi del HoldButton
 */
const HoldButtonExample = () => {
  const [message, setMessage] = useState('');
  const [counter, setCounter] = useState(0);

  // Funzione di esempio per il primo pulsante
  const handleHold1 = () => {
    setMessage('Azione completata!');
    setTimeout(() => setMessage(''), 2000); // Resetta il messaggio dopo 2 secondi
  };

  // Funzione di esempio per il secondo pulsante
  const handleHold2 = () => {
    setCounter(prev => prev + 1);
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">Esempi di HoldButton</h2>
      
      <div className="row g-4">
        {/* Esempio 10: Pulsante con effetto particellare */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Effetto Particellare</h5>
              <p className="card-text">Esplosione di particelle colorate al completamento.</p>
              <HoldButton 
                onHold={() => alert('Effetto particellare attivato!')} 
                holdTime={1500} 
                className="btn btn-primary"
                animationStyle="particles"
              >
                Effetto Particellare
              </HoldButton>
            </div>
          </div>
        </div>
        
        {/* Esempio 9: Pulsante con feedback tattile */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Feedback Tattile</h5>
              <p className="card-text">Vibrazione al completamento (solo dispositivi mobili supportati).</p>
              <HoldButton 
                onHold={() => alert('Azione con vibrazione completata!')} 
                holdTime={1200} 
                className="btn btn-secondary"
                enableVibration={true}
              >
                Con Vibrazione
              </HoldButton>
            </div>
          </div>
        </div>
        {/* Esempio 1: Pulsante base (stile default) */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Stile Default</h5>
              <p className="card-text">Tieni premuto per 1 secondo per attivare.</p>
              <HoldButton 
                onHold={handleHold1} 
                className="btn btn-primary"
                animationStyle="default"
              >
                Tieni Premuto
              </HoldButton>
              {message && (
                <div className="alert alert-success mt-3">{message}</div>
              )}
            </div>
          </div>
        </div>

        {/* Esempio 2: Pulsante con tempo personalizzato */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Tempo Personalizzato</h5>
              <p className="card-text">Tieni premuto per 2 secondi per incrementare il contatore.</p>
              <HoldButton 
                onHold={handleHold2} 
                holdTime={2000} 
                className="btn btn-success"
              >
                Tieni Premuto (2s)
              </HoldButton>
              <div className="mt-3">
                <span className="badge bg-success">Contatore: {counter}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Esempio 3: Stile Ripple */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Stile Ripple</h5>
              <p className="card-text">Effetto onda al click con propagazione migliorata.</p>
              <HoldButton 
                onHold={() => alert('Azione completata!')} 
                holdTime={1500} 
                className="btn btn-info"
                animationStyle="ripple"
              >
                Effetto Ripple Migliorato
              </HoldButton>
            </div>
          </div>
        </div>

        {/* Esempio 4: Stile Bounce */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Stile Bounce</h5>
              <p className="card-text">Effetto rimbalzo al completamento.</p>
              <HoldButton 
                onHold={() => console.log('Azione bounce completata')} 
                className="btn btn-warning"
                animationStyle="bounce"
              >
                Effetto Bounce
              </HoldButton>
              <p className="mt-2 small text-muted">Controlla la console per vedere il risultato</p>
            </div>
          </div>
        </div>

        {/* Esempio 5: Stile Glow */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Stile Glow</h5>
              <p className="card-text">Effetto luminoso durante la pressione con transizione di colore al completamento.</p>
              <HoldButton 
                onHold={() => console.log('Azione glow completata')} 
                className="btn btn-primary"
                animationStyle="glow"
              >
                Effetto Glow Migliorato
              </HoldButton>
            </div>
          </div>
        </div>

        {/* Esempio 6: Stile Circular */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Progresso Circolare</h5>
              <p className="card-text">Indicatore di progresso circolare con rotazione e segno di spunta al completamento.</p>
              <HoldButton 
                onHold={() => console.log('Azione circular completata')} 
                holdTime={2000}
                className="btn btn-dark"
                animationStyle="circular"
              >
                Progresso Circolare Avanzato
              </HoldButton>
            </div>
          </div>
        </div>

        {/* Esempio 7: Stile Shake */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Stile Shake</h5>
              <p className="card-text">Effetto vibrazione (per errori).</p>
              <HoldButton 
                onHold={() => console.log('Azione shake completata')} 
                className="btn btn-danger"
                animationStyle="shake"
              >
                Effetto Shake
              </HoldButton>
            </div>
          </div>
        </div>

        {/* Esempio 11: Pulsante con effetto shake migliorato */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Effetto Shake Migliorato</h5>
              <p className="card-text">Pulsante con effetto shake che si attiva al click.</p>
              <HoldButton 
                onHold={() => {
                  console.log('Effetto shake attivato!');
                  // Simuliamo un errore per attivare l'effetto shake
                  const button = document.querySelector('.btn.shake-improved-style');
                  if (button) {
                    button.classList.add('error');
                    setTimeout(() => button.classList.remove('error'), 600);
                  }
                }} 
                holdTime={800} 
                className="btn btn-danger shake-improved-style"
                animationStyle="shake-improved"
              >
                Premi per Shake
              </HoldButton>
            </div>
          </div>
        </div>
        
        {/* Esempio 11: Pulsante con effetto shake interattivo */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Effetto Shake Interattivo</h5>
              <p className="card-text">Premi il pulsante per attivare l'effetto shake.</p>
              <HoldButton 
                onHold={() => {
                  // Attiva l'effetto shake immediatamente
                  const button = document.querySelector('.shake-interactive');
                  if (button) {
                    button.classList.add('error');
                    setTimeout(() => button.classList.remove('error'), 600);
                  }
                  console.log('Effetto shake interattivo attivato!');
                }} 
                holdTime={500} 
                className="btn btn-danger shake-interactive"
                animationStyle="shake"
              >
                Premi per Shake
              </HoldButton>
            </div>
          </div>
        </div>
        
        {/* Esempio 12: Pulsante con effetto shake avanzato */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Effetto Shake Avanzato</h5>
              <p className="card-text">Un effetto shake più intenso che si attiva immediatamente.</p>
              <HoldButton 
                onHold={() => {
                  console.log('Effetto shake avanzato attivato!');
                  // Attiva l'effetto shake immediatamente
                  const button = document.querySelector('.shake-advanced');
                  if (button) {
                    button.classList.add('error');
                    setTimeout(() => button.classList.remove('error'), 800);
                  }
                }} 
                holdTime={800} 
                className="btn btn-danger shake-advanced"
                animationStyle="shake"
              >
                Shake Avanzato
              </HoldButton>
            </div>
          </div>
        </div>
        
        {/* Esempio 8: Pulsante con stile personalizzato */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Stile Personalizzato</h5>
              <p className="card-text">Un pulsante con stile personalizzato.</p>
              <HoldButton 
                onHold={() => alert('Azione completata!')} 
                holdTime={1500} 
                className="btn"
                style={{
                  backgroundColor: '#ff6b6b',
                  color: 'white',
                  borderRadius: '25px',
                  padding: '10px 20px',
                  border: 'none',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
              >
                Stile Personalizzato
              </HoldButton>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h4>Come Usare il Componente HoldButton</h4>
        <pre className="bg-light p-3 rounded">
          {`import HoldButton from './components/HoldButton';

// Nel tuo componente
<HoldButton 
  onHold={() => { /* La tua azione qui */ }} 
  holdTime={1000} // Tempo in ms (opzionale, default: 1000)
  className="btn btn-primary" // Classi CSS (opzionale)
  style={{ /* stili inline */ }} // Stili inline (opzionale)
  animationStyle="default" // Stile animazione: default, ripple, bounce, shake, glow, circular, particles
  enableVibration={false} // Abilita vibrazione al completamento (opzionale, default: false)
>
  Testo del Pulsante
</HoldButton>`}
        </pre>
      </div>
    </div>
  );
};

export default HoldButtonExample;
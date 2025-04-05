import React from 'react';
import HoldButton from './HoldButton';
import './HoldButton.css';

/**
 * Componente di esempio che mostra l'utilizzo del HoldButton con varie personalizzazioni
 */
const HoldButtonExample = () => {

  return (
    <div className="container my-5">
      <h2 className="mb-4">Esempi di HoldButton</h2>
      
      <div className="row g-4">
        {/* Esempio 1: Stile Circular con colore scuro (default) */}
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Progresso Circolare (Default)</h5>
              <p className="card-text">Indicatore di progresso circolare con animazione fluida e segno di spunta al completamento.</p>
              <HoldButton 
                onHold={() => console.log('Azione circular completata')} 
                holdTime={2000}
                className="btn btn-dark"
              >
                Progresso Circolare
              </HoldButton>
            </div>
          </div>
        </div>

        {/* Esempio 2: Tempo di attesa più breve */}
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Tempo di Attesa Breve</h5>
              <p className="card-text">Personalizzazione del tempo di attesa a 1000ms (1 secondo) per un'azione più rapida.</p>
              <HoldButton 
                onHold={() => console.log('Azione rapida completata')} 
                holdTime={1000}
                className="btn btn-primary"
              >
                Attesa Breve (1s)
              </HoldButton>
            </div>
          </div>
        </div>

        {/* Esempio 3: Colore personalizzato */}
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Colore Personalizzato</h5>
              <p className="card-text">Utilizzo di classi Bootstrap per cambiare il colore del pulsante e dell'animazione.</p>
              <HoldButton 
                onHold={() => console.log('Azione verde completata')} 
                holdTime={2500}
                className="btn btn-success"
              >
                Stile Verde
              </HoldButton>
            </div>
          </div>
        </div>

        {/* Esempio 4: Dimensione grande */}
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Dimensione Grande</h5>
              <p className="card-text">Pulsante di dimensione maggiore con tempo di attesa più lungo.</p>
              <HoldButton 
                onHold={() => console.log('Azione grande completata')} 
                holdTime={3000}
                className="btn btn-danger btn-lg"
              >
                Pulsante Grande (3s)
              </HoldButton>
            </div>
          </div>
        </div>

        {/* Esempio 5: Stile outline */}
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Stile Outline</h5>
              <p className="card-text">Utilizzo dello stile outline di Bootstrap per un aspetto più leggero.</p>
              <HoldButton 
                onHold={() => console.log('Azione outline completata')} 
                holdTime={2000}
                className="btn btn-outline-info"
              >
                Stile Outline
              </HoldButton>
            </div>
          </div>
        </div>

        {/* Esempio 6: Stile personalizzato con CSS inline */}
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Stile Personalizzato</h5>
              <p className="card-text">Personalizzazione avanzata con stile CSS inline e tempo di attesa medio.</p>
              <HoldButton 
                onHold={() => console.log('Azione personalizzata completata')} 
                holdTime={1500}
                className="btn"
                style={{ 
                  background: 'linear-gradient(135deg, #6e48aa, #9d50bb)', 
                  color: 'white',
                  borderRadius: '25px',
                  padding: '10px 20px',
                  border: 'none',
                  boxShadow: '0 4px 15px rgba(157, 80, 187, 0.4)'
                }}
              >
                Stile Gradiente
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
  holdTime={2000} // Tempo in ms (opzionale, default: 1000)
  className="btn btn-dark" // Classi CSS (opzionale)
  style={{ /* Stili CSS inline (opzionale) */ }}
>
  Testo del Pulsante
</HoldButton>`}
        </pre>
      </div>
    </div>
  );
};

export default HoldButtonExample;
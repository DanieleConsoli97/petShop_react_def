import React, { useState, useEffect, useRef } from 'react';
import './HoldButton.css';

/**
 * Componente HoldButton - un pulsante che risponde quando viene tenuto premuto
 * con animazioni migliorate e feedback visivo
 * 
 * @param {Object} props - Le proprietà del componente
 * @param {Function} props.onHold - Funzione da eseguire quando il pulsante viene tenuto premuto
 * @param {number} props.holdTime - Tempo in millisecondi necessario per attivare l'azione (default: 1000ms)
 * @param {string} props.className - Classi CSS aggiuntive
 * @param {React.ReactNode} props.children - Contenuto del pulsante
 * @param {Object} props.style - Stili inline aggiuntivi
 * @param {string} props.animationStyle - Stile di animazione da utilizzare (default, ripple, bounce, shake, shake-improved, glow, circular)
 * @returns {JSX.Element}
 */
const HoldButton = ({
  onHold,
  holdTime = 1000,
  className = '',
  children,
  style = {},
  animationStyle = 'default',
  enableVibration = false,
  ...props
}) => {
  const [isHolding, setIsHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [ripplePosition, setRipplePosition] = useState({ x: 0, y: 0 });
  const [showRipple, setShowRipple] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [particles, setParticles] = useState([]);
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);
  const animationRef = useRef(null);
  const completionTimerRef = useRef(null);
  const particlesTimerRef = useRef(null);

  // Gestisce l'inizio della pressione del pulsante
  const startHolding = (e) => {
    setIsHolding(true);
    setIsCompleted(false);
    setIsError(false);
    startTimeRef.current = Date.now();
    
    // Per l'effetto ripple, salva la posizione del click
    if (animationStyle === 'ripple') {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX || e.touches[0].clientX;
      const y = e.clientY || e.touches[0].clientY;
      setRipplePosition({
        x: x - rect.left,
        y: y - rect.top
      });
      setShowRipple(true);
      setTimeout(() => setShowRipple(false), 800); // Durata dell'animazione ripple
    }
    
    // Avvia l'animazione del progresso
    updateProgress();
    
    // Imposta il timer per l'azione
    timerRef.current = setTimeout(() => {
      if (typeof onHold === 'function') {
        onHold();
        setIsCompleted(true);
        
        // Attiva vibrazione se abilitata e supportata
        if (enableVibration && navigator.vibrate) {
          navigator.vibrate(200);
        }
        
        // Genera particelle se lo stile è 'particles'
        if (animationStyle === 'particles') {
          generateParticles();
          setShowParticles(true);
          
          // Nascondi le particelle dopo l'animazione
          particlesTimerRef.current = setTimeout(() => {
            setShowParticles(false);
          }, 1500);
        }
        
        // Reset dello stato di completamento dopo un breve periodo
        completionTimerRef.current = setTimeout(() => {
          setIsCompleted(false);
        }, 1000);
      }
    }, holdTime);
  };

  // Aggiorna il progresso visivo dell'animazione
  const updateProgress = () => {
    if (!startTimeRef.current) return;
    
    const elapsedTime = Date.now() - startTimeRef.current;
    const progress = Math.min(100, (elapsedTime / holdTime) * 100);
    setHoldProgress(progress);
    
    if (progress < 100) {
      animationRef.current = requestAnimationFrame(updateProgress);
    }
  };

  // Gestisce il rilascio del pulsante
  const stopHolding = () => {
    setIsHolding(false);
    setHoldProgress(0);
    startTimeRef.current = null;
    
    // Cancella timer e animazione
    clearTimers();
  };

  // Genera particelle colorate casuali
  const generateParticles = () => {
    const colors = [
      '#FF5252', '#FF4081', '#E040FB', '#7C4DFF', 
      '#536DFE', '#448AFF', '#40C4FF', '#18FFFF', 
      '#64FFDA', '#69F0AE', '#B2FF59', '#EEFF41', 
      '#FFFF00', '#FFD740', '#FFAB40', '#FF6E40'
    ];
    
    const newParticles = [];
    const particleCount = 20; // Numero di particelle da generare
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: 50 + (Math.random() * 20 - 10), // Posizione X centrata con leggera variazione
        y: 50 + (Math.random() * 20 - 10), // Posizione Y centrata con leggera variazione
        size: 5 + Math.random() * 10, // Dimensione casuale tra 5 e 15px
        color: colors[Math.floor(Math.random() * colors.length)], // Colore casuale dall'array
        style: {
          '--x-offset': Math.random() * 2 - 1, // Direzione X casuale
          '--y-offset': Math.random() * 2 - 1  // Direzione Y casuale
        }
      });
    }
    
    setParticles(newParticles);
  };
  
  // Funzione di utilità per cancellare i timer
  const clearTimers = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    
    if (completionTimerRef.current) {
      clearTimeout(completionTimerRef.current);
      completionTimerRef.current = null;
    }
    
    if (particlesTimerRef.current) {
      clearTimeout(particlesTimerRef.current);
      particlesTimerRef.current = null;
    }
  };

  // Pulizia quando il componente viene smontato
  useEffect(() => {
    return clearTimers;
  }, []);

  // Determina le classi CSS in base allo stile di animazione
  const getButtonClasses = () => {
    let classes = `hold-button ${isHolding ? 'holding' : ''} ${isCompleted ? 'completed' : ''}`;
    
    // Aggiungi classi specifiche per lo stile di animazione
    if (animationStyle !== 'default') {
      classes += ` ${animationStyle}-style`;
    }
    
    if (isError && (animationStyle === 'shake' || animationStyle === 'shake-advanced')) {
      classes += ' error';
    }
    
    return `${classes} ${className}`;
  };

  return (
    <button
      className={getButtonClasses()}
      style={{
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.1s ease, box-shadow 0.2s ease',
        transform: isHolding ? 'scale(0.98)' : 'scale(1)',
        boxShadow: isHolding ? '0 1px 2px rgba(0,0,0,0.2)' : '0 2px 4px rgba(0,0,0,0.1)',
        ...style
      }}
      onMouseDown={(e) => startHolding(e)}
      onMouseUp={stopHolding}
      onMouseLeave={stopHolding}
      onTouchStart={(e) => startHolding(e)}
      onTouchEnd={stopHolding}
      onTouchCancel={stopHolding}
      {...props}
    >
      {/* Effetto pulsazione durante la pressione (per stile default) */}
      {isHolding && animationStyle === 'default' && (
        <div
          className="hold-pulse"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 'inherit',
            animation: 'pulse 1.5s infinite',
            pointerEvents: 'none'
          }}
        />
      )}
      
      {/* Effetto ripple */}
      {showRipple && animationStyle === 'ripple' && (
        <div
          className="ripple-effect"
          style={{
            top: ripplePosition.y,
            left: ripplePosition.x,
          }}
        />
      )}
      
      {/* Effetto di completamento */}
      {isCompleted && animationStyle !== 'bounce' && animationStyle !== 'circular' && (
        <div
          className="completion-effect"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(40, 167, 69, 0.2)',
            borderRadius: 'inherit',
            animation: 'fadeOut 1s forwards',
            pointerEvents: 'none'
          }}
        />
      )}
      
      {/* Indicatore di progresso circolare migliorato */}
      {isHolding && animationStyle === 'circular' && (
        <div className="progress-circle" style={{ height: '50px', width: '50px', position: 'relative' }}>
          <svg width="50" height="50" viewBox="0 0 50 50" className={isHolding ? 'pulse-circle' : ''}>
            {/* Cerchio di sfondo con effetto glow */}
            <circle
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke="rgba(233, 236, 239, 0.4)"
              strokeWidth="4"
              className="circle-background"
            />
            {/* Cerchio di progresso con gradiente animato */}
            <circle
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke="url(#enhancedGradient)"
              strokeWidth="4.5"
              strokeDasharray="125.6"
              strokeDashoffset={125.6 - (125.6 * holdProgress) / 100}
              transform="rotate(-90 25 25)"
              strokeLinecap="round"
              className="progress-indicator"
              style={{
                transition: 'stroke-dashoffset 0.1s linear',
                filter: `drop-shadow(0 0 ${holdProgress / 20}px #007bff)`
              }}
            />
            {/* Piccoli punti decorativi che seguono il progresso */}
            {holdProgress > 10 && (
              <circle
                cx={25 + 20 * Math.cos(Math.PI * 2 * (holdProgress / 100) - Math.PI / 2)}
                cy={25 + 20 * Math.sin(Math.PI * 2 * (holdProgress / 100) - Math.PI / 2)}
                r="2"
                fill="#ffffff"
                className="progress-dot"
              />
            )}
            <defs>
              <linearGradient id="enhancedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#007bff" />
                <stop offset="50%" stopColor="#00a0ff" />
                <stop offset="100%" stopColor="#00d2ff" />
                <animate 
                  attributeName="x1" 
                  values="0%;100%;0%" 
                  dur="3s" 
                  repeatCount="indefinite" 
                />
              </linearGradient>
            </defs>
          </svg>
          {/* Contenuto centrale che mostra la percentuale o il segno di spunta */}
          <div 
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: isCompleted ? '#28a745' : '#007bff',
              fontSize: '16px',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
              opacity: isCompleted ? 1 : (holdProgress > 15 ? 0.8 : 0),
              textShadow: isCompleted ? '0 0 5px rgba(40, 167, 69, 0.5)' : 'none'
            }}
          >
            {isCompleted ? (
              <span className="checkmark-animation">✓</span>
            ) : (
              <span>{Math.round(holdProgress)}%</span>
            )}
          </div>
        </div>
      )}
      
      {/* Indicatore di progresso lineare (per tutti gli stili tranne circular) */}
      {animationStyle !== 'circular' && (
        <div
          className="hold-progress"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: '4px',
            width: `${holdProgress}%`,
            backgroundColor: isCompleted ? 'var(--bs-success, #28a745)' : 'var(--bs-primary, #0d6efd)',
            transition: 'width 0.05s linear, background-color 0.3s ease',
            boxShadow: isHolding ? '0 0 8px rgba(13, 110, 253, 0.5)' : 'none',
            borderRadius: '0 2px 2px 0'
          }}
        />
      )}
      
      {/* Effetto particellare */}
      {showParticles && animationStyle === 'particles' && (
        <div className="particles-container">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="particle"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: particle.color,
                borderRadius: '50%',
                boxShadow: `0 0 ${particle.size/2}px ${particle.color}`,
                ...particle.style
              }}
            />
          ))}
        </div>
      )}
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </button>
  );
};

export default HoldButton;
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
 * @param {string} props.animationStyle - Stile di animazione da utilizzare (default, ripple, bounce, shake, glow, circular)
 * @returns {JSX.Element}
 */
const HoldButton = ({
  onHold,
  holdTime = 1000,
  className = '',
  children,
  style = {},
  animationStyle = 'default',
  ...props
}) => {
  const [isHolding, setIsHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [ripplePosition, setRipplePosition] = useState({ x: 0, y: 0 });
  const [showRipple, setShowRipple] = useState(false);
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);
  const animationRef = useRef(null);
  const completionTimerRef = useRef(null);

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
    
    if (isError && animationStyle === 'shake') {
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
      
      {/* Indicatore di progresso circolare */}
      {isHolding && animationStyle === 'circular' && (
        <div className="progress-circle" style={{ height: '40px' }}>
          <svg width="40" height="40" viewBox="0 0 40 40">
            <circle
              cx="20"
              cy="20"
              r="15"
              fill="none"
              stroke="#e9ecef"
              strokeWidth="3"
            />
            <circle
              cx="20"
              cy="20"
              r="15"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="3"
              strokeDasharray="94.2"
              strokeDashoffset={94.2 - (94.2 * holdProgress) / 100}
              transform="rotate(-90 20 20)"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#007bff" />
                <stop offset="100%" stopColor="#00c6ff" />
              </linearGradient>
            </defs>
          </svg>
          {isCompleted && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: '#28a745',
              fontSize: '16px'
            }}>
              ✓
            </div>
          )}
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
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </button>
  );
};

export default HoldButton;
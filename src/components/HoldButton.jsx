import React, { useState, useEffect, useRef } from 'react';
import './HoldButton.css';

/**
 * Componente HoldButton - un pulsante che risponde quando viene tenuto premuto
 * con animazione di progresso circolare e feedback visivo
 * 
 * @param {Object} props - Le proprietà del componente
 * @param {Function} props.onHold - Funzione da eseguire quando il pulsante viene tenuto premuto
 * @param {number} props.holdTime - Tempo in millisecondi necessario per attivare l'azione (default: 1000ms)
 * @param {string} props.className - Classi CSS aggiuntive
 * @param {React.ReactNode} props.children - Contenuto del pulsante
 * @param {Object} props.style - Stili inline aggiuntivi
 * @returns {JSX.Element}
 */
const HoldButton = ({
  onHold,
  holdTime = 1000,
  className = '',
  children,
  style = {},
  ...props
}) => {
  const [isHolding, setIsHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);
  const animationRef = useRef(null);
  const completionTimerRef = useRef(null);

  // Gestisce l'inizio della pressione del pulsante
  const startHolding = () => {
    setIsHolding(true);
    setIsCompleted(false);
    startTimeRef.current = Date.now();
    
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
        }, 1500);
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

  // Determina le classi CSS
  const getButtonClasses = () => {
    let classes = `hold-button ${isHolding ? 'holding' : ''} ${isCompleted ? 'completed' : ''}`;
    return `${classes} ${className}`;
  };

  return (
    <button
      className={getButtonClasses()}
      style={style}
      onMouseDown={startHolding}
      onMouseUp={stopHolding}
      onMouseLeave={stopHolding}
      onTouchStart={startHolding}
      onTouchEnd={stopHolding}
      onTouchCancel={stopHolding}
      {...props}
    >
      {/* Contenuto del pulsante */}
      <div className="button-content">
        {children}
      </div>
      
      {/* Indicatore di progresso circolare */}
      {isHolding && (
        <div className="progress-circle">
          <svg width="30" height="30" viewBox="0 0 50 50" className={isHolding ? 'pulse-circle' : ''}>
            {/* Cerchio di sfondo */}
            <circle
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke="rgba(233, 236, 239, 0.4)"
              strokeWidth="4"
              className="circle-background"
            />
            {/* Cerchio di progresso */}
            <circle
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke={`hsl(${210 + holdProgress * 0.5}, ${70 + holdProgress * 0.3}%, ${50 + holdProgress * 0.2}%)`}
              strokeWidth="4.5"
              strokeDasharray="125.6"
              strokeDashoffset={125.6 - (125.6 * holdProgress) / 100}
              transform="rotate(-90 25 25)"
              strokeLinecap="round"
              className="progress-indicator"
            />
            {/* Punto decorativo che segue il progresso */}
            {holdProgress > 5 && (
              <circle
                cx={25 + 20 * Math.cos(Math.PI * 2 * (holdProgress / 100) - Math.PI / 2)}
                cy={25 + 20 * Math.sin(Math.PI * 2 * (holdProgress / 100) - Math.PI / 2)}
                r="2"
                fill={`hsl(${210 + holdProgress * 0.8}, 100%, 85%)`}
                className="progress-dot"
              />
            )}
          </svg>
          {/* Contenuto centrale che mostra solo il segno di spunta al completamento */}
          <div className="progress-percentage">
            {isCompleted && <span className="checkmark-animation">✓</span>}
          </div>
        </div>
      )}
    </button>
  );
};

export default HoldButton;
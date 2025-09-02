import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import './App.css';
import musica from './assets/musica.mp3'; // coloque sua música na pasta src/assets
import sapoGif from './assets/sapo.gif';
import pocoyo1 from './assets/pocoyo1.gif';
import pocoyo2 from './assets/pocoyo2.gif';
import luffy from './assets/luffy.gif';
import gato from './assets/gato.gif';
import Carta from './components/Carta';

function App() {
  const [started, setStarted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [fadeConfetti, setFadeConfetti] = useState(false);
  const [flip, setFlip] = useState(false);

  const audioRef = useRef(new Audio(musica));

  const handleStart = () => {
    // toca a música ao clicar
    audioRef.current.play();

    setFlip(true); // ativa animação de flip
    setTimeout(() => {
      setShowConfetti(true);
      setStarted(true);
      document.body.style.overflow = 'auto';

      setTimeout(() => {
        setFadeConfetti(true);
      }, 35000);

      setTimeout(() => {
        setShowConfetti(false);
      }, 37000);
    }, 600); // tempo da animação Flip
  };

  return (
    <div className="App">
      {!started && (
        <motion.div
          className="start-screen"
          animate={flip ? { rotateY: 180 } : { rotateY: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
          }}
        >
          <div className="title">
            <h1>Oi, Maria Luísa 💖  </h1>
          </div>
          <div className="title2">
            <h3>(se tiver mutado, desmuta)  </h3>
          </div>
          <div className="button-cxz container" onClick={handleStart}>
            <div className="box-button">
              <div className="button">
                <span>Clique aqui ó</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {showConfetti && (
        <div className={`confetti-wrapper ${fadeConfetti ? 'fade-out' : ''}`}>
          <Confetti numberOfPieces={300} />
        </div>
      )}

      {started && (
        <div className="landing">
          <section className="section">
            <h2>Feliz aniversário, branquela </h2>
            <p>
              Esse site foi feito com muito cuidado e carinho especialmente
              pra esse dia especial seu. Não sou muito bom em front-end,
              mas me esforcei o máximo que consegui.
              (PS: Eu lembrei porque desisti do front, o negocinho chato kkkkkk)
            </p>
          </section>

          <section className="section">
            <h2>Parabéns Fidida bunita ♡</h2>
            <p>
              Que esse dia tão especial seja repleto de coisas boas, são 21 anos que hoje você completa e muitos ainda virão. Felicades Luluzinha, Conquiste tudo o que um dia me contou e jamais perca esse sorisso que ilumina tudo ao seu redor.
            </p>
          </section>

          {/* Campo para os GIFs */}
          <section className="section gifs-section">
            <div className="gif-grid">
              {/* Movendo o componente Carta para aparecer antes do GIF do sapo */}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
                <Carta />
                <img src={sapoGif} alt="gif-1" className="gif" />
              </div>
            </div>
          </section>
          <div className="lateral-gifs left">
  <img src={pocoyo1} alt="Pocoyo 1" />
  <img src={pocoyo2} alt="Pocoyo 2" />
</div>
<div className="lateral-gifs right">
  <img src={luffy} alt="Luffy" />
  <img src={gato} alt="Gato" />
</div>
        </div>
        
      )}
      
    </div>
    
  );
  
}

export default App;

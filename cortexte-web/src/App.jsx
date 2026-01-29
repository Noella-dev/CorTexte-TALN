import { useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Editor from './components/Editor';
import SuggestionCard from './components/SuggestionCard';
import Footer from './components/Footer'; // 1. On importe le composant
import './styles/loader.css';

function App() {
  const [text, setText] = useState("");
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [finalText, setFinalText] = useState("");

  const handleCorrection = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8081/v2/check', null, {
        params: { text, language: 'fr' }
      });
      
      const results = response.data.matches;
      setMatches(results);

      let chars = text.split('');
      [...results].sort((a, b) => b.offset - a.offset).forEach(m => {
        if (m.replacements.length > 0) {
          chars.splice(m.offset, m.length, m.replacements[0].value);
        }
      });
      setFinalText(chars.join(''));
    } catch {
      alert("Erreur de connexion au serveur Java (Port 8081)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
      <div className="flex-grow"> {/* Permet de pousser le footer en bas si le contenu est court */}
        <Navbar />
        <Hero />
        
        <main className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
              
              {/* Colonne GAUCHE : Bloc de saisie "Votre texte" */}
              <div className="lg:col-span-7 flex flex-col">
                <h3 className="font-bold text-xl text-gray-800 mb-4 text-left">Votre texte</h3>
                <Editor 
                  text={text} 
                  setText={setText} 
                  onCorrect={handleCorrection} 
                  loading={loading} 
                />
              </div>

              {/* Colonne DROITE : "Correction possible" */}
              <div className="lg:col-span-5 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="font-bold text-xl text-gray-800">Correction possible</h3>
                  <span className="bg-[#EAB308] text-white w-7 h-7 flex items-center justify-center rounded-full text-sm font-bold">
                    {matches.length}
                  </span>
                </div>

                {/* Conteneur avec scrollbar */}
                <div className="space-y-4 pr-2 overflow-y-auto max-h-[500px] custom-scrollbar">
                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                      <div className="loader"></div>
                      <p className="mt-4 text-gray-400">Analyse en cours...</p>
                    </div>
                  ) : (
                    matches.map((m, index) => (
                      <SuggestionCard key={index} match={m} originalText={text} />
                    ))
                  )}
                </div>
              </div>

          </div>
        </main>

        {finalText && !loading && (
          <section className="max-w-7xl mx-auto px-6 pb-20 animate-slideUp">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl">
              <h3 className="font-bold text-xl text-gray-800">Correction finale</h3>
              <p className="text-gray-700 leading-relaxed text-sm mb-3">{finalText}</p>
            </div>
          </section>
        )}
      </div>

      <Footer /> {/* 2. On utilise le composant ici */}
    </div>
  );
}

export default App;
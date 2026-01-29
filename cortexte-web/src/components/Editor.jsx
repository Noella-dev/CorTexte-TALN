export default function Editor({ text, setText, onCorrect, loading }) {
    return (
      <div className="flex flex-col">
        <h3 className="font-bold mb-3 text-gray-700">Votre texte</h3>
        <textarea 
          className="w-full h-80 p-5 border-2 border-gray-100 rounded-2xl focus:border-[#009C65] outline-none shadow-sm transition-all resize-none text-gray-700"
          placeholder="Commencez à écrire ou collez un texte..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="mt-6 flex justify-center">
          <button 
            onClick={onCorrect}
            disabled={loading || !text}
            className={`bg-[#009C65] text-white px-12 py-3 rounded-full font-bold shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-3 ${loading && 'opacity-70'}`}
          >
            {loading ? "Analyse..." : "Corriger"}
          </button>
        </div>
      </div>
    );
  }     
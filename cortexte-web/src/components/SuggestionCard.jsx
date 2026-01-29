
export default function SuggestionCard({ match, originalText }) {
    // Fonction pour traduire dynamiquement les étiquettes du serveur
    const traduireLabel = (label) => {
      if (!label) return "Information";
      
      // transforme le mot en minuscule 
      const mot = label.toLowerCase();
      
      if (mot === "uncategorized") {
        return "Analyse générale"; 
      }
      
      if (mot === "misspelling") return "Orthographe";
      
      return label; // Retourne le mot original si pas de traduction
    };

    return (
      <div className="bg-white p-5 rounded-xl border-l-4 border-yellow-400 shadow-md hover:shadow-lg transition-shadow">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-yellow-600 bg-yellow-50 px-2 py-1 rounded">
            {traduireLabel(match.rule.issueType)}
          </span>
        </div>

        <p className="text-sm text-gray-600 mb-2">
          Erreur : <span className="text-red-500 font-semibold decoration-wavy underline">
            {originalText.substring(match.offset, match.offset + match.length)}
          </span>
        </p>

        <p className="text-gray-700 text-sm mb-3">{match.message}</p>

        {match.replacements.length > 0 && (
          <div className="bg-green-50 p-2 rounded border border-green-100">
            <p className="text-[#009C65] font-bold text-sm">
              Suggestion : {match.replacements[0].value}
            </p>
          </div>
        )}
      </div>
    );
}
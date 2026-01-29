export default function Footer() {
  return (
    <footer className="bg-[#009C65] py-12 text-center text-white mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <p className="font-bold text-2xl mb-2">CorTexte</p>
        <p className="opacity-80 text-sm max-w-md mx-auto mb-6">
          Votre assistant de correction orthographique et grammaticale pour un français précis et professionnel.
        </p>
        
        {/*la ligne blanche */}
        <div className="border-t border-white/20 max-w-2xl mx-auto pt-6">
          <p className="text-xs opacity-70">
            © 2026 CorTexte — Tous droits réservés. 
          </p>
        </div>
      </div>
    </footer>
  );
}
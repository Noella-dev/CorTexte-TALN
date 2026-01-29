import illustration from '../assets/illustration.svg';

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-8 animate-fadeIn">
      
      {/*illustration a gauche */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img 
          src={illustration} 
          alt="Illustration de correction" 
          className="w-full max-w-md h-auto object-contain"
        />
      </div>

      {/* Texte Hero a droite */}
      <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
          Écrivez <span className="text-[#009C65]">sans fautes</span>, en toute confiance
        </h1>
        <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-lg">
          Collez votre texte, CorTexte corrige instantanément l'orthographe et la grammaire pour un français clair et professionnel.
        </p>
      </div>

    </section>
  );
}
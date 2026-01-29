import logo from '../assets/logo.svg';

export default function Navbar() {
    return (
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
        {/*logo*/}
        <div className="flex flex-col items-center gap-1">
            <img src={logo} alt="Icone CorTexte" className="h-10 w-auto" />
            <div className="text-xl font-bold text-[#009C65] leading-none">
              Cor<span className="text-black">Texte</span>
            </div>
        </div>

        {/* Mode nuit à droite */}
        <div className="flex items-center gap-2 cursor-pointer font-medium hover:opacity-80 transition-opacity">
          <span>🌙 Mode nuit</span>
        </div>
      </nav>
    );
}
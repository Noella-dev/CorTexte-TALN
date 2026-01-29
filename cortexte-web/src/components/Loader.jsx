import '../styles/loader.css';

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center p-10">
      <div className="loader"></div>
      <p className="mt-4 text-slate-400 font-medium animate-pulse">Analyse linguistique...</p>
    </div>
  );
}
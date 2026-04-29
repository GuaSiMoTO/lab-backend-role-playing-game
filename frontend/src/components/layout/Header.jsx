export default function Header() {
  return (
    <div className="page-header">
      <svg className="border-top" viewBox="0 0 700 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="14" x2="270" y2="14" stroke="#c8b888" strokeWidth="1"/>
        <circle cx="285" cy="14" r="4" fill="none" stroke="#7a5c3a" strokeWidth="1"/>
        <path d="M295 14 L305 6 L315 14 L305 22 Z" fill="none" stroke="#7a5c3a" strokeWidth="1"/>
        <circle cx="325" cy="14" r="3" fill="#8b1a0a" opacity=".7"/>
        <path d="M335 5 Q350 2 365 5 Q350 9 335 5Z" fill="#2d6050" opacity=".5"/>
        <circle cx="350" cy="14" r="5" fill="none" stroke="#1c1008" strokeWidth="1.5"/>
        <path d="M350 9 L350 19 M345 14 L355 14" stroke="#1c1008" strokeWidth="1"/>
        <path d="M335 23 Q350 20 365 23 Q350 19 335 23Z" fill="#2d6050" opacity=".5"/>
        <circle cx="375" cy="14" r="3" fill="#8b1a0a" opacity=".7"/>
        <path d="M385 14 L395 6 L405 14 L395 22 Z" fill="none" stroke="#7a5c3a" strokeWidth="1"/>
        <circle cx="415" cy="14" r="4" fill="none" stroke="#7a5c3a" strokeWidth="1"/>
        <line x1="430" y1="14" x2="700" y2="14" stroke="#c8b888" strokeWidth="1"/>
      </svg>

      <h1 className="page-title">
        <span className="capital">G</span>rimorio de los Héroes
      </h1>
      <p className="runic-divider">ᚢ ᚱ ᛈ ᚷ</p>
      <p className="page-tagline">Registro oficial de campeones, batallas y proezas del reino</p>

      <svg className="border-top" viewBox="0 0 700 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginTop: '.6rem', marginBottom: 0}}>
        <line x1="0" y1="9" x2="250" y2="9" stroke="#c8b888" strokeWidth=".8"/>
        <path d="M255 9 Q280 2 305 9 Q280 16 255 9Z" fill="none" stroke="#c8b888" strokeWidth=".8"/>
        <path d="M305 9 Q330 2 355 9 Q330 16 305 9Z" fill="#c8b888" opacity=".25"/>
        <path d="M355 9 Q380 2 405 9 Q380 16 355 9Z" fill="none" stroke="#c8b888" strokeWidth=".8"/>
        <line x1="410" y1="9" x2="700" y2="9" stroke="#c8b888" strokeWidth=".8"/>
      </svg>
    </div>
  );
}
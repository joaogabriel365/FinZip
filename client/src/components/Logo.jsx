export default function Logo({ inverted = false }) {
  return (
    <div className={'logo' + (inverted ? ' logo-inverted' : '')}>
      <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
        <rect width="28" height="28" rx="6" className="logo-mark" />
        <path d="M8 9h12L8 19h12" fill="none" stroke="#FFC94A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>FinZip</span>
    </div>
  );
}

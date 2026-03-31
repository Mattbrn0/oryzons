import HalftoneImage from './HalftoneImage'

const FILL = '#ffffff'

export default function MergedShape({ className = '' }: { className?: string }) {
  return (
    <div
      className={`reveal md:col-span-2 cursor-pointer hover:-translate-y-1.5 transform-gpu ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '520 / 400',
        transition: 'transform 0.55s cubic-bezier(0.34,1.2,0.64,1)',
      }}
    >
      {/* Shape 1 — bloc principal gauche avec halftone */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '61.5%',
          height: '100%',
          backgroundColor: FILL,
          borderRadius: '32px 0 32px 32px',
          overflow: 'hidden',
          border: '1px solid rgba(0,0,0,0.07)',
        }}
      >
        <HalftoneImage src="/david.png" grid={5} className="block h-full w-full" />
      </div>

      {/* Shape 2 — bloc supérieur droit */}
      <div
        style={{
          position: 'absolute',
          left: '61.5%',
          top: 0,
          width: '38.5%',
          height: '80%',
          backgroundColor: FILL,
          borderRadius: '0 32px 32px 0',
          border: '1px solid rgba(0,0,0,0.07)',
          borderLeft: 'none',
        }}
      />

      {/* Bridge SVG — raccord en coin concave entre Shape 2 et Shape 3 */}
      <svg
        style={{
          position: 'absolute',
          left: '61.5%',
          top: '80%',
          width: '6.2%',
          aspectRatio: '1',
          pointerEvents: 'none',
          display: 'block',
        }}
        viewBox="0 0 32 32"
        preserveAspectRatio="none"
      >
        <path d="M 0 0 C 0 23.872 5.76 32 32 32 H 0 Z" fill={FILL} />
      </svg>

      {/* Shape 3 — petit bloc bas droit avec bouton contact */}
      <div
        style={{
          position: 'absolute',
          left: '63.5%',
          top: '82.5%',
          width: '36.5%',
          height: '17.5%',
          backgroundColor: FILL,
          borderRadius: '32px',
          border: '1px solid rgba(0,0,0,0.07)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <a
          href="#contact"
          className="btn-glass-dark flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[0.78rem] font-medium"
          style={{ whiteSpace: 'nowrap' }}
        >
          Contact
          <svg className="size-2.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5M11.5 2.5V9" />
          </svg>
        </a>
      </div>
    </div>
  )
}

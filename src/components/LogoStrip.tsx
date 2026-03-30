const logos = [
  'Shopify', 'Stripe', 'Notion', 'Figma', 'Vercel',
  'Linear', 'Loom', 'Webflow', 'Framer', 'Supabase',
  'Shopify', 'Stripe', 'Notion', 'Figma', 'Vercel',
  'Linear', 'Loom', 'Webflow', 'Framer', 'Supabase',
]

export default function LogoStrip() {
  return (
    <div className="border-y border-border bg-white py-10">
      <p className="mb-7 text-center text-[0.72rem] font-medium uppercase tracking-[0.18em] text-subtle">
        Ils nous font confiance
      </p>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />
        <div className="anim-marquee flex w-max items-center gap-16">
          {logos.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="font-syne whitespace-nowrap text-[1rem] font-semibold tracking-tight text-ink/20"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

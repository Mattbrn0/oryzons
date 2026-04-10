import { useEffect, useId, useLayoutEffect, useRef, useState, type FormEvent } from 'react'
import { flushSync } from 'react-dom'
import { Link } from 'react-router-dom'
import { useIsMobileFormSteps } from '../hooks/useIsMobileFormSteps'
import {
  DEVIS_MOBILE_STEP_LABELS,
  DEVIS_MOBILE_STEPS,
  INFOS_MOBILE_STEP_LABELS,
  INFOS_MOBILE_STEPS,
  PROJECT_OPTIONS,
  assertSubmitTiming,
  canSubmitNow,
  deliverContact,
  errorsForDevisMobileStep,
  errorsForInformationsMobileStep,
  recordSubmitAttempt,
  validateContactFields,
  type ContactPayload,
  type FieldErrors,
  type RequestKind,
} from '../lib/contactForm'

const baseInput =
  'w-full rounded-lg border border-border bg-white px-4 py-3 text-[0.9rem] font-light text-ink outline-none transition-[border-color] duration-200 placeholder:text-subtle focus:border-ink/40 focus:ring-0 focus:shadow-none'

const errorRing = 'border-red-600/50 focus:border-red-600/60'

function emptyPayload(kind: RequestKind): ContactPayload {
  return {
    requestKind: kind,
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    message: '',
  }
}

type Props = {
  /** `devis` : formulaire complet ; `informations` : nom, e-mail, question uniquement */
  variant?: RequestKind
  heading?: string
  description?: string
  /** Affiche un lien « Voir les tarifs » vers l’accueil (surtout pour le devis) */
  showPricingLink?: boolean
  className?: string
}

const defaultCopy: Record<RequestKind, { heading: string; description: string }> = {
  devis: {
    heading: 'Un projet en tête ?',
    description:
      'Décrivez votre besoin : nous vous répondons sous 24h en moyenne avec une proposition adaptée.',
  },
  informations: {
    heading: 'Une question ?',
    description:
      'Posez-nous votre question sans engagement : nous vous répondrons par e-mail sous 24h ouvrées en moyenne.',
  },
}

export default function EmbeddedDevisForm({
  variant = 'devis',
  heading: headingProp,
  description: descriptionProp,
  showPricingLink = variant === 'devis',
  className = '',
}: Props) {
  const uid = useId()
  const hpRef = useRef<HTMLInputElement>(null)
  const submitTimingAnchorRef = useRef(0)
  const [form, setForm] = useState<ContactPayload>(() => emptyPayload(variant))
  const [formInstanceKey, setFormInstanceKey] = useState(0)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [thanksFlash, setThanksFlash] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const narrow = useIsMobileFormSteps()
  const [mStep, setMStep] = useState(0)
  const totalSteps = variant === 'devis' ? DEVIS_MOBILE_STEPS : INFOS_MOBILE_STEPS
  const stepLabels = variant === 'devis' ? DEVIS_MOBILE_STEP_LABELS : INFOS_MOBILE_STEP_LABELS

  const heading = headingProp ?? defaultCopy[variant].heading
  const description = descriptionProp ?? defaultCopy[variant].description
  const sectionId = variant === 'informations' ? 'infos-embed' : 'devis-embed'

  useLayoutEffect(() => {
    submitTimingAnchorRef.current = Date.now()
  }, [variant])

  useEffect(() => {
    if (!thanksFlash) return
    const t = window.setTimeout(() => setThanksFlash(false), 7000)
    return () => window.clearTimeout(t)
  }, [thanksFlash])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (submitting) return

    if (narrow && mStep < totalSteps - 1) {
      const stepErrs =
        variant === 'devis' ? errorsForDevisMobileStep(form, mStep) : errorsForInformationsMobileStep(form, mStep)
      if (Object.keys(stepErrs).length > 0) {
        setErrors(stepErrs)
        return
      }
      setErrors({})
      setMStep(s => s + 1)
      return
    }

    if ((hpRef.current?.value ?? '').trim() !== '') {
      await new Promise(r => setTimeout(r, 400 + Math.random() * 400))
      if (hpRef.current) hpRef.current.value = ''
      setMStep(0)
      setThanksFlash(true)
      return
    }

    const timing = assertSubmitTiming(submitTimingAnchorRef.current)
    if (!timing.ok) {
      setErrors({ form: timing.error })
      return
    }

    const gate = canSubmitNow()
    if (!gate.ok) {
      setErrors({ form: gate.error })
      return
    }

    const validated = validateContactFields({ ...form, requestKind: variant })
    if (!validated.ok) {
      setErrors(validated.errors)
      return
    }

    setErrors({})
    setSubmitting(true)
    recordSubmitAttempt()

    const result = await deliverContact(validated.data)
    setSubmitting(false)

    if (!result.ok) {
      setErrors({ form: result.error })
      return
    }

    flushSync(() => {
      setErrors({})
      if (hpRef.current) hpRef.current.value = ''
      setForm(emptyPayload(variant))
      setFormInstanceKey(k => k + 1)
      setMStep(0)
      submitTimingAnchorRef.current = Date.now()
    })
    setThanksFlash(true)
  }

  function fieldProps(field: keyof ContactPayload) {
    const hasErr = Boolean(errors[field])
    return {
      'aria-invalid': hasErr,
      className: `${baseInput} ${hasErr ? errorRing : ''}`,
    }
  }

  const fieldId = (suffix: string) => `${uid}-${suffix}`

  return (
    <section
      id={sectionId}
      className={`min-w-0 rounded-2xl border border-border bg-surface/90 p-4 text-left ring-1 ring-black/[0.04] sm:p-8 md:p-10 ${className}`}
    >
      <div className="mx-auto min-w-0 max-w-[560px] md:max-w-none">
        <h2
          style={{ fontFamily: "'Instrument Serif', serif" }}
          className="text-center text-[1.45rem] text-ink md:text-[1.6rem]"
        >
          {heading}
        </h2>
        <p className="mx-auto mt-3 max-w-[46ch] text-center text-[0.9rem] font-light leading-[1.75] text-muted">
          {description}
        </p>

        {showPricingLink ? (
          <div className="mt-5 flex justify-center">
            <Link
              to="/#pricing"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-2 text-[0.82rem] font-medium text-ink no-underline shadow-sm ring-1 ring-black/[0.04] transition-colors hover:bg-white/90"
            >
              Voir les tarifs
            </Link>
          </div>
        ) : null}

        <div className="mx-auto mt-8 max-w-[560px]">
          <form key={`${variant}-${formInstanceKey}`} className="relative" onSubmit={handleSubmit} noValidate autoComplete="on">
            <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
              <label htmlFor={fieldId('hp')}>Ne pas remplir</label>
              <input
                ref={hpRef}
                id={fieldId('hp')}
                name="field_hp_embed"
                type="text"
                tabIndex={-1}
                autoComplete="nope"
                defaultValue=""
              />
            </div>

            {errors.form ? (
              <p className="mb-4 rounded-lg border border-red-200 bg-red-50/90 px-3 py-2 text-[0.85rem] text-red-900" role="alert">
                {errors.form}
              </p>
            ) : null}

            {narrow ? (
              <div className="mb-5" aria-live="polite">
                <p className="text-center text-[0.72rem] font-medium uppercase tracking-[0.12em] text-subtle">
                  Étape {mStep + 1} / {totalSteps} — {stepLabels[mStep] ?? stepLabels[0]}
                </p>
                <div className="mt-2.5 flex gap-1.5" role="progressbar" aria-valuenow={mStep + 1} aria-valuemin={1} aria-valuemax={totalSteps}>
                  {Array.from({ length: totalSteps }, (_, i) => (
                    <div
                      key={i}
                      className={`h-1 min-w-0 flex-1 rounded-full transition-colors ${i <= mStep ? 'bg-ink/75' : 'bg-border'}`}
                    />
                  ))}
                </div>
              </div>
            ) : null}

            {narrow ? (
              <div className="grid grid-cols-1 gap-5">
                {mStep === 0 ? (
                  <>
                    <div>
                      <label htmlFor={fieldId('name')} className="mb-1.5 block text-[0.72rem] font-medium uppercase tracking-[0.1em] text-subtle">
                        Prénom & nom
                      </label>
                      <input
                        id={fieldId('name')}
                        name="name"
                        type="text"
                        required
                        maxLength={120}
                        autoComplete="name"
                        placeholder="Jean Dupont"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        {...fieldProps('name')}
                      />
                      {errors.name ? <p className="mt-1 text-[0.75rem] text-red-700">{errors.name}</p> : null}
                    </div>
                    <div>
                      <label htmlFor={fieldId('email')} className="mb-1.5 block text-[0.72rem] font-medium uppercase tracking-[0.1em] text-subtle">
                        Email
                      </label>
                      <input
                        id={fieldId('email')}
                        name="email"
                        type="email"
                        required
                        maxLength={254}
                        autoComplete="email"
                        placeholder={variant === 'informations' ? 'jean@exemple.fr' : 'jean@entreprise.fr'}
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        {...fieldProps('email')}
                      />
                      {errors.email ? <p className="mt-1 text-[0.75rem] text-red-700">{errors.email}</p> : null}
                    </div>
                  </>
                ) : null}

                {variant === 'devis' && mStep === 1 ? (
                  <>
                    <div>
                      <label htmlFor={fieldId('phone')} className="mb-1.5 block text-[0.72rem] font-medium uppercase tracking-[0.1em] text-subtle">
                        Téléphone
                      </label>
                      <input
                        id={fieldId('phone')}
                        name="tel"
                        type="tel"
                        required
                        maxLength={40}
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="06 12 34 56 78"
                        value={form.phone}
                        onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                        {...fieldProps('phone')}
                      />
                      {errors.phone ? <p className="mt-1 text-[0.75rem] text-red-700">{errors.phone}</p> : null}
                    </div>
                    <div>
                      <label htmlFor={fieldId('company')} className="mb-1.5 block text-[0.72rem] font-medium uppercase tracking-[0.1em] text-subtle">
                        Entreprise
                      </label>
                      <input
                        id={fieldId('company')}
                        name="organization"
                        type="text"
                        maxLength={120}
                        autoComplete="organization"
                        placeholder="Votre société (optionnel)"
                        value={form.company}
                        onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                        {...fieldProps('company')}
                      />
                    </div>
                  </>
                ) : null}

                {variant === 'devis' && mStep === 2 ? (
                  <div>
                    <label htmlFor={fieldId('project')} className="mb-1.5 block text-[0.72rem] font-medium uppercase tracking-[0.1em] text-subtle">
                      Type de projet
                    </label>
                    <select
                      id={fieldId('project')}
                      name="project_type"
                      required
                      style={{ fontFamily: 'inherit' }}
                      value={form.projectType}
                      onChange={e =>
                        setForm(f => ({ ...f, projectType: e.target.value as ContactPayload['projectType'] }))
                      }
                      className={`${baseInput} ${errors.projectType ? errorRing : ''}`}
                      aria-invalid={Boolean(errors.projectType)}
                    >
                      <option value="">Sélectionner…</option>
                      {PROJECT_OPTIONS.map(o => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                    {errors.projectType ? <p className="mt-1 text-[0.75rem] text-red-700">{errors.projectType}</p> : null}
                  </div>
                ) : null}

                {((variant === 'devis' && mStep === 3) || (variant === 'informations' && mStep === 1)) ? (
                  <div>
                    <label htmlFor={fieldId('message')} className="mb-1.5 block text-[0.72rem] font-medium uppercase tracking-[0.1em] text-subtle">
                      {variant === 'devis' ? 'Votre projet' : 'Votre question'}
                    </label>
                    <textarea
                      id={fieldId('message')}
                      name="message"
                      required
                      maxLength={5000}
                      rows={variant === 'devis' ? 4 : 4}
                      autoComplete="off"
                      placeholder={
                        variant === 'devis'
                          ? 'Décrivez votre entreprise, vos objectifs, ce que vous imaginez…'
                          : 'Posez-nous votre question : nous vous répondrons par e-mail.'
                      }
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      style={{
                        resize: 'vertical',
                        minHeight: variant === 'devis' ? '100px' : '88px',
                        fontFamily: 'inherit',
                      }}
                      {...fieldProps('message')}
                    />
                    <p className="mt-1 text-[0.7rem] text-subtle">{form.message.length} / 5000</p>
                    {errors.message ? <p className="mt-1 text-[0.75rem] text-red-700">{errors.message}</p> : null}
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className={variant === 'informations' ? 'sm:col-span-2' : ''}>
                  <label htmlFor={fieldId('name')} className="mb-1.5 block text-[0.72rem] font-medium uppercase tracking-[0.1em] text-subtle">
                    Prénom & nom
                  </label>
                  <input
                    id={fieldId('name')}
                    name="name"
                    type="text"
                    required
                    maxLength={120}
                    autoComplete="name"
                    placeholder="Jean Dupont"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    {...fieldProps('name')}
                  />
                  {errors.name ? <p className="mt-1 text-[0.75rem] text-red-700">{errors.name}</p> : null}
                </div>

                {variant === 'informations' ? (
                  <div className="sm:col-span-2">
                    <label htmlFor={fieldId('email')} className="mb-1.5 block text-[0.72rem] font-medium uppercase tracking-[0.1em] text-subtle">
                      Email
                    </label>
                    <input
                      id={fieldId('email')}
                      name="email"
                      type="email"
                      required
                      maxLength={254}
                      autoComplete="email"
                      placeholder="jean@exemple.fr"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      {...fieldProps('email')}
                    />
                    {errors.email ? <p className="mt-1 text-[0.75rem] text-red-700">{errors.email}</p> : null}
                  </div>
                ) : (
                  <>
                    <div>
                      <label htmlFor={fieldId('email')} className="mb-1.5 block text-[0.72rem] font-medium uppercase tracking-[0.1em] text-subtle">
                        Email
                      </label>
                      <input
                        id={fieldId('email')}
                        name="email"
                        type="email"
                        required
                        maxLength={254}
                        autoComplete="email"
                        placeholder="jean@entreprise.fr"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        {...fieldProps('email')}
                      />
                      {errors.email ? <p className="mt-1 text-[0.75rem] text-red-700">{errors.email}</p> : null}
                    </div>
                    <div>
                      <label htmlFor={fieldId('phone')} className="mb-1.5 block text-[0.72rem] font-medium uppercase tracking-[0.1em] text-subtle">
                        Téléphone
                      </label>
                      <input
                        id={fieldId('phone')}
                        name="tel"
                        type="tel"
                        required
                        maxLength={40}
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="06 12 34 56 78"
                        value={form.phone}
                        onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                        {...fieldProps('phone')}
                      />
                      {errors.phone ? <p className="mt-1 text-[0.75rem] text-red-700">{errors.phone}</p> : null}
                    </div>
                    <div>
                      <label htmlFor={fieldId('company')} className="mb-1.5 block text-[0.72rem] font-medium uppercase tracking-[0.1em] text-subtle">
                        Entreprise
                      </label>
                      <input
                        id={fieldId('company')}
                        name="organization"
                        type="text"
                        maxLength={120}
                        autoComplete="organization"
                        placeholder="Votre société (optionnel)"
                        value={form.company}
                        onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                        {...fieldProps('company')}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor={fieldId('project')} className="mb-1.5 block text-[0.72rem] font-medium uppercase tracking-[0.1em] text-subtle">
                        Type de projet
                      </label>
                      <select
                        id={fieldId('project')}
                        name="project_type"
                        required
                        style={{ fontFamily: 'inherit' }}
                        value={form.projectType}
                        onChange={e =>
                          setForm(f => ({ ...f, projectType: e.target.value as ContactPayload['projectType'] }))
                        }
                        className={`${baseInput} ${errors.projectType ? errorRing : ''}`}
                        aria-invalid={Boolean(errors.projectType)}
                      >
                        <option value="">Sélectionner…</option>
                        {PROJECT_OPTIONS.map(o => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                      {errors.projectType ? <p className="mt-1 text-[0.75rem] text-red-700">{errors.projectType}</p> : null}
                    </div>
                  </>
                )}

                <div className="sm:col-span-2">
                  <label htmlFor={fieldId('message')} className="mb-1.5 block text-[0.72rem] font-medium uppercase tracking-[0.1em] text-subtle">
                    {variant === 'devis' ? 'Votre projet' : 'Votre question'}
                  </label>
                  <textarea
                    id={fieldId('message')}
                    name="message"
                    required
                    maxLength={5000}
                    rows={variant === 'devis' ? 5 : 4}
                    autoComplete="off"
                    placeholder={
                      variant === 'devis'
                        ? 'Décrivez votre entreprise, vos objectifs, ce que vous imaginez…'
                        : 'Posez-nous votre question : nous vous répondrons par e-mail.'
                    }
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    style={{
                      resize: 'vertical',
                      minHeight: variant === 'devis' ? '120px' : '100px',
                      fontFamily: 'inherit',
                    }}
                    {...fieldProps('message')}
                  />
                  <p className="mt-1 text-[0.7rem] text-subtle">{form.message.length} / 5000</p>
                  {errors.message ? <p className="mt-1 text-[0.75rem] text-red-700">{errors.message}</p> : null}
                </div>
              </div>
            )}

            <div className={`mt-6 flex flex-col gap-3 ${narrow && mStep > 0 ? 'sm:flex-col' : ''} sm:flex-row sm:justify-end sm:gap-3`}>
              {narrow && mStep > 0 ? (
                <button
                  type="button"
                  className="order-2 w-full rounded-full border border-border bg-white py-3.5 text-[0.9rem] font-medium text-ink shadow-sm ring-1 ring-black/[0.04] transition-colors hover:bg-black/[0.03] sm:order-1 sm:w-auto sm:min-w-[7.5rem]"
                  onClick={() => {
                    setErrors({})
                    setMStep(s => Math.max(0, s - 1))
                  }}
                >
                  ← Retour
                </button>
              ) : null}
              <button
                type="submit"
                disabled={submitting}
                className="btn-glass-dark btn-hover order-1 w-full rounded-full py-3.5 text-[0.9rem] font-medium disabled:opacity-50 sm:order-2 sm:min-w-[12rem] sm:flex-1"
                style={{ fontFamily: 'inherit' }}
              >
                {thanksFlash
                  ? '✓ Message envoyé — Merci !'
                  : submitting
                    ? 'Envoi en cours…'
                    : narrow && mStep < totalSteps - 1
                      ? 'Suivant →'
                      : variant === 'devis'
                        ? 'Envoyer ma demande de devis →'
                        : 'Envoyer ma question →'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

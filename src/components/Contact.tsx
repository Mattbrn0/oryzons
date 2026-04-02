import { useEffect, useRef, useState, type FormEvent } from 'react'
import { flushSync } from 'react-dom'
import { useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import HalftoneImage from './HalftoneImage'
import {
  PROJECT_OPTIONS,
  canSubmitNow,
  deliverContact,
  recordSubmitAttempt,
  validateContactFields,
  type ContactPayload,
  type FieldErrors,
  type RequestKind,
} from '../lib/contactForm'

const baseInput =
  'w-full rounded-lg border border-border bg-surface px-4 py-3 text-[0.9rem] font-light text-ink outline-none transition-[border-color] duration-200 placeholder:text-subtle focus:border-ink/40 focus:ring-0 focus:shadow-none'

const errorRing = 'border-red-600/50 focus:border-red-600/60'

const choiceCard =
  'group flex flex-col items-start gap-2 rounded-2xl border border-border bg-surface/80 px-5 py-6 text-left shadow-sm ring-1 ring-black/[0.04] transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-ink/15 hover:shadow-md sm:px-6 sm:py-7'

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

const formMotion = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const },
}

export default function Contact() {
  const location = useLocation()
  const navigate = useNavigate()
  const [step, setStep] = useState<'choose' | RequestKind>('choose')
  const [form, setForm] = useState<ContactPayload>(() => emptyPayload('devis'))
  const [formInstanceKey, setFormInstanceKey] = useState(0)
  /** Non contrôlé : évite qu’un navigateur / extension remplisse le leurre et bloque l’envoi. */
  const hpRef = useRef<HTMLInputElement>(null)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [thanksFlash, setThanksFlash] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  /** Liens depuis À propos (ou ailleurs) : ouvrir directement devis ou infos. */
  useEffect(() => {
    const raw = location.state as { contactKind?: RequestKind } | null
    const kind = raw?.contactKind
    if (kind !== 'devis' && kind !== 'informations') return

    const t = window.setTimeout(() => {
      setThanksFlash(false)
      setErrors({})
      setForm(emptyPayload(kind))
      setStep(kind)
      navigate(
        { pathname: location.pathname, hash: location.hash, search: location.search },
        { replace: true, state: {} },
      )
    }, 0)
    return () => window.clearTimeout(t)
  }, [location.state, location.pathname, location.hash, location.search, navigate])

  useEffect(() => {
    if (!thanksFlash) return
    const t = window.setTimeout(() => setThanksFlash(false), 7000)
    return () => window.clearTimeout(t)
  }, [thanksFlash])

  function goChoose() {
    setStep('choose')
    setErrors({})
    setThanksFlash(false)
  }

  function pickKind(kind: RequestKind) {
    setForm(emptyPayload(kind))
    setErrors({})
    setThanksFlash(false)
    setStep(kind)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (submitting || step === 'choose') return

    if ((hpRef.current?.value ?? '').trim() !== '') {
      await new Promise(r => setTimeout(r, 400 + Math.random() * 400))
      if (hpRef.current) hpRef.current.value = ''
      setThanksFlash(true)
      return
    }

    const gate = canSubmitNow()
    if (!gate.ok) {
      setErrors({ form: gate.error })
      return
    }

    const validated = validateContactFields({ ...form, requestKind: step })
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
      setForm(emptyPayload(step))
      setFormInstanceKey(k => k + 1)
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

  return (
    <section id="contact" className="relative isolate scroll-mt-20 min-h-svh overflow-hidden border-t border-border bg-surface px-6 py-24 sm:px-8 sm:py-28 md:px-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 hidden h-[92svh] w-[92svh] -translate-x-1/2 -translate-y-1/2 opacity-[0.10] sm:block">
          <HalftoneImage
            src="/oryzons.svg"
            grid={7}
            reveal="bottomToTop"
            fit="contain"
            className="block h-full w-full"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 55% at 50% 52%, rgba(249,250,251,0.0) 0%, rgba(249,250,251,0.62) 55%, rgba(249,250,251,0.92) 78%, rgba(249,250,251,1) 100%)',
          }}
        />
      </div>
      <div className="mx-auto flex min-h-[calc(100svh-200px)] max-w-[720px] items-center">
        <div className="relative z-10 w-full">
          <div className="reveal mb-14 text-center">
            <p className="mb-3 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-subtle">Travaillons ensemble</p>
            <h2
              style={{ fontFamily: "'Instrument Serif', serif" }}
              className="text-[clamp(2rem,4.2vw,3.6rem)] leading-[1.08] text-ink"
            >
              Prêt à démarrer<br />votre projet ?
            </h2>
            <p className="mx-auto mt-4 max-w-[400px] text-[0.95rem] font-light leading-[1.75] text-muted">
              Décrivez-nous votre besoin — on vous répond sous 24h.
            </p>
          </div>

          <div className="reveal relative overflow-hidden rounded-2xl border border-border bg-white p-6 sm:p-10">
            <AnimatePresence mode="wait">
              {step === 'choose' ? (
                <motion.div key="choose" {...formMotion} className="space-y-6">
                  <p className="text-center text-[0.95rem] font-light text-muted">Quelle est la nature de votre demande ?</p>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <button type="button" className={choiceCard} onClick={() => pickKind('devis')}>
                      <span className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-subtle">Projet</span>
                      <span style={{ fontFamily: "'Instrument Serif', serif" }} className="text-[1.35rem] leading-snug text-ink sm:text-[1.45rem]">
                        Demande de devis
                      </span>
                      <span className="text-[0.82rem] font-light leading-relaxed text-muted">
                        Budget, type de site et description pour une proposition sur mesure.
                      </span>
                    </button>
                    <button type="button" className={choiceCard} onClick={() => pickKind('informations')}>
                      <span className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-subtle">Question</span>
                      <span style={{ fontFamily: "'Instrument Serif', serif" }} className="text-[1.35rem] leading-snug text-ink sm:text-[1.45rem]">
                        Demande d&apos;informations
                      </span>
                      <span className="text-[0.82rem] font-light leading-relaxed text-muted">
                        Une question rapide, sans engagement — nous vous répondons par e-mail.
                      </span>
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div key={step === 'devis' ? 'form-devis' : 'form-infos'} {...formMotion}>
                  <form key={`${step}-${formInstanceKey}`} onSubmit={handleSubmit} noValidate autoComplete="on">
                    <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                      <label htmlFor="field-hp-q8k">Ne pas remplir</label>
                      <input
                        ref={hpRef}
                        id="field-hp-q8k"
                        name="field_hp_q8k"
                        type="text"
                        tabIndex={-1}
                        autoComplete="nope"
                        defaultValue=""
                      />
                    </div>

                    <button
                      type="button"
                      onClick={goChoose}
                      className="mb-6 inline-flex items-center gap-1 text-[0.82rem] font-medium text-muted underline-offset-4 transition-colors hover:text-ink"
                    >
                      <span aria-hidden>←</span> Changer le type de demande
                    </button>

                    {errors.form ? (
                      <p className="mb-4 rounded-lg border border-red-200 bg-red-50/90 px-3 py-2 text-[0.85rem] text-red-900" role="alert">
                        {errors.form}
                      </p>
                    ) : null}

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div className={step === 'informations' ? 'sm:col-span-2' : ''}>
                        <label htmlFor="contact-name" className="mb-1.5 block text-[0.72rem] font-medium uppercase tracking-[0.1em] text-subtle">
                          Prénom & nom
                        </label>
                        <input
                          id="contact-name"
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

                      {step === 'devis' ? (
                        <>
                          <div>
                            <label htmlFor="contact-email" className="mb-1.5 block text-[0.72rem] font-medium uppercase tracking-[0.1em] text-subtle">
                              Email
                            </label>
                            <input
                              id="contact-email"
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
                            <label htmlFor="contact-phone" className="mb-1.5 block text-[0.72rem] font-medium uppercase tracking-[0.1em] text-subtle">
                              Téléphone
                            </label>
                            <input
                              id="contact-phone"
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
                            <label htmlFor="contact-company" className="mb-1.5 block text-[0.72rem] font-medium uppercase tracking-[0.1em] text-subtle">
                              Entreprise
                            </label>
                            <input
                              id="contact-company"
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
                            <label htmlFor="contact-project-type" className="mb-1.5 block text-[0.72rem] font-medium uppercase tracking-[0.1em] text-subtle">
                              Type de projet
                            </label>
                            <select
                              id="contact-project-type"
                              name="project_type"
                              required
                              style={{ fontFamily: 'inherit' }}
                              value={form.projectType}
                              onChange={e => setForm(f => ({ ...f, projectType: e.target.value as ContactPayload['projectType'] }))}
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
                      ) : null}

                      <div className="sm:col-span-2">
                        <label htmlFor="contact-message" className="mb-1.5 block text-[0.72rem] font-medium uppercase tracking-[0.1em] text-subtle">
                          {step === 'devis' ? 'Votre projet' : 'Votre question'}
                        </label>
                        <textarea
                          id="contact-message"
                          name="message"
                          required
                          maxLength={5000}
                          rows={step === 'devis' ? 5 : 4}
                          autoComplete="off"
                          placeholder={
                            step === 'devis'
                              ? 'Décrivez votre entreprise, vos objectifs, ce que vous imaginez…'
                              : 'Posez-nous votre question : nous vous répondrons par e-mail.'
                          }
                          value={form.message}
                          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                          style={{ resize: 'vertical', minHeight: step === 'devis' ? '120px' : '100px', fontFamily: 'inherit' }}
                          {...fieldProps('message')}
                        />
                        <p className="mt-1 text-[0.7rem] text-subtle">{form.message.length} / 5000</p>
                        {errors.message ? <p className="mt-1 text-[0.75rem] text-red-700">{errors.message}</p> : null}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-glass-dark btn-hover mt-6 w-full rounded-full py-3.5 text-[0.9rem] font-medium disabled:opacity-50"
                      style={{ fontFamily: 'inherit' }}
                    >
                      {thanksFlash
                        ? '✓ Message envoyé — Merci !'
                        : submitting
                          ? 'Envoi en cours…'
                          : 'Envoyer ma demande →'}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

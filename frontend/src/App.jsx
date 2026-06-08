import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useMotionValue, useSpring } from 'framer-motion'

const roles = ['AI Developer', 'Backend Engineer', 'Problem Solver', 'Tech Builder']

const projects = [
  {
    title: 'InterviewIQ',
    description:
      'AI-powered interview simulation platform with voice-driven mock interviews, scoring, and feedback.',
    features: ['Speech transcription', 'LLM evaluation', 'Groq Whisper', 'Llama 3.3 70B'],
    github: 'https://github.com/ThrishahK/AIB',
    live: '#',
    tech: ['React', 'FastAPI', 'Python', 'AI']
  },
  {
    title: 'Hotel Management System',
    description:
      'End-to-end hotel operations portal for reservations, dining, orders, and customer workflows.',
    features: ['MySQL integration', 'Responsive UI', 'Booking engine', 'Service management'],
    github: 'https://github.com/ThrishahK/HotelManagementFinal',
    live: '#',
    tech: ['HTML', 'CSS', 'JavaScript', 'MySQL']
  }
]

const skills = [
  'Java',
  'Python',
  'Spring Boot',
  'React',
  'FastAPI',
  'Web Scraping',
  'REST API',
  'Tailwind',
  'GSAP',
  'Three.js'
]

const timeline = [
  {
    title: 'Data Enricher Intern',
    company: 'Fashion Intelligence Studio',
    date: 'Jun 2025 – Jul 2025',
    bullets: [
      'Built Selenium pipelines for product data extraction at scale.',
      'Cleaned, normalized, and enriched fashion attributes with automation.',
      'Implemented color analysis to power personalization workflows.'
    ]
  },
  {
    title: 'Core Technical Member',
    company: 'Computer Society of India (CSI)',
    date: '2024 – Present',
    bullets: [
      'Led a multiplayer gamified coding platform team.',
      'Guided architecture, implementation, and project presentations.',
      'Organized workshops and technical collaboration events.'
    ]
  }
]

const achievements = [
  { label: 'Excellent CGPA', value: '9.56' },
  { label: 'Fashion Data Pipeline', value: '50K+ items' },
  { label: 'Global Awards', value: '2 International' }
]

const socials = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/thrisha-k' },
  { label: 'GitHub', href: 'https://github.com/ThrishahK' },
  { label: 'Email', href: 'mailto:kthrisha54@gmail.com' }
]

const sectionContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04
    }
  }
}

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } }
}

function MagneticLink({ href, children, className, ...props }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 180, damping: 22 })
  const springY = useSpring(y, { stiffness: 180, damping: 22 })

  const handleMouseMove = (event) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const translatorX = (event.clientX - rect.left - rect.width / 2) / 6
    const translatorY = (event.clientY - rect.top - rect.height / 2) / 8
    x.set(translatorX)
    y.set(translatorY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20, duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.a>
  )
}

function CountUpCard({ value, suffix = '', decimals = 0, inView, description }) {
  const [displayValue, setDisplayValue] = useState(0)
  const motionValue = useMotionValue(0)

  useEffect(() => {
    const unsubscribe = motionValue.on('change', (latest) => {
      setDisplayValue(decimals ? Number(latest.toFixed(decimals)) : Math.round(latest))
    })
    return () => unsubscribe()
  }, [motionValue, decimals])

  useEffect(() => {
    if (!inView) return
    animate(motionValue, value, {
      duration: 1,
      ease: 'easeOut'
    })
  }, [inView, motionValue, value])

  return (
    <motion.div
      className="rounded-[32px] border border-white/10 bg-slate-950/80 p-8 text-center shadow-2xl shadow-slate-950/20 backdrop-blur-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <div className="mb-4 rounded-3xl bg-violet-500/10 p-6 text-4xl font-semibold text-violet-300">
        {displayValue}
        {suffix}
      </div>
      <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{description}</p>
    </motion.div>
  )
}

function App() {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [pointer, setPointer] = useState({ x: -240, y: -240 })
  const pointerX = useMotionValue(-240)
  const pointerY = useMotionValue(-240)
  const springX = useSpring(pointerX, { stiffness: 300, damping: 20 })
  const springY = useSpring(pointerY, { stiffness: 300, damping: 20 })
  const achievementRef = useRef(null)
  const achievementInView = useInView(achievementRef, { once: true, amount: 0.45 })

  useEffect(() => {
    const current = roles[phraseIndex]
    let timeout

    if (displayText.length < current.length) {
      timeout = setTimeout(
        () => setDisplayText(current.slice(0, displayText.length + 1)),
        80
      )
    } else {
      timeout = setTimeout(() => {
        setDisplayText('')
        setPhraseIndex((value) => (value + 1) % roles.length)
      }, 1400)
    }

    return () => clearTimeout(timeout)
  }, [displayText, phraseIndex])

  useEffect(() => {
    pointerX.set(pointer.x - 140)
    pointerY.set(pointer.y - 140)
  }, [pointer, pointerX, pointerY])

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-[#05040f] text-slate-100"
      onMouseMove={(event) => {
        setPointer({ x: event.clientX, y: event.clientY })
      }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(168,85,247,0.2),transparent_22%),radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.18),transparent_18%),radial-gradient(circle_at_60%_80%,rgba(139,92,246,0.14),transparent_20%)]" />
        <div className="absolute left-[-120px] top-1/4 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl animate-blob" />
        <div className="absolute right-[-100px] top-1/2 h-80 w-80 rounded-full bg-cyan-500/15 blur-3xl animate-blob" style={{ animationDelay: '1.8s' }} />
        <div className="absolute left-1/2 top-2/3 h-64 w-64 -translate-x-1/2 rounded-full bg-fuchsia-400/10 blur-3xl" />
        <motion.div
          className="cursor-glow"
          style={{ x: springX, y: springY }}
        />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-[1600px] flex-col gap-24 px-6 py-8 md:px-10 lg:px-14">
        <motion.header
          className="flex flex-col gap-3"
          initial="hidden"
          animate="show"
          variants={fadeUp}
        >
          <div className="flex items-center justify-between gap-4 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-slate-200 shadow-xl shadow-violet-500/5 backdrop-blur-xl md:max-w-[720px]">
            <span className="text-violet-300">Thrisha K</span>
            <span className="text-slate-400">AI Engineer · Backend Developer · Startup Builder</span>
          </div>
        </motion.header>

        <section className="relative flex min-h-[85vh] flex-col justify-center gap-8 overflow-hidden rounded-[34px] border border-white/10 bg-slate-950/80 px-6 py-10 shadow-2xl shadow-[#4f46e5]/20 backdrop-blur-2xl md:px-12 lg:px-16">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-violet-500/10 to-transparent" />
          <motion.div
            className="absolute right-10 top-10 hidden h-24 w-24 rounded-full border border-violet-400/30 bg-violet-500/10 blur-2xl md:block"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          />
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="space-y-6"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-violet-500/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-violet-300 shadow-[0_12px_50px_-40px_rgba(139,92,246,0.8)]">
                futuristic portfolio
              </span>
              <div className="space-y-4">
                <h1 className="text-5xl font-semibold uppercase leading-[0.95] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
                  THRISHA K
                </h1>
                <div className="space-y-1 text-3xl font-semibold leading-[1.02] text-slate-100 sm:text-4xl lg:text-5xl">
                  <p>Building AI Systems</p>
                  <p>That Think, Analyze,</p>
                  <p>and Scale.</p>
                </div>
              </div>
              <motion.div variants={fadeUp} className="flex items-center gap-3 text-2xl font-semibold text-violet-300 sm:text-3xl">
                <span>{displayText}</span>
                <span className="inline-block h-[1.4em] animate-blink">|</span>
              </motion.div>
              <motion.p variants={fadeUp} className="max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                Building premium backend and AI-first experiences with modern engineering, scalable systems, and immersive product design.
              </motion.p>
              <div className="flex flex-wrap gap-4">
                <MagneticLink
                  href="#projects"
                  className="button-magnetic inline-flex items-center justify-center rounded-full bg-violet-400 px-6 py-3 text-base font-semibold text-slate-950 shadow-[0_16px_40px_-16px_rgba(124,58,237,0.8)] transition duration-200 hover:bg-violet-300"
                >
                  Explore Projects
                </MagneticLink>
                <MagneticLink
                  href="#contact"
                  className="button-magnetic inline-flex items-center justify-center rounded-full border border-violet-400/40 bg-slate-900/80 px-6 py-3 text-base font-semibold text-white transition duration-200 hover:border-violet-300/70 hover:bg-slate-900"
                >
                  Contact Me
                </MagneticLink>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0, y: [0, -2, 0] }}
              transition={{ duration: 2.8, ease: 'easeInOut', repeat: Infinity }}
              className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-violet-500/10 backdrop-blur-xl"
            >
              <div className="absolute -left-16 top-0 h-44 w-44 rounded-full bg-blue-400/10 blur-3xl" />
              <div className="absolute -right-10 bottom-8 h-40 w-40 rounded-full bg-fuchsia-500/10 blur-3xl" />
              <div className="relative z-10 space-y-6">
                <div className="rounded-[28px] border border-white/10 bg-slate-950/80 p-6 shadow-xl shadow-slate-950/20">
                  <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Signature system</p>
                  <h2 className="mt-3 text-3xl font-semibold text-white">AI + Backend</h2>
                  <p className="mt-3 text-slate-300">Smart product flows, optimized data models, and beautiful interfaces designed for modern startups.</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {['Spring Boot', 'FastAPI', 'React', 'Python'].map((item) => (
                    <div key={item} className="rounded-3xl border border-white/10 bg-slate-950/80 p-4 text-center text-sm text-slate-200 shadow-inner shadow-slate-950/20">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <motion.section
          id="projects"
          className="space-y-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionContainer}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.35em] text-violet-300">Featured work</p>
              <h2 className="text-4xl font-semibold text-white sm:text-5xl">Projects built for scale.</h2>
            </div>
            <p className="max-w-xl text-slate-400">Focused on product-first engineering, interactive experiences, and backend systems that support AI-driven workflows.</p>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            {projects.map((project, index) => {
              const featured = project.title === 'InterviewIQ'
              return (
                <motion.article
                  key={project.title}
                  className={`group relative overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/20 transition duration-200 ${featured ? 'hover:border-violet-300/40' : 'hover:border-violet-400/30'}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: [0, featured ? -7 : -4, 0] }}
                  whileHover={{ scale: featured ? 1.034 : 1.02 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.04 }}
                >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-500/5 opacity-0 transition duration-200 group-hover:opacity-100" />
                <div className="relative z-10 space-y-5">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm uppercase tracking-[0.35em] text-violet-300">Project</span>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="rounded-full bg-white/5 px-3 py-1">Featured</span>
                    </div>
                  </div>
                  <h3 className="text-3xl font-semibold text-white">{project.title}</h3>
                  <p className="text-slate-400">{project.description}</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {project.features.map((item) => (
                      <span key={item} className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    {project.tech.map((tech) => (
                      <span key={tech} className="rounded-2xl bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.18em] text-slate-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3 pt-4">
                    <MagneticLink
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="button-magnetic inline-flex items-center justify-center rounded-full border border-violet-400/30 bg-slate-900/90 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500/10"
                    >
                      GitHub
                    </MagneticLink>
                    <MagneticLink
                      href={project.live}
                      className="button-magnetic inline-flex items-center justify-center rounded-full bg-violet-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-violet-300"
                    >
                      Live Demo
                    </MagneticLink>
                  </div>
                </div>
              </motion.article>
            )})}
          </div>
        </motion.section>

        <motion.section
          className="space-y-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionContainer}
        >
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Capabilities</p>
            <h2 className="text-4xl font-semibold text-white">Skills that power modern AI products.</h2>
          </div>
          <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  className="rounded-[28px] border border-white/10 bg-white/5 p-6 text-center text-sm font-semibold text-slate-100 shadow-[0_24px_80px_-48px_rgba(59,130,246,0.8)] backdrop-blur-xl"
                  whileHover={{ y: -6, scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20, duration: 0.2, delay: index * 0.03 }}
                >
                {skill}
              </motion.div>
            ))}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/60 to-transparent" />
          </div>
        </motion.section>

        <motion.section
          className="space-y-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionContainer}
        >
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.35em] text-violet-300">Experience</p>
            <h2 className="text-4xl font-semibold text-white">Trajectory of growth.</h2>
          </div>
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
            <div className="absolute left-10 top-10 h-[calc(100%-2.5rem)] w-px bg-gradient-to-b from-violet-400/80 to-transparent" />
            <div className="space-y-10">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="relative grid gap-4 md:grid-cols-[0.35fr_1fr]"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.04 }}
                >
                  <div className="relative pl-10 text-right text-sm text-slate-400 md:pl-0 md:text-left">
                    <div className="absolute left-0 top-0 h-4 w-4 rounded-full bg-violet-400 shadow-[0_0_0_8px_rgba(124,58,237,0.08)]" />
                    <p className="font-semibold text-slate-100">{item.date}</p>
                  </div>
                  <div className="rounded-[28px] border border-white/10 bg-slate-950/90 p-6 text-slate-300 shadow-lg shadow-slate-950/10">
                    <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm uppercase tracking-[0.18em] text-violet-300">{item.company}</p>
                    <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7 text-slate-400">
                      {item.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          ref={achievementRef}
          className="space-y-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionContainer}
        >
          <motion.div variants={fadeUp} className="space-y-3">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Achievements</p>
            <h2 className="text-4xl font-semibold text-white">Premium recognition.</h2>
          </motion.div>
          <div className="grid gap-6 xl:grid-cols-3">
            <CountUpCard
              value={9.56}
              suffix=""
              decimals={2}
              inView={achievementInView}
              description="Excellent CGPA"
            />
            <CountUpCard
              value={50}
              suffix="K+"
              decimals={0}
              inView={achievementInView}
              description="Items processed"
            />
            <CountUpCard
              value={2}
              suffix=""
              decimals={0}
              inView={achievementInView}
              description="International awards"
            />
          </div>
        </motion.section>

        <motion.section
          id="contact"
          className="space-y-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionContainer}
        >          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.35em] text-violet-300">Contact</p>
            <h2 className="text-4xl font-semibold text-white">Command center for collaboration.</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[32px] border border-white/10 bg-slate-950/80 p-8 shadow-[0_35px_120px_-50px_rgba(59,130,246,0.35)] backdrop-blur-xl">
              <div className="space-y-5">
                <p className="text-lg leading-8 text-slate-300">
                  I’m available for internships, backend and AI engineering roles, and ambitious product work with startups.
                </p>
                <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
                  <p className="text-sm uppercase tracking-[0.35em] text-violet-300">Get in touch</p>
                  <p className="mt-4 text-3xl font-semibold text-white">kthrisha54@gmail.com</p>
                  <p className="mt-2 text-slate-500">Thrisha K · +91 7022472620</p>
                </div>
              </div>
            </div>
            <div className="rounded-[32px] border border-white/10 bg-slate-950/80 p-8 shadow-xl shadow-slate-950/20 backdrop-blur-xl">
              <div className="space-y-5">
                <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Follow the network</p>
                <div className="grid gap-4">
                  {socials.map((social) => (
                    <MagneticLink
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="button-magnetic flex items-center justify-between rounded-3xl border border-white/10 bg-slate-900/80 px-5 py-4 text-white transition duration-200 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-slate-900"
                    >
                      <span>{social.label}</span>
                      <span className="text-violet-300">↗</span>
                    </MagneticLink>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default App

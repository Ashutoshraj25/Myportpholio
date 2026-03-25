import { motion } from 'framer-motion'

export default function SectionHeading({ kicker, title, description, align = 'left' }) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <motion.p
        className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.45 }}
      >
        {kicker}
      </motion.p>
      <motion.h2
        className="font-display text-3xl font-semibold text-white sm:text-4xl lg:text-[2.75rem]"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5, delay: 0.05 }}
      >
        {title}
      </motion.h2>
      {description ? (
        <motion.p
          className="mt-5 text-base leading-8 text-slate-300"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {description}
        </motion.p>
      ) : null}
    </div>
  )
}

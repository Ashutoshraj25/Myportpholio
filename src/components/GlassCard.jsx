import { motion } from 'framer-motion'

export default function GlassCard({ children, className = '', whileHover }) {
  return (
    <motion.div
      whileHover={whileHover}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className={[
        'rounded-[28px] border border-white/10 bg-white/[0.05] shadow-[0_24px_80px_rgba(15,23,42,0.45)] backdrop-blur-2xl',
        className,
      ].join(' ')}
    >
      {children}
    </motion.div>
  )
}

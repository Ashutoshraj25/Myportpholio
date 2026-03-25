import GlassCard from '../components/GlassCard'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'

export default function TechStackSection({ items }) {
  return (
    <section id="stack" className="scroll-mt-28">
      <GlassCard className="px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
        <SectionHeading
          kicker="Tech Stack"
          title="The tools I rely on for polished frontend systems and dependable backend delivery."
          description="Each piece of the stack is presented as part of a cohesive product workflow, from interface craftsmanship to API-driven architecture."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {items.map((item, index) => {
            const Icon = item.icon

            return (
              <Reveal key={item.name} delay={0.08 * index}>
                <GlassCard className="group h-full p-6" whileHover={{ y: -10, scale: 1.02 }}>
                  <div className={`inline-flex rounded-2xl bg-gradient-to-br ${item.color} p-[1px]`}>
                    <div className="grid h-16 w-16 place-items-center rounded-2xl bg-slate-950/95 text-3xl text-white">
                      <Icon />
                    </div>
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-semibold text-white">{item.name}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-400">
                    Modern tooling for fast iteration, maintainable systems, and strong production polish.
                  </p>
                </GlassCard>
              </Reveal>
            )
          })}
        </div>
      </GlassCard>
    </section>
  )
}

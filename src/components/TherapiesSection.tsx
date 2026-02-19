import { motion } from "framer-motion";
import { Heart, Leaf, Sun, TreeDeciduous, LucideIcon } from "lucide-react";

const therapies = [
  {
    icon: null as any,
    customLabel: "BR",
    title: "BioReprogramación",
    description:
      "Transforma creencias limitantes y patrones emocionales profundos para reprogramar tu biología y activar tu capacidad natural de sanación.",
  },
  {
    icon: null as any,
    customLabel: "TRE",
    title: "Terapia de Respuesta Espiritual (TRE)",
    description:
      "Sistema de investigación espiritual que conecta con tu Yo Superior para identificar y limpiar energías discordantes, bloqueos y programas negativos que afectan tu bienestar.",
  },
  {
    icon: null as any,
    customLabel: "5LB",
    title: "5 Leyes Biológicas",
    description:
      "Comprende cómo tu cuerpo responde a los conflictos emocionales a través de las cinco leyes biológicas, descubriendo el sentido de cada síntoma y su proceso de sanación natural.",
  },
  {
    icon: null as any,
    customLabel: "RE",
    title: "Reestructuración Espiritual",
    description:
      "Proceso profundo de alineación y restauración de tu estructura energética y espiritual, liberando cargas, memorias y programas que limitan tu evolución y bienestar integral.",
  },
  {
    icon: Leaf,
    title: "Psicogenealogía",
    description:
      "Explora tu árbol genealógico para identificar y liberar patrones heredados, lealtades invisibles y conflictos transgeneracionales que impactan tu vida actual.",
  },
];

const TherapiesSection = () => {
  return (
    <section id="terapias" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.25em] uppercase text-primary font-medium mb-3">
            Mis Terapias
          </p>
          <h2 className="text-3xl md:text-5xl font-heading font-light">
            Caminos hacia tu <span className="italic font-medium text-gradient-primary">sanación</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {therapies.map((therapy, index) => (
            <motion.div
              key={therapy.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group rounded-2xl border border-border/50 bg-card p-8 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-primary">
                {therapy.icon ? <therapy.icon size={24} /> : <span className="text-base font-extrabold tracking-tight">{(therapy as any).customLabel}</span>}
              </div>
              <h3 className="text-xl font-heading font-medium mb-3">
                {therapy.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {therapy.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TherapiesSection;

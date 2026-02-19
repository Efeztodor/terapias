import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";

const courses = [
  {
    title: "Confección de tu Árbol Genealógico",
    description:
      "Aprende a construir y analizar tu árbol genealógico como herramienta terapéutica para identificar patrones familiares, lealtades invisibles y dinámicas transgeneracionales.",
    duration: "4 horas",
    modality: "Online y Presencial",
  },
  {
    title: "Confección de Árbol de Méritos",
    description:
      "Reconoce los méritos familiares que se toman por derecho al pertenecer a una familia, integrando y honrando los logros y fortalezas de tu linaje.",
    duration: "2 horas",
    modality: "Online",
  },
  {
    title: "Taller de Psicogenealogía",
    description:
      "Formación completa en psicogenealogía dividida en 4 módulos de 12 horas cada uno, donde explorarás las dinámicas familiares y transgeneracionales que influyen en tu vida.",
    duration: "4 módulos · 12h c/u",
    modality: "Online",
  },
];

const CoursesSection = () => {
  return (
    <section id="cursos" className="py-24 bg-lavender">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.25em] uppercase text-primary font-medium mb-3">
            Formación
          </p>
          <h2 className="text-3xl md:text-5xl font-heading font-light">
            Cursos y <span className="italic font-medium text-gradient-primary">talleres</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="rounded-2xl bg-card border border-border/50 p-8 flex flex-col hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-xl font-heading font-medium mb-3">
                {course.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                {course.description}
              </p>
              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-6">
                <span className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1">
                  <Clock size={12} /> {course.duration}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1">
                  <Calendar size={12} /> {course.modality}
                </span>
              </div>
              <a
                href="#contacto"
                className="text-center rounded-full border border-primary/30 py-2.5 text-sm font-medium text-primary hover:bg-accent transition-colors"
              >
                Más Información
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;

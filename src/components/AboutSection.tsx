import { motion } from "framer-motion";
import aboutImg from "@/assets/about-img.jpg";

const AboutSection = () => {
  return (
    <section id="sobre-mi" className="py-24 bg-lavender">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}>

            <img

              alt="Espacio de terapias complementarias"
              className="rounded-2xl shadow-xl w-full aspect-square object-cover"
              loading="lazy" src="/lovable-uploads/e70dd81a-ba7d-4eb5-91da-af720f80c821.jpg" />

          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}>

            <p className="text-sm tracking-[0.25em] uppercase text-primary font-medium mb-3">
              Sobre Mí
            </p>
            <h2 className="text-3xl md:text-4xl font-heading font-light mb-6 leading-tight">
              Hola, soy{" "}
              <span className="text-gradient-primary font-medium italic">
                Paola Paredes
              </span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              ​Soy Ingeniera de profesión y terapeuta por vocación, con formación en Terapia de respuesta espiritual (TRE), Reestructuración espiritual, Psicogenealogía y BioReprogramación. cuento además con conocimiento en 5 leyes biológicas, una maravillosa forma de comprender el cuerpo.
                                             
            

            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">​Estoy para acompañarte en tu proceso de cambio y mejora en tu vida y la de tu entorno, a través de las distintas terapias según lo que requieras.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Las terapias pueden ser de manera presencial u online.
            </p>
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline underline-offset-4">

              Conóceme más →
            </a>
          </motion.div>
        </div>
      </div>
    </section>);

};

export default AboutSection;
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
const HeroSection = () => {
  return <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="h-full w-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center pt-20">
        <motion.p initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }} className="text-sm md:text-base tracking-[0.3em] uppercase text-primary font-medium mb-4">TERAPIAS COMPLEMENTARIAS </motion.p>

        <motion.h1 initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8,
        delay: 0.2
      }} className="text-4xl md:text-6xl lg:text-7xl font-heading font-light leading-tight mb-6">
          Evolucionar en{" "}
          <span className="text-gradient-primary font-medium italic">conciencia</span>
          <br />
          de lo que somos
        </motion.h1>

        <motion.p initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8,
        delay: 0.4
      }} className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-10 font-light">
           Acompaño tu proceso de transformación a través de las diferentes terapias que conectan tu cuerpo, mente y espíritu.
        </motion.p>

        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8,
        delay: 0.6
      }} className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#terapias" className="rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity">
            Descubrir Terapias
          </a>
          <a href="#agenda" className="rounded-full border border-primary/30 px-8 py-3.5 text-sm font-medium text-primary hover:bg-accent transition-colors">
            Agendar Sesión
          </a>
        </motion.div>
      </div>
    </section>;
};
export default HeroSection;
import { motion } from "framer-motion";
import { CalendarCheck } from "lucide-react";

const AgendaSection = () => {
  return (
    <section id="agenda" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center rounded-3xl bg-gradient-to-br from-primary/10 via-accent to-lavender p-12 md:p-16 border border-primary/10">

          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6">
            <CalendarCheck size={32} />
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-light mb-4">
            Reserva tu{" "}
            <span className="italic font-medium text-gradient-primary">sesión</span>
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Al momento de reservar recibirás las instrucciones para poder tomar la sesión. ¡No dudes en consultar!                        
          
          </p>
          <a
            href="https://wa.me/56977929416?text=Hola,%20quiero%20agendar"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation();
              window.open("https://wa.me/56977929416?text=Hola,%20quiero%20agendar", "_blank");
            }}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity cursor-pointer">
            <CalendarCheck size={18} />
            WhatsApp
          </a>
        </motion.div>
      </div>
    </section>);

};

export default AgendaSection;
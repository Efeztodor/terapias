import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo-paola.png";
const navLinks = [{
  label: "Inicio",
  href: "#inicio"
}, {
  label: "Sobre Mí",
  href: "#sobre-mi"
}, {
  label: "Terapias",
  href: "#terapias"
}, {
  label: "Cursos",
  href: "#cursos"
}, {
  label: "Contacto",
  href: "#contacto"
}];
const Navbar = () => {
  const [open, setOpen] = useState(false);
  return <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        <a href="#inicio">
          <img alt="Paola Paredes" className="h-16 md:h-24 w-auto" src="/logo-paola-paredes.png" decoding="async" />
        </a>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(link => <li key={link.href}>
              <a href={link.href} className="text-sm font-medium tracking-wide text-foreground/70 hover:text-primary transition-colors">
                {link.label}
              </a>
            </li>)}
          <li>
            <a href="#agenda" className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity">
              Reservar Cita
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && <motion.div initial={{
        height: 0,
        opacity: 0
      }} animate={{
        height: "auto",
        opacity: 1
      }} exit={{
        height: 0,
        opacity: 0
      }} className="md:hidden overflow-hidden bg-background border-b border-border">
            <ul className="flex flex-col items-center gap-4 py-6">
              {navLinks.map(link => <li key={link.href}>
                  <a href={link.href} onClick={() => setOpen(false)} className="text-base font-medium text-foreground/70 hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>)}
              <li>
                <a href="#agenda" onClick={() => setOpen(false)} className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground">
                  Reservar Cita
                </a>
              </li>
            </ul>
          </motion.div>}
      </AnimatePresence>
    </nav>;
};
export default Navbar;
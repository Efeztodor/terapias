import logo from "@/assets/logo-paola.png";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <img src={logo} alt="Paola Paredes" className="h-24 w-auto" />
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Paola Paredes · Terapias Complementarias
        </p>
      </div>
    </footer>
  );
};

export default Footer;

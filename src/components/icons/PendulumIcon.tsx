import pendulumImg from "@/assets/pendulum-icon.png";

interface PendulumIconProps {
  size?: number;
  className?: string;
}

const PendulumIcon: React.FC<PendulumIconProps> = ({ size = 24, className }) => (
  <img
    src={pendulumImg}
    alt="Péndulo"
    width={size}
    height={size}
    className={className}
    style={{ objectFit: "contain" }}
  />
);

export default PendulumIcon;

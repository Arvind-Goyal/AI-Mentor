import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";

const Hero = () => {
  return (
    <section
      className="relative overflow-hidden bg-[#FCFCFD]"
      style={{
        background: `
          radial-gradient(
            ellipse 900px 700px at -10% -10%,
            rgba(139,92,246,0.12),
            transparent 60%
          ),
          radial-gradient(
            ellipse 700px 600px at 110% 100%,
            rgba(59,130,246,0.10),
            transparent 60%
          ),
          #FCFCFD
        `,
      }}
    >
      {/* Soft overlay for a premium feel */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/40" />

      {/* Hero Content */}
      <div className="relative mx-auto max-w-8xl px-6 pt-28 pb-24 lg:px-8">
        {/* <div className="grid items-center gap-20 lg:grid-cols-2"> */}
          <div className="mx-auto max-w-[1500px] grid lg:grid-cols-[0.8fr_1.2fr] gap-12 items-center">
          <HeroContent />
          <HeroImage />
        </div>
      </div>
    </section>
  );
};

export default Hero;
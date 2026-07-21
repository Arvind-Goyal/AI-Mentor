import HeroBadge from "./HeroBadge";
import HeroButtons from "./HeroButtons";
import TrustIndicators from "./TrustIndicators";

const HeroContent = () => {
  return (
    <div className="flex flex-col items-start justify-center">
      {/* Badge */}
      <HeroBadge />

      {/* Heading */}
      <h1 className="mt-6 text-5xl font-extrabold leading-[1.1] tracking-tight text-slate-900 lg:text-7xl">
        Understand Every{" "}
        <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
          Problem.
        </span>
        <br />
        Not Just The Solution.
      </h1>

      {/* Description */}
      <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
        Analyze coding problems, unlock progressive hints, discover the
        right patterns, receive AI-powered feedback, and build lasting
        problem-solving skills.
      </p>

      {/* CTA Buttons */}
      <div className="mt-10">
        <HeroButtons />
      </div>

      {/* Trust Indicators */}
      <div className="mt-8">
        <TrustIndicators />
      </div>
    </div>
  );
};

export default HeroContent;
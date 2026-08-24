import { useState } from "react";
import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";
import AuthPanel from "./AuthPanel";

const Hero = () => {
  const [mode, setMode] = useState("preview");

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto grid min-h-screen w-full max-w-[1600px] grid-cols-1 items-center gap-8 px-8 py-20 lg:grid-cols-[0.95fr_1.05fr] lg:px-12 xl:px-16">

        {/* LEFT */}
        <div className="flex min-h-[500px] w-full max-w-[700px] flex-col justify-center">
          <HeroContent
            mode={mode}
            onStartLearning={() => setMode("signup")}
            onBackToPreview={() => setMode("preview")}
          />
        </div>

        {/* RIGHT */}
        <div className="flex w-full items-center justify-center">
          {mode === "preview" && <HeroImage />}

          {mode === "signup" && (
            <AuthPanel
              mode="signup"
              setMode={setMode}
            />
          )}

          {mode === "login" && (
            <AuthPanel
              mode="login"
              setMode={setMode}
            />
          )}
        </div>

      </div>
    </section>
  );
};

export default Hero;
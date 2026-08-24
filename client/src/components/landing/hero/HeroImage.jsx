import preview from "../../../assets/images/analyze.png";

const HeroImage = () => {
  return (
       <div className="relative w-full max-w-[920px]">

      {/* Glow */}
      <div className="absolute inset-0 bg-purple-500/15 blur-3xl rounded-full scale-110" />

      {/* Window */}
      <div className="relative rounded-3xl overflow-hidden border border-gray-200 bg-white shadow-2xl">

        {/* Screenshot */}
        <img
          src={preview}
          alt="AI DSA Mentor"
          className="w-full object-cover"
        />
      </div>
    </div>
  
  );
};

export default HeroImage;
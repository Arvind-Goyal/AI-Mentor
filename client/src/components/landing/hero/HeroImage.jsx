// import FloatingCard from "./FloatingCard";

// import BrowserFrame from "./hero-dashboard/BrowserFrame";
// import DashboardHeader from "./hero-dashboard/DashboardHeader";
// import QuickStats from "./hero-dashboard/QuickStats";
// import LearningJourney from "./hero-dashboard/LearningJourney";
// import CodePreview from "./hero-dashboard/CodePreview";
// import AIReviewCard from "./hero-dashboard/AIReviewCard";

import preview from "../../../assets/images/analyze.png";

// import {
//   Brain,
//   Sparkles,
//   Target,
// } from "lucide-react";

const HeroImage = () => {
  return (
       <div className="relative">

      {/* Glow */}
      <div className="absolute inset-0 bg-purple-500/15 blur-3xl rounded-full scale-110" />

      {/* Window */}
      <div className="relative rounded-3xl overflow-hidden border border-gray-200 bg-white shadow-2xl">

        {/* macOS Header */}
        {/* <div className="flex items-center gap-2 px-5 py-4 border-b bg-[#FCFBFD]">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28C840]" />

          <div className="flex-1 flex justify-center">
            <div className="px-5 py-1 rounded-full bg-gray-100 text-xs text-gray-500">
              ai-dsa-mentor.app
            </div>
          </div>
        </div> */}

        {/* Screenshot */}
        <img
          src={preview}
          alt="AI DSA Mentor"
          className="w-full object-cover"
        />
      </div>
    </div>
    // <div className="relative flex justify-center lg:justify-end">

    //   {/* Floating Cards */}

    //   <div className="absolute -top-10 -left-10 z-20">
    //     <FloatingCard
    //       icon={Brain}
    //       title="Difficulty"
    //       value="Medium"
    //     />
    //   </div>

    //   <div className="absolute top-1/2 -left-16 z-20 -translate-y-1/2">
    //     <FloatingCard
    //       icon={Target}
    //       title="Pattern"
    //       value="HashMap"
    //     />
    //   </div>

    //   <div className="absolute -bottom-8 -right-8 z-20">
    //     <FloatingCard
    //       icon={Sparkles}
    //       title="AI Mentor"
    //       value="Ready"
    //     />
    //   </div>

    //   {/* Dashboard */}

    //   <div className="relative w-full max-w-[760px]">

    //     <BrowserFrame>

    //       <DashboardHeader />

    //       <QuickStats />

    //       <LearningJourney />

    //       <div className="grid grid-cols-2 gap-6 p-6">
    //         <CodePreview />
    //         <AIReviewCard />
    //       </div>

    //     </BrowserFrame>

    //   </div>

      // </div>
  );
};

export default HeroImage;
import { useAnalysis } from "../../context/AnalysisContext";
import ConceptsCard from "./ConceptsCard";
import DailyChallengeCard from "./DailyChallengeCard";
import GoalCard from "./GoalCard";
import LearningProgressCard from "./LearningProgressCard";
import MentorHeader from "./MentorHeader";
import MistakesCard from "./MistakesCard";
import MotivationCard from "./MotivationCard";
import StatusCard from "./StatusCard";

const MentorPanel = () => {
  
  return (
    <div className="sticky top-6 space-y-6">

      <MentorHeader />
      <StatusCard/>
      {/* <GoalCard/> */}
      {/* <ConceptsCard/> */}
      <MistakesCard/>
      <MotivationCard/>
      {/* <LearningProgressCard/>
      <DailyChallengeCard/> */}


    </div>
  );
};

export default MentorPanel;
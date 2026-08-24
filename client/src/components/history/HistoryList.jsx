import HistoryItem from "./HistoryItem";

const HistoryList = ({ history, onContinue }) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      {history.map((session) => (
        <HistoryItem
          key={session._id}
          session={session}
          onContinue={onContinue}
        />
      ))}
    </div>
  );
};

export default HistoryList;
import TotalMissionCard from "./TotalMissionCard";

export default function MissionSection({
  title,
  missions,
}) {
  return (
    <div className="mb-5">

      <h3
        className="
          text-white
          font-bold
          mb-3
        "
      >
        {title}
      </h3>

      <div className="space-y-3">

        {missions.map(
          (mission, index) => (
            <TotalMissionCard
              key={index}
              mission={mission}
            />
          )
        )}

      </div>

    </div>
  );
}
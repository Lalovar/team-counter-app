import { Button } from "reactstrap";

import { Views } from "../App";
import { saveDataOnStorage, StorageType } from "../controller";

export type Stat = {
  name: string;
  color: string;
  count: string[];
};

type StatsProps = {
  stats: Stat[];
  selectedPlayer: string;
  setView: React.Dispatch<React.SetStateAction<Views>>;
};

export function Stats({ stats, setView, selectedPlayer }: StatsProps) {
  function handlePlayerClick(statName: string) {
    setView(Views.PLAYERS);
    const data = [...stats];
    const selectedStat = data.find((statItem) => statItem.name === statName);
    selectedStat?.count.push(selectedPlayer);
    saveDataOnStorage(data, StorageType.STATS);
  }

  return (
    <>
      <div className="view-container">
        {stats.map((stat, i) => (
          <Button
            className={"view-button"}
            color={stat.color}
            size="lg"
            block
            key={`${stat.name}-${i}`}
            onClick={() => handlePlayerClick(stat.name)}
          >
            {stat.name}
          </Button>
        ))}
      </div>
    </>
  );
}

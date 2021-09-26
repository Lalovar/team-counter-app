import { Button } from "reactstrap";
import { Views } from "./../App";

export type Player = {
  name: string;
};

type PlayerProps = {
  setView: React.Dispatch<React.SetStateAction<Views>>;
  setSelectedPlayer: React.Dispatch<React.SetStateAction<string>>;
  players: Player[];
};

export function Players({ players, setView, setSelectedPlayer }: PlayerProps) {
  function handlePlayerClick(name: string) {
    setView(Views.STATS);
    setSelectedPlayer(name);
  }

  return (
    <div className="view-container">
      {players.map((player, i) => (
        <Button
          className="view-button"
          color="secondary"
          size="lg"
          block
          key={`${player.name}-${i}`}
          onClick={() => handlePlayerClick(player.name)}
        >
          {player.name}
        </Button>
      ))}
    </div>
  );
}

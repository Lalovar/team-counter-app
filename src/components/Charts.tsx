import { useState } from "react";
import {
  Nav,
  NavItem,
  NavLink,
  Button,
  ListGroup,
  ListGroupItem,
} from "reactstrap";

import { Views } from "../App";
import { clearOnlyMatchStorage, clearStorage } from "../controller";
import { Player } from "./Players";
import { Stat } from "./Stats";

type ChartsProps = {
  setView: React.Dispatch<React.SetStateAction<Views>>;
  stats: Stat[];
  players: Player[];
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  setStats: React.Dispatch<React.SetStateAction<Stat[]>>;
};

enum DELETION {
  ALL,
  MATCH,
}

export function Charts({
  setView,
  stats,
  players,
  setPlayers,
  setStats,
}: ChartsProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<String>();

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedPlayer(value);
  };

  const handleDeleteAll = (criteria: DELETION) => {
    const answer = window.confirm("Segura?");
    if (answer) {
      if (criteria === DELETION.ALL) {
        clearStorage(setPlayers, setStats);
      }
      if (criteria === DELETION.MATCH) {
        clearOnlyMatchStorage(setStats, stats);
      }
    }
  };

  return (
    <>
      <Nav>
        <NavItem color={"secondary"}>
          <NavLink onClick={() => setView(Views.PLAYERS)}>Atrás</NavLink>
        </NavItem>
      </Nav>
      <h1>Totales</h1>
      <ListGroup>
        {stats?.map((item) => (
          <ListGroupItem color={item.color} key={`total-${item.name}`}>
            {`${item.name} --> ${item.count.length}`}
          </ListGroupItem>
        ))}
      </ListGroup>
      <br />
      <h1>Por jugador:</h1>
      <select onChange={selectChange}>
        <option value="">Selecciona opción</option>
        {players?.map((item, i) => (
          <option value={item.name} key={`combo-${item.name}-${i}`}>
            {item.name}
          </option>
        ))}
      </select>
      {selectedPlayer && getResultsPerPlayer(selectedPlayer, stats)}
      <br />
      <br />
      <br />
      <br />
      <Button
        color="warning"
        size="lg"
        block
        onClick={() => handleDeleteAll(DELETION.MATCH)}
      >
        Borrar datos de partido
      </Button>
      <br />
      <Button
        color="danger"
        size="lg"
        block
        onClick={() => handleDeleteAll(DELETION.ALL)}
      >
        Borrar datos de partido y jugadores
      </Button>
    </>
  );
}

function getResultsPerPlayer(selectedPlayer: String, stats: Stat[]) {
  const totals: { name: string; color: string; count: number }[] = [];
  stats.forEach((stat) => {
    const total = stat.count.filter((count) => count === selectedPlayer);
    totals.push({ name: stat.name, color: stat.color, count: total.length });
  });
  return (
    <ListGroup>
      {totals.map((item, i) => (
        <ListGroupItem color={item.color} key={`totalsPerPlayer-${item.name}`}>
          {`${item.name} --> ${item.count}`}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}

import { useEffect, useState } from "react";
import {
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import "./App.css";
import { Charts } from "./components/Charts";
import { ManagePlayers } from "./components/ManagePlayers";
import { ManageStats } from "./components/ManageStats";
import { Player, Players } from "./components/Players";
import { Stat, Stats } from "./components/Stats";
import { getPlayersFromStorage, getStatsFromStorage } from "./controller";

export enum Views {
  PLAYERS,
  STATS,
  CHARTS,
  MANAGE_PLAYERS,
  MANAGE_STATS,
}

function App() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [stats, setStats] = useState<Stat[]>([]);
  const [view, setView] = useState(Views.PLAYERS);
  const [selectedPlayer, setSelectedPlayer] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    setPlayers(getPlayersFromStorage());
    setStats(getStatsFromStorage());
  }, []);

  return (
    <div className="App">
      {view === Views.PLAYERS && (
        <>
          <Nav>
            <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle nav caret>
                Menu
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => setView(Views.MANAGE_PLAYERS)}>
                  Organizar Jugadores
                </DropdownItem>
                <DropdownItem onClick={() => setView(Views.MANAGE_STATS)}>
                  Organizar estadisticas
                </DropdownItem>
                <DropdownItem onClick={() => setView(Views.CHARTS)}>
                  Ver Resultados
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Nav>
          <Players
            players={players}
            setView={setView}
            setSelectedPlayer={setSelectedPlayer}
          />
        </>
      )}
      {view === Views.STATS && (
        <>
          <Nav>
            <NavItem>
              <NavLink onClick={() => setView(Views.PLAYERS)}>Atrás</NavLink>
            </NavItem>
          </Nav>
          <Stats
            stats={stats}
            setView={setView}
            selectedPlayer={selectedPlayer}
          />
        </>
      )}
      {view === Views.CHARTS && (
        <Charts
          setView={setView}
          stats={stats}
          players={players}
          setPlayers={setPlayers}
          setStats={setStats}
        />
      )}
      {view === Views.MANAGE_PLAYERS && (
        <ManagePlayers
          setView={setView}
          players={players}
          setPlayers={setPlayers}
        />
      )}
      {view === Views.MANAGE_STATS && (
        <ManageStats setView={setView} stats={stats} setStats={setStats} />
      )}
    </div>
  );
}

export default App;

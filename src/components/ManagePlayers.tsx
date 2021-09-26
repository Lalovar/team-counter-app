import { useState } from "react";
import { Views } from "../App";
import {
  Nav,
  NavItem,
  NavLink,
  Input,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import { Player } from "./Players";
import { saveDataOnStorage, StorageType } from "../controller";

type ManagePlayerProps = {
  setView: React.Dispatch<React.SetStateAction<Views>>;
  players: Player[];
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
};

export function ManagePlayers({
  setView,
  players,
  setPlayers,
}: ManagePlayerProps) {
  const [inputValue, setInputValue] = useState("");

  function removePlayer(name: string): void {
    console.log("removing " + name);
    const data = [...players];
    const newData = data.filter((item) => item.name !== name);
    setPlayers(newData);
    //save obj newData
  }

  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === "Enter") {
      const data = [...players];
      data.push({ name: inputValue.trim() });
      setPlayers(data);
      saveDataOnStorage(data, StorageType.PLAYERS);
      setInputValue("")
    }
  }

  return (
    <>
      <Nav>
        <NavItem>
          <NavLink onClick={() => setView(Views.PLAYERS)}>Atrás</NavLink>
        </NavItem>
      </Nav>
      <ListGroup horizontal="lg">
        {players.map((item, i) => (
          <ListGroupItem key={`jugdores-${item.name}-${i}`}>
            {item.name} <span onClick={() => removePlayer(item.name)}>❌</span>
          </ListGroupItem>
        ))}
        <ListGroupItem>
          <Input
            type="text"
            placeholder="Agregar jugador"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(evt) => handleKeyPress(evt)}
          />
        </ListGroupItem>
      </ListGroup>
    </>
  );
}

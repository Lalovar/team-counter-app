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
import { Stat } from "./Stats";
import { saveDataOnStorage, StorageType } from "../controller";

type ManageStatsProps = {
  setView: React.Dispatch<React.SetStateAction<Views>>;
  stats: Stat[];
  setStats: React.Dispatch<React.SetStateAction<Stat[]>>;
};

export function ManageStats({ setView, stats, setStats }: ManageStatsProps) {
  const [inputValue, setInputValue] = useState("");

  function removePlayer(name: string): void {
    console.log("removing " + name);
    const data = [...stats];
    const newData = data.filter((item) => item.name !== name);
    setStats(newData);
    //save obj newData
  }

  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === "Enter") {
      const data = [...stats];
      data.push({ name: inputValue.trim(), color: "default", count: [] });
      setStats(data);
      saveDataOnStorage(data, StorageType.PLAYERS);
      setInputValue("");
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
        {stats.map((item, i) => (
          <ListGroupItem key={`stat-${item.name}-${i}`}>
            {item.name} <span onClick={() => removePlayer(item.name)}>❌</span>
          </ListGroupItem>
        ))}
        <ListGroupItem>
          <Input
            type="text"
            placeholder="Agregar estadistica"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(evt) => handleKeyPress(evt)}
          />
        </ListGroupItem>
      </ListGroup>
    </>
  );
}

import React from "react";
import { Player } from "./components/Players";
import { Stat } from "./components/Stats";

export enum StorageType {
  PLAYERS = "players",
  STATS = "stats",
}

const defaultStats = [
  { name: "Punto", color: "success", count: [] },
  { name: "Error", color: "danger", count: [] },
  { name: "Buen Servicio", color: "success", count: [] },
  { name: "Mal Servicio", color: "danger", count: [] },
];

export function getPlayersFromStorage() {
  return JSON.parse(localStorage.getItem(StorageType.PLAYERS) ?? "[]");
}

export function getStatsFromStorage() {
  return JSON.parse(
    localStorage.getItem(StorageType.STATS) ?? JSON.stringify(defaultStats)
  );
}

export function saveDataOnStorage(data: any, nameOfStorage: StorageType) {
  localStorage.setItem(nameOfStorage, JSON.stringify(data));
}

export function clearStorage(
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>,
  setStats: React.Dispatch<React.SetStateAction<Stat[]>>
) {
  setPlayers([]);
  setStats(defaultStats);
  localStorage.clear();
}

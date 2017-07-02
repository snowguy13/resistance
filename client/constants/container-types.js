import Opening from '../components/opening/opening';
import Login from '../components/login/login';
import Lobby from '../components/lobby/lobby';

export const OPENING = 0;
export const LOGIN = 1;
export const LOBBY = 2;

export const Classes = {
  [OPENING]: Opening,
  [LOGIN]: Login,
  [LOBBY]: Lobby,
};

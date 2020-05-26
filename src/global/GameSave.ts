import { Inventory, Item } from "@timtimtstuff/tstuffgametools";

export interface GameSave {
    version:number
    playerName:string
    inventory:{[index:string]:Item}
}
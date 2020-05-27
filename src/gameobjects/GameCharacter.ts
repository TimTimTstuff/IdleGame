import { Inventory, NumberAttributeBag, NamedNumberAttributes } from "@timtimtstuff/tstuffgametools";
import { GameContext } from "../global/GameContext";

export class GameCharacter {

    private _inventory: Inventory

    constructor(inv:Inventory) {
       this._inventory = inv
    }
    
    public getInventory():Inventory{
        return this._inventory
    }

}
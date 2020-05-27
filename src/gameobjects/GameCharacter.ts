import { Inventory, NumberAttributeBag, NamedNumberAttributes, IGameLoopEvent } from "@timtimtstuff/tstuffgametools";
import { GameContext } from "../global/GameContext";
import { CharacterAttack } from "./CharacterAttack";
import * as PIXI from 'pixi.js'

export class GameCharacter implements IGameLoopEvent {

    EVID: string = "";
    private _inventory: Inventory
    private _charAttack:CharacterAttack

    constructor(inv:Inventory) {
       this._inventory = inv
       this._charAttack = new CharacterAttack(2,new PIXI.Point(150,250),2)
       GameContext.instance.loopEvents.registerEvent(this)
       this._charAttack.onAttack = () => {
           //console.log('Attack!')
        }
    }
    
    isEnabled(): boolean {
        return true
    }

    public update() {
        
        this._charAttack.update()
    }

    fixedUpdate() {
       
    }
    
    public getInventory():Inventory{
        return this._inventory
    }

}
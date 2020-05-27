import { IGameLoopEvent } from "@timtimtstuff/tstuffgametools";
import { CharacterAttack } from "./CharacterAttack";
import { GameContext } from "../global/GameContext";
import * as PIXI from 'pixi.js'

export interface EnemyData {
    name:string
    hp:number
    dmg:number
    attackSpeed:number
}

export class EnemyCharacter implements IGameLoopEvent {
    EVID: string = ""
    private _data: EnemyData
    private _currentHp: number
    private _attack:CharacterAttack

    constructor(data:EnemyData,pos:PIXI.Point) {
        this._data = data
        this._currentHp = data.hp
        this._attack = new CharacterAttack(data.attackSpeed,pos,0.4)
        this._attack.onAttack = () => {
            //console.log(`${data.name} Attacks`)
        }
        GameContext.instance.loopEvents.registerEvent(this)
    }

    isEnabled(): boolean {
        return true
    }

    update() {
        this._attack.update()
    }
    fixedUpdate: (() => void) | undefined;

}
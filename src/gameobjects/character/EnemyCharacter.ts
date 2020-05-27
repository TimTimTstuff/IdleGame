import { IGameLoopEvent } from "@timtimtstuff/tstuffgametools";
import { CharacterAttack } from "./CharacterAttack";
import { GameContext } from "../../global/GameContext";
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
    private _enemySprite:PIXI.Sprite
    private _attack:CharacterAttack
    private _container: PIXI.Container

    constructor(data:EnemyData,pos:PIXI.Point,scale:number) {
        this._data = data
        this._currentHp = data.hp
        this._container = new PIXI.Container()
        this._enemySprite = new PIXI.Sprite(GameContext.instance.resources['enemy'].texture)
       
       
        let scaleFactor = (100/this._enemySprite.width*200)/100
        this._enemySprite.scale.set(scaleFactor,scaleFactor)
        this._container.addChild(this._enemySprite)
        GameContext.instance.canvasApp.stage.addChild(this._container)
        this._attack = new CharacterAttack(data.attackSpeed,this._container)
        this._attack.onAttack = () => {
            //console.log(`${data.name} Attacks`)
        }
        this._container.position = pos
        this._container.scale.set(scale,scale)
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
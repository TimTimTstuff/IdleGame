import { IGameLoopEvent } from "@timtimtstuff/tstuffgametools";
import { AttackHandler } from "./CharacterAttack";
import { GameContext } from "../../global/GameContext";
import * as PIXI from 'pixi.js'
import { GameLogType, GameTextLog } from "../../global/util/GameTextLog";
import { DataBar } from "../canvasui/DataBar";

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
    //private _attack:AttackHandler
    private _container: PIXI.Container
    private _bar: DataBar
    private _bar2: DataBar

    private _num: number = 0

    constructor(data:EnemyData,pos:PIXI.Point,scale:number) {
        this._data = data
        this._currentHp = data.hp
        this._container = new PIXI.Container()
        this._enemySprite = new PIXI.Sprite(GameContext.I.resources['enemy1'].texture)
       
       
        let scaleFactor = (100/this._enemySprite.width*200)/100
        this._enemySprite.scale.set(scaleFactor,scaleFactor)
        this._enemySprite.position.set(0,25)
        this._container.addChild(this._enemySprite)

        this._bar = new DataBar(new PIXI.Sprite(GameContext.I.resources['l_back'].texture), new PIXI.Sprite(GameContext.I.resources['l_front'].texture),0xcccccc,false)
        this._bar2 = new DataBar(new PIXI.Sprite(GameContext.I.resources['l_back'].texture), new PIXI.Sprite(GameContext.I.resources['l_front'].texture),0xcccccc,true)
        this._container.addChild(this._bar)
        this._container.addChild(this._bar2)

        GameContext.I.canvasApp.stage.addChild(this._container)
        //this._attack = new AttackHandler(data.attackSpeed,this._container)
        ////    GameTextLog.Log('X Attacks You wiht Y dealing 0 Dmg',GameLogType.inatt)
        //}
        this._container.position = pos
        this._container.scale.set(scale,scale)
        GameContext.I.loopEvents.registerEvent(this)
    }

    isEnabled(): boolean {
        return true
    }

    update() {
        //this._attack.update()
        this._num++
        this._bar.setPercentage(this._num)
        this._bar2.setPercentage(100-this._num)
        if(this._num >= 100)
            this._num = 0
    }
    fixedUpdate: (() => void) | undefined;

}
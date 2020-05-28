import { GameContext } from "../../global/GameContext";


export interface GameAreaData{
    name:string
    backgroundImage:string
}

export class GameArea {
    private _data: GameAreaData;
    private areaContainer: PIXI.Container

    constructor(areaData:GameAreaData) {
        this._data = areaData
        this.areaContainer = new PIXI.Container()
        this.areaContainer.addChild(new PIXI.Sprite(GameContext.I.resources[this._data.backgroundImage].texture))
        GameContext.I.canvasApp.stage.addChild(this.areaContainer)
    }


    

}
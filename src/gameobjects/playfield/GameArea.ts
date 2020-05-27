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
        this.areaContainer.addChild(new PIXI.Sprite(GameContext.instance.resources[this._data.backgroundImage].texture))
        GameContext.instance.canvasApp.stage.addChild(this.areaContainer)
    }


    

}
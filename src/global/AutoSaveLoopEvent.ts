import { IGameLoopEvent, GameLoop } from "@timtimtstuff/tstuffgametools";
import { GameContext } from "./GameContext";


export class AutoSaveLoopEvent implements IGameLoopEvent  {
    EVID: string = 'asle01';
    private _lastTime: number = 0
    private _saveAll: number = 25*1000
    isEnabled(): boolean {
        return true
    }
    update: (() => void) | undefined;
    fixedUpdate: (() => void) | undefined = () => {
       
        if(GameLoop.totalTime - this._lastTime >= this._saveAll){
            GameContext.instance.save.saveFile()
            console.log('Auto Save!', GameLoop.totalTime)
            
            this._lastTime = GameLoop.totalTime
        }
    };

}
import { IGameLoopEvent, GameLoop } from "@timtimtstuff/tstuffgametools";
import { GameContext } from "./GameContext";
import { GameTextLog, GameLogType } from "./util/GameTextLog";


export class AutoSaveLoopEvent implements IGameLoopEvent  {
    EVID: string = 'asle01';
    private _lastTime: number = 0
    private _saveAll: number = 25*1000
    isEnabled(): boolean {
        return true
    }
    private counter = 0
    update: (() => void) | undefined;
    fixedUpdate: (() => void) | undefined = () => {
    
        this.counter++
        if(GameLoop.totalTime - this._lastTime >= this._saveAll){
            GameContext.I.save.saveFile()
            //console.log('Auto Save!', GameLoop.totalTime)
            GameTextLog.Log('Game Saved!',GameLogType.info)
            
            this._lastTime = GameLoop.totalTime
        }
    };

}
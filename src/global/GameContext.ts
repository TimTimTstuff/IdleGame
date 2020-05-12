import { ISaveHandler, GameLoop, LocalStorageSaveHandler, GameLoopEventRegister, GameEventRegister } from "@timtimtstuff/tstuffgametools";
import { GameSave } from "./GameSave";

export class GameContext {

    public static instance : GameContext
    public canvasApp : PIXI.Application
    public save : ISaveHandler
    public gameLoop : GameLoop
    public loopEvents : GameLoopEventRegister
    public gameEvents : GameEventRegister
    public gameSave : GameSave = {playerName: 'unknown'}
    /**
     *
     */
    constructor(canvasApp : PIXI.Application, gameKey:string) {
        GameContext.instance = this
        this.canvasApp = canvasApp
        this.save = new LocalStorageSaveHandler(gameKey)
        this.gameLoop = new GameLoop()
        this.loopEvents = new GameLoopEventRegister()
        this.gameEvents = new GameEventRegister()
        this.setupGameLoop()
        this.setupSaveFile()
    }

    public startGame() {
        this.save.initializeSave()
        this.gameLoop.start()
    }

    private setupSaveFile() {
        
        this.save.saveNotFound = () => {
            // setup new Save file
            this.save.addSaveObject('main',this.gameSave)
            console.log(`New Save file was created!`)
        }

        this.save.saveLoaded = () => {
            // store loaded object
            this.gameSave = this.save.getSaveObject('main')
            console.log(`Save file loaded!`)
        }
    }

    private setupGameLoop() {
        this.gameLoop.addUpdate(() => {
            this.loopEvents.callAllUpdateEvents()
        })
        this.gameLoop.addFixUpdate(() => {
            this.loopEvents.callAllFixedUpdateEvents()
        })
    }

   

}
import * as TGame from "@timtimtstuff/tstuffgametools";
import { GameSave } from "./GameSave";
import { GameConfig } from "./GameConfig";
import { GameCharacter } from "../gameobjects/GameCharacter";
import { Inventory } from "@timtimtstuff/tstuffgametools";

export class GameContext {

    public static instance : GameContext
    public canvasApp : PIXI.Application
    public save : TGame.ISaveHandler
    public gameLoop : TGame.GameLoop
    public loopEvents : TGame.GameLoopEventRegister
    public gameEvents : TGame.GameEventRegister
    public gameSave : GameSave = <any>{}
    public htmlGameElement: HTMLElement | null
    public char: GameCharacter | null = null
    public resources: { [index: string]: PIXI.LoaderResource; } = {};
    /**
     *
     */
    constructor(canvasApp : PIXI.Application, gameKey:string, gameHtmlElement:string) {
        GameContext.instance = this
        this.htmlGameElement = document.getElementById(`${gameHtmlElement}`)
        this.canvasApp = canvasApp
        this.save = new TGame.LocalStorageSaveHandler(gameKey)
        this.gameLoop = new TGame.GameLoop()
        this.loopEvents = new TGame.GameLoopEventRegister()
        this.gameEvents = new TGame.GameEventRegister()

        this.setupGameLoop()
        this.setupSaveFile()
    }

    public startGame() {
        this.save.initializeSave()
        this.gameLoop.start()
        document.getElementById('center')?.append(this.canvasApp.view)
        console.log(this)
    }

    private setupSaveFile() {
        
        this.save.saveNotFound = () => {
            // setup new Save file
            this.save.addSaveObject('main',this.gameSave)
            console.log(`New Save file was created!`)
        }

        this.save.saveLoaded = () => {
            // store loaded object
            let saveObj = <GameSave>this.save.getSaveObject('main')
            if(saveObj.version == undefined || saveObj.version < GameConfig.saveVersion) {
                saveObj.version = GameConfig.saveVersion
                if(saveObj.playerName == undefined) saveObj.playerName = 'unknown'
                if(saveObj.inventory == undefined) saveObj.inventory = {}
            }
            this.gameSave = saveObj
            this.char = new GameCharacter(new Inventory(this.gameSave.inventory))
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
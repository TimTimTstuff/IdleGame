import * as PIXI from 'pixi.js'
import './style/main.css'
import { GameContext } from './global/GameContext'
import { GameCharacter } from './gameobjects/GameCharacter'
import { GameError } from '@timtimtstuff/tstuffgametools'
import { AutoSaveLoopEvent } from './global/AutoSaveLoopEvent'
import { GameLoader } from './global/GameLoader'
import { EnemyCharacter } from './gameobjects/EnemyCharacter'

const ctx = new GameContext(
    new PIXI.Application({
    width: 500,
    height: 300,
    backgroundColor: 0x000000
}), 
'tidle',
'game-area')

GameLoader.LoadPixiTextures((resources:({[index:string]:PIXI.LoaderResource})) =>{
  
    ctx.resources = resources
    ctx.loopEvents.registerEvent(new AutoSaveLoopEvent())
    let s = new PIXI.Sprite(resources['demo_bg'].texture)
    ctx.canvasApp.stage.addChild(s) 
     ctx.startGame()

     let enemy = new EnemyCharacter({attackSpeed:0.6, name:'Fast', hp:100, dmg:1},new PIXI.Point(50,50))
     let enemy2 = new EnemyCharacter({attackSpeed:1.1, name:'Normal', hp:100, dmg:1},new PIXI.Point(350,50))
     let enemy3 = new EnemyCharacter({attackSpeed:4, name:'Slow', hp:100, dmg:1},new PIXI.Point(200,100))
})



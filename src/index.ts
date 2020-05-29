import * as PIXI from 'pixi.js'
import './style/main.css'
import { GameContext } from './global/GameContext'
import { AutoSaveLoopEvent } from './global/AutoSaveLoopEvent'
import { GameLoader } from './global/GameLoader'
import { EnemyCharacter } from './gameobjects/character/EnemyCharacter'
import { GameTextLog, GameLogType } from './global/util/GameTextLog'

const ctx = new GameContext(
    new PIXI.Application({
    width: 500,
    height: 300,
    backgroundColor: 0x000000
}), 
'tidle')

var wentOffline:Date = new Date()

document.addEventListener('visibilitychange',(e) => {
  
  if(document.hidden){
      wentOffline = new Date()
      ctx.gameLoop.stop()
      GameTextLog.Log('Paused Game',GameLogType.info)
    console.log('stop')
  }else{
    let dif = (new Date().getTime())-wentOffline.getTime()
    let boost = Math.floor(dif/1000 / 100)
      console.log(`Was away for: ${dif/1000} seconds or ${boost} Boost Seconds`)
      ctx.gameLoop.start()
      GameTextLog.Log('Resume Game',GameLogType.info)
      console.log('start')
  }
})
GameLoader.LoadPixiTextures((resources:({[index:string]:PIXI.LoaderResource})) =>{
  
    ctx.resources = resources
    ctx.loopEvents.registerEvent(new AutoSaveLoopEvent())
    let s = new PIXI.Sprite(resources['demo_bg'].texture)
    ctx.canvasApp.stage.addChild(s) 
    ctx.startGame()

     let enemy = new EnemyCharacter({attackSpeed:1.6, name:'Fast', hp:100, dmg:1},new PIXI.Point(30,10),0.3)
     let enemy2 = new EnemyCharacter({attackSpeed:1.1, name:'Normal', hp:100, dmg:1},new PIXI.Point(185,10),0.3)
     let enemy3 = new EnemyCharacter({attackSpeed:4.7, name:'Slow', hp:100, dmg:1},new PIXI.Point(370,10),0.3)
     let enemy4 = new EnemyCharacter({attackSpeed:0.8, name:'Fast', hp:100, dmg:1},new PIXI.Point(30,125),0.3)
     let enemy5 = new EnemyCharacter({attackSpeed:1.2, name:'Normal', hp:100, dmg:1},new PIXI.Point(185,125),0.3)
     let enemy6 = new EnemyCharacter({attackSpeed:3.7, name:'Slow', hp:100, dmg:1},new PIXI.Point(370,125),0.3)
})




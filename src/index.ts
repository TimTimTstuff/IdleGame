import * as PIXI from 'pixi.js'
import './style/main.css'
import './style/main.css'
import { GameContext } from './global/GameContext'
import { GameCharacter } from './gameobjects/GameCharacter'
import { GameError } from '@timtimtstuff/tstuffgametools'
import { AutoSaveLoopEvent } from './global/AutoSaveLoopEvent'
import { TApiClient } from './global/api/TApiClient'

const ctx = new GameContext(
    new PIXI.Application({
    width: 300,
    height: 400,
    backgroundColor: 0x000000
}), 
'tidle',
'game-area')


ctx.startGame()
ctx.loopEvents.registerEvent(new AutoSaveLoopEvent())


let btn = document.getElementById('click_inventory')
btn?.addEventListener('click', () => {
    if(GameContext.instance.char == null)throw GameError.error('Character does not exist',200);
    let char:GameCharacter = GameContext.instance.char
    if(!char.getInventory().hasItem('test')){
        char.getInventory().createItem({name:'test', maxamount:0, amount:0, data:null})
    }

    char.getInventory().addItem('test')
    console.log(`Add Item, now: ${char.getInventory().getItemAmount('test')}`)

})

TApiClient.baseUrl = 'http://localhost/IdleGame/backend'

TApiClient.sendRequest('test/test',{a:"Hallo",b:"World!"}).then(r => {
    console.log(r.data)
    console.log(r.state)
}).catch(r=>{
    console.error(r)
})

TApiClient.sendRequest('test/',{a:"Hallo",b:"World!"}).then(r => {
    console.log(r.data)
    console.log(r.state)
}).catch(r=>{
    console.error(r)
})

TApiClient.sendRequest('test/test',{ae:"Hallo",b:"World!"}).then(r => {
    console.log(r.data)
    console.log(r.state)
}).catch(r=>{
    console.error(r)
})


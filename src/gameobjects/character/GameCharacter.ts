import { Inventory, IGameLoopEvent, Renderer, HtmlEvents } from "@timtimtstuff/tstuffgametools";
import { GameContext } from "../../global/GameContext";
import { CharacterAttack } from "./CharacterAttack";
import * as PIXI from 'pixi.js'


export class GameCharacter extends Renderer implements IGameLoopEvent {
    EVID: string = "";
    private _inventory: Inventory
    private _charAttack: CharacterAttack
    private _container:PIXI.Container

    constructor(inv: Inventory) {
        super();
        this.initializeCharacterData(inv);
        this._container = new PIXI.Container()
        this._inventory = inv
        this._charAttack = new CharacterAttack(2,this._container)
        GameContext.instance.loopEvents.registerEvent(this)
        document.getElementById('right')?.insertAdjacentHTML('beforeend', this.getTemplate())
        this.postRender()
        this._charAttack.onAttack = () => {
            //console.log('Attack!')
        }
        this._container.position = new PIXI.Point(150,250)
        
        GameContext.instance.canvasApp.stage.addChild(this._container)
        
    }

    private initializeCharacterData(inv: Inventory) {
        if (!inv.hasItem('currentHp'))
            inv.createItem({ name: 'currentHp', amount: 100, maxamount: 0, data: null });
        if (!inv.hasItem('gold'))
            inv.createItem({ name: 'gold', amount: 0, maxamount: 0, data: null });
        if (!inv.hasItem('xp'))
            inv.createItem({ name: 'xp', amount: 0, maxamount: 0, data: null });
        if (!inv.hasItem('level'))
            inv.createItem({ name: 'level', amount: 1, maxamount: 0, data: null });
    }

    public getTemplate(): string {
        return (
            /*html*/
            `
           <div id='char-box'>
            <div data-event='collaps-char-box' class='char-box-header'>Character Information</div>
            
            <div class='char-box-content'>
                <table>
                <tr><td>Name</td><td>Nephalem</td></tr>
                <tr><td>Current Hp</td><td ${this.dataModel('curr_hp')}></td></tr>
                <tr><td>Level</td><td ${this.dataModel('level')}></td></tr>
                <tr><td>Xp</td><td ${this.dataModel('xp')}></td></tr>
                <tr><td>Gold</td><td ${this.dataModel('gold')}></td></tr>
                </table>
            </div>
           </div>
           `
        )
    }

    public postRender(): void {
        this.bindEvent('collaps-char-box', HtmlEvents.Click, (e) => {

            let elements = document.getElementsByClassName('char-box-content')
            if (elements.length == 0) return
            let el: HTMLElement = <HTMLElement>elements[0]
            if (el.style.display == 'none') {
                el.style.display = 'block'
            } else {
                el.style.display = 'none'
            }
        })
    }

    public isEnabled(): boolean {
        return true
    }

    public update() {

        this._charAttack.update()
    }

    public fixedUpdate() {
        this.setVal('curr_hp',this._inventory.getItemAmount('currentHp'))
        this.setVal('xp',this._inventory.getItemAmount('xp'))
        this.setVal('level',this._inventory.getItemAmount('level'))
        this.setVal('gold',this._inventory.getItemAmount('gold'))
    }

    public getInventory(): Inventory {
        return this._inventory
    }

}
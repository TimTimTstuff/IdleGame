import { GameLoop } from "@timtimtstuff/tstuffgametools"
import * as PIXI from 'pixi.js'
import { GameContext } from "../../global/GameContext"
import { GameColors } from "../../gamedata/canvas/GameColors"
import { GameTextStyle } from "../../gamedata/canvas/GameTextStyle"

export class CharacterAttack {

    public attackSpeed:number = 2*1000
    public nextAttack:number = 2*1000
    public castBarContainer:PIXI.Container
    public castBar:PIXI.Sprite
    public castBarBorder:PIXI.Sprite
    public castBarText: PIXI.Text
    public onAttack:(()=>void) | undefined

    /**
     *
     */
    constructor(attackSpeed:number, container:PIXI.Container) {
        
        this.attackSpeed = attackSpeed*1000
        this.nextAttack = attackSpeed*1000

        this.castBarContainer = new PIXI.Container()
        
        this.castBar = new PIXI.Sprite(GameContext.I.resources['fill'].texture)
        this.castBarBorder = new PIXI.Sprite(GameContext.I.resources['border'].texture)

        
        this.castBar.height = 30
        this.castBarBorder.height = 30
        this.castBarBorder.width = 200
        
        this.castBarText = new PIXI.Text("",GameTextStyle.CastBarText)
        this.castBarText.tint = 0x333333
        this.castBarText.position = new PIXI.Point(5,2)

        this.castBarContainer.addChild(this.castBar)
        this.castBarContainer.addChild(this.castBarBorder)
        this.castBarContainer.addChild(this.castBarText)

        container.addChild(this.castBarContainer)
        
        
        
    }

    public attackPercentage():number {
        let r = Math.round(100/this.attackSpeed*this.nextAttack)
        
        if(r > 100) return 100
        if(r<0) return 0
        return r
    }

    public update() {
       
       
        this.nextAttack-=GameLoop.deltaTime
        if(this.nextAttack <= 0) {
            this.nextAttack = this.attackSpeed
            if(this.onAttack != undefined) this.onAttack()
        }
        this.castBar.width = (100- this.attackPercentage())*2
    }

}

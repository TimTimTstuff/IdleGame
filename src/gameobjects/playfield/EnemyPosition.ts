import { EnemyPositionData } from "../enemy/Enemy"
import {Point } from 'pixi.js'

export class EnemyPosition{

    private positions:EnemyPositionData[]

    constructor() {
        this.positions = []
         
        this.positions.push({
            pos: new Point(185,125),
            scale: 0.3
        })

        this.positions.push({
            pos: new Point(30,125),
            scale: 0.3
        })

       

        this.positions.push({
            pos: new Point(370,125),
            scale: 0.3
        })

        this.positions.push({
            pos: new Point(185,10),
            scale: 0.3
        })

        this.positions.push({
            pos: new Point(30,10),
            scale: 0.3
        })

        this.positions.push({
           pos: new Point(370,10),
           scale: 0.3 
        })
    }

    public getSlotPosition(slot:number):EnemyPositionData{
        return this.positions[slot]
    }
    

}
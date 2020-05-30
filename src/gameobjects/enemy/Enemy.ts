import { EnemyData } from "./EnemyData";

export interface EnemyPositionData {
    pos:PIXI.Point,
    scale:number
}

export class Enemy {
    
    private _enemyData:EnemyData

    constructor(data:EnemyData, posData:EnemyPositionData) {
        this._enemyData = data
        
    }
}
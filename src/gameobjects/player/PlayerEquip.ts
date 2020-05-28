import { NumberAttribute } from "@timtimtstuff/tstuffgametools";

export class CharacterEquip {
    private _equipInSlot: {[index:number]:Equip|null}

    constructor(equip?:{[index:number]:Equip|null}) {
        if(equip !== undefined){
            this._equipInSlot = equip
        }else{
            this._equipInSlot = {}
            for(let item in EquipType){
                if(!isNaN(parseInt(item))){
                    this._equipInSlot[item] = null
                }
            }
        }

        console.log(this)
        
    }

    public addEquip(equip:Equip) {

    }


} 

export interface Equip {
    name:string
    key:string
    type: EquipType
    value:NumberAttribute[]
    effect:EquipEffect
    minLevel:number
}

export interface EquipEffect{
    name:string

}

export enum EquipType {
    Wapon = 0,
    Helmet = 1,
    Body = 2,
    Leg = 3,
    Feet = 4,
    Hands = 5,
    Shoulder = 6,
    Arm = 7,
    Ring = 8,
    Neck = 9,
    Bag = 10
}
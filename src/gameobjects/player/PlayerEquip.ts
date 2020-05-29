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

    public addEquip(equip:Equip):Equip | null {
        let oldEquip = this._equipInSlot[equip.type]
        this._equipInSlot[equip.type] = equip
        return oldEquip
    }

    public removeEquip(slot:EquipType): Equip | null {
        let oldEquip = this._equipInSlot[slot]
        this._equipInSlot[slot] = null
        return oldEquip
    }

    public getEquipStatsBag() : {[index:string]:NumberAttribute[]}{
        let values: {[index:string]:NumberAttribute[]} = {}
        Object.keys(this._equipInSlot).forEach(k =>{
            let slot = this._equipInSlot[parseInt(k)]
            if(slot == null)
                return
            
            Object.keys(slot.value).forEach(sa => {
                if(values[sa] == undefined)
                    values[sa] = []
                let attr = slot?.value[sa]
                if(attr == undefined)return   
                values[sa].push(attr)
            })
        })

        return values
    }

    public getEquipObject(): {[index:number]:Equip|null} {
        return this._equipInSlot
    }

} 

export interface Equip {
    name:string
    key:string
    type: EquipType
    value: {[index:string]:NumberAttribute}
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
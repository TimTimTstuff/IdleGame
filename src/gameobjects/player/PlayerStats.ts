import { NumberAttribute, NumberAttributeType } from "@timtimtstuff/tstuffgametools";

export class PlayerStats {
    public hp: NumberAttribute = {key:'base', value:100,type:NumberAttributeType.FIXED_VALUE}
    public mana: NumberAttribute = {key:'base', value:10,type:NumberAttributeType.FIXED_VALUE}
    public phyDmg: NumberAttribute = {key:'base', value:1,type:NumberAttributeType.FIXED_VALUE}
    public magDmg: NumberAttribute = {key:'base', value:1,type:NumberAttributeType.FIXED_VALUE}
    public hpReg: NumberAttribute = {key:'base', value:1,type:NumberAttributeType.FIXED_VALUE}
    public manaReg: NumberAttribute = {key:'base', value:1,type:NumberAttributeType.FIXED_VALUE}

}

export enum TalentType {
    Stat,
    Talent,
    Skill
}



export enum SkillType {
    PDmg,
    MDmg,
    PDot,
    MDot,
    Hot,
    DeBuff,
    Buff
}

export enum SkillTarget {
    Self,
    OneEnemy,
    MultEnemy,
    AllEnemy
}

export interface PlayerTalent {
    name:string
    key:string
    type:TalentType
    value:NumberAttribute
    actions:string[]
}

export interface Skill {
    name:string
    key:string
    type:SkillType
    target:SkillTarget
    buff:NumberAttribute
    buffTime:number
    castTime:number
    value:number
    tick:number
}
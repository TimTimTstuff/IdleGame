import { NumberAttribute } from "@timtimtstuff/tstuffgametools";

export interface PlayerStats{
    [key:string]:any
     hp: NumberAttribute 
     mana: NumberAttribute 
     phyDmg: NumberAttribute 
     magDmg: NumberAttribute 
     hpReg: NumberAttribute 
     manaReg: NumberAttribute
     attSpeed: NumberAttribute
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
import { Inventory, NamedNumberAttributes, NumberAttributeType, Item } from "@timtimtstuff/tstuffgametools";
import { AttackHandler } from "../character/CharacterAttack";
import { CharacterEquip, Equip } from "./PlayerEquip";
import { PlayerStats } from "./PlayerStats";
import { PlayerStatsRenderer } from "./HRenderer/PlayerStatsRenderer";
import { PlayerValueRenderer } from "./HRenderer/PlayerValueRenderer";
import { PlayerEquipRenderer } from "./HRenderer/PlayerEquipRenderer";
import { PlayerInventoryRenderer } from "./HRenderer/PlayerInventoryRenderer";
import { PlayerUiCRenderer } from "./CRenderer/PlayerUiCRenderer";

export interface PlayerSaveObject{
    equip: { [index: number]: Equip | null; } | undefined;
    valInv: { [index: string]: Item; } | undefined;
    itemInv: { [index: string]: Item; } | undefined;

}

export class Player {
   
   

    private _itemInventory:Inventory
    private _valueInventory:Inventory
    
    private _equip:CharacterEquip

    //Renderer
    private _statsR: PlayerStatsRenderer
    private _valR: PlayerValueRenderer
    private _equipR: PlayerEquipRenderer
    private _invR: PlayerInventoryRenderer

    //pixi container
    private _pRenderer: PlayerUiCRenderer

    private _charAttack:AttackHandler
    private _attributes:PlayerStats

    private _playerStatsCalculator: NamedNumberAttributes
    private _saveObject: PlayerSaveObject;

    constructor(save:PlayerSaveObject){
        this._saveObject = save
        this._itemInventory = new Inventory(save.itemInv)
        this._valueInventory = new Inventory(save.valInv)
        this._attributes = this.createNewPlayerStats()
        this._pRenderer = new PlayerUiCRenderer()
        this._charAttack = new AttackHandler(this._attributes.attSpeed.value,this._pRenderer)
        this._equip = new CharacterEquip(save.equip)
        this._playerStatsCalculator = new NamedNumberAttributes()
        this._statsR = new PlayerStatsRenderer()
        this._valR = new PlayerValueRenderer()
        this._equipR = new PlayerEquipRenderer()
        this._invR = new PlayerInventoryRenderer()

        this.publishPlayerStats()
    }

    createNewPlayerStats(): PlayerStats {
        return {
            hp:  {key:'base', value:100,type:NumberAttributeType.FIXED_VALUE},
            mana: {key:'base', value:10,type:NumberAttributeType.FIXED_VALUE},
            phyDmg:  {key:'base', value:1,type:NumberAttributeType.FIXED_VALUE},
            magDmg:  {key:'base', value:1,type:NumberAttributeType.FIXED_VALUE},
            hpReg: {key:'base', value:1,type:NumberAttributeType.FIXED_VALUE},
            manaReg: {key:'base', value:1,type:NumberAttributeType.FIXED_VALUE},
            attSpeed: {key:'base', value:3, type:NumberAttributeType.FIXED_VALUE}
        }
    }

    publishPlayerStats() {
        
        Object.keys(this._attributes).forEach(k => {
            this._playerStatsCalculator.addAttribute(k, this._attributes[k])
        })
        let a = this._equip.getEquipStatsBag()
        Object.keys(a).forEach(k => {
            a[k].forEach(kv => {
                this._playerStatsCalculator.addAttribute(k,kv)
            })
        })
    }

    getSaveObject() {
        this._saveObject.equip = this._equip.getEquipObject()
        this._saveObject.itemInv = this._itemInventory.getInventoryObject()
        this._saveObject.valInv = this._valueInventory.getInventoryObject()
    }

}

import * as PIXI from 'pixi.js'
export class DataBar extends PIXI.Container {

    private _border:PIXI.Sprite
    private _content:PIXI.Sprite
    private _fillTint:number
    private _orientationVertical:boolean

    private _maxFillSize:number = 200
    private _currentSize:number = 200
    
    constructor(border:PIXI.Sprite, fill:PIXI.Sprite, tint:number, horizontal:boolean = true) {
      super()  
      this._border = border
      this._content = fill
      let scale =  Math.round(100/this._border.width*this._maxFillSize)/100
      
      this._border.width = this._maxFillSize
      this._border.height = Math.round(this._border.height*scale)
      console.log(this._border.height)
      this._content.width = this._maxFillSize
      this._content.height *= scale

      
      this._fillTint = tint
      this._orientationVertical = horizontal
      this.addChild(this._border)
      this.addChild(this._content)
      
      
      

      if(!this._orientationVertical) {
          this.angle = -90
        this.position.y += this._maxFillSize+20
        this.position.x -= this._border.height
        }

      this.updateSize()
    }

    public setPercentage(per:number) {
        this._currentSize = this._maxFillSize/100*per
        this.updateSize()
    }

    private updateSize() {
        this._content.width = this._currentSize
    }

}
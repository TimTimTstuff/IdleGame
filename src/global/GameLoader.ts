import * as PIXI from 'pixi.js'
export class GameLoader{

    public static texturePath:string = '../assets/textures/'
    public static getTexturePath(name:string):string {
        return `${this.texturePath}${name}`
    }
    public static LoadPixiTextures(loadFinsihed:(r:({[index:string]:PIXI.LoaderResource}))=>void){
        PIXI.Loader.shared
        .add('demo_bg',GameLoader.getTexturePath('demo_background.png'))
        .add('white',GameLoader.getTexturePath('white_pixel.png'))
        .load((l,r)=>{
            
            loadFinsihed(<any>r)
        })
    }

}
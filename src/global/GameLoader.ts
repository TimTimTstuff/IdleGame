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
        .add('enemy',GameLoader.getTexturePath('demo_enemy.png'))
        .add('enemy2',GameLoader.getTexturePath('demo_enemy_face.png'))
        .add('border',GameLoader.getTexturePath('border.png'))
        .add('fill',GameLoader.getTexturePath('fill.png'))
        .load((l,r)=>{
            
            loadFinsihed(<any>r)
        })
    }

}
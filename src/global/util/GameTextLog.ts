export enum GameLogType {
    info=0,
    outatt=1,
    inatt=2
}

export class GameTextLog {

    public static logElement:HTMLElement
    public static wholeLog:string[]
    public static Log(msg:string, type:GameLogType):void {
        GameTextLog.logElement.insertAdjacentHTML('afterbegin',(
            /*html*/
            `<div class='log_type_${GameLogType[type]}'>${msg}</span>`
        ))
        //console.log(GameTextLog.logElement.children.length)
        if(GameTextLog.logElement.children.length > 100){
            GameTextLog.logElement.removeChild(<Node>GameTextLog.logElement.lastChild)
        }
    }
}
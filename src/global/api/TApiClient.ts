export class TApiClient {

    public static baseUrl:string = 'localhost'
    public static async sendRequest<T>(path:string, data:{[index:string]:any} | null): Promise<TApiResult<T>> {
       var response = await fetch(`${TApiClient.baseUrl}/${path}`, {
           method: "POST",
           body: JSON.stringify(data)
       } )
       if(response.status == 200)
        return response.json()
       
        throw response;
       
    }

}

export enum TApiResultState{
    NotFound = 0,
    Ok = 1,
    Unknown = 2,
    Error = 3
}

export interface TApiResult<T> {
    state:TApiResultState,
    data:T
}
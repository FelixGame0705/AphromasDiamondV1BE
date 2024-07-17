import { ToDatabaseDateTime } from "src/constants/date-util";

export class Collection{
    CollectionID: number
    CollectionName: string
    Description: string
    @ToDatabaseDateTime()
    DebutTime: Date

    constructor({CollectionID,CollectionName, Description, DebutTime}){
        if(CollectionID !=undefined) this.CollectionID = CollectionID;
        if(CollectionName != undefined) this.CollectionName =CollectionName;
        if(Description != undefined) this.Description = Description;
        if(DebutTime != undefined) this.DebutTime = DebutTime;
    }
}
import { ToDatabaseDateTime } from "src/constants/date-util";
import { Diamond } from "./diamond.model";
import { Product } from "./product.model";

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

export class CollectionAll{
    CollectionID: number
    CollectionName: string
    Description: string
    @ToDatabaseDateTime()
    DebutTime: Date
    Diamonds: Diamond[]
    Products: Product[]
    constructor({CollectionID,CollectionName, Description, DebutTime, Diamonds, Products}){
        if(CollectionID !=undefined) this.CollectionID = CollectionID;
        if(CollectionName != undefined) this.CollectionName =CollectionName;
        if(Description != undefined) this.Description = Description;
        if(DebutTime != undefined) this.DebutTime = DebutTime;
        if(Diamonds != undefined) this.Diamonds = Diamonds;
        if(Products != undefined) this.Products = Products;

    }
}
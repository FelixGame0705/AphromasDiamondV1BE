export interface AbstractPromise<D>{
    findAll(): Promise<D[]>;
    findById(id: number): Promise<D>;
    create(data: Partial<D>):Promise<D>;
    update(id: number, data: Partial<D>): Promise<D>;
    delete(id: number): Promise<boolean>;
}
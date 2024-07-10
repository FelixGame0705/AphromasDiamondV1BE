export class Pagination {
    page: number;
    //take: number;
    totalRecord: number;
    totalPage: number;
    //nextPage?: number;
    //prevPage?: number;
    constructor({page,totalRecord,totalPage}){
        this.page = page,
        this.totalRecord = totalRecord,
        this.totalPage = totalPage
    }
}
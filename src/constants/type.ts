export type ResponseType<D> = {
    data?: D | D[];
    statusCode?: number;
    message?: string;
}

export type MetaParams = {
    search: string;
    page: string;
}
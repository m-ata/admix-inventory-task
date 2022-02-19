export interface IFetchppRequestBody {
    pageIndex: number,
    pageSize: number,
    operator?: string,
    filters?: Filter[],
    sorts?: Sort[]
}

interface Filter {
    name: string,
    value: String[] | string,
    operator: string
}

interface Sort {
    field: string,
    desc: boolean
}
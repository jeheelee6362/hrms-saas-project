export interface IDBURL {
    dbname: string
}

export interface IDocURL {
    dbname: string,
    docid: string, 
}

export interface IDocsURL {
    dbname: string,
    docs: string[]
}

export interface IDdocPagination {
    dbname: string,
    startkey: string,
    endkey?: string,
    limit: number
}
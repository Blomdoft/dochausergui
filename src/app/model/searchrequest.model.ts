export enum SearchAggregation {
  AND ="AND",
  OR = "OR"
}
export enum SearchMode {
  EXACT ="EXACT",
  FUZZY = "FUZZY"
}

export interface SearchRequest {
  aggregation: SearchAggregation
  mode: SearchMode
  skip : number
  from : string
  to : string
  queryTerms : string[]
}


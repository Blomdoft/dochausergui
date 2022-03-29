export interface PDFDocument {
  id: string
  name: string
  directory: string
  text: string
  timestamp: string
  origin: string
  thumbnails: Thumbnail[]
  tags: Tag[]
}

export interface Thumbnail {
  imgname: string
  imgdirectory: string
}

export interface Tag {
  tagname: string
}

export interface SearchDocResult {
  documents: PDFDocument[]
  hitCount: number
}

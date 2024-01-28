export interface PDFDocument {
  id: string
  name: string
  directory: string
  text: string
  timestamp: string
  origin: string
  thumbnails: Thumbnail[]
  tags: Tag[]
  analysis: Analysis
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

export interface Analysis {
  senderAddress: string;
  receiverAddress: string;
  intent: string;
  filename: string;
  category_level1: string;
  category_level2: string;
}

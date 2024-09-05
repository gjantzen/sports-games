export interface MetaTag {
  property: string;
  value: string | undefined;
}

export interface VideoMetadata {
  metaTags: MetaTag[];
}

export interface Video {
  guid: string;
  title: string;
  thumbnailFileName: string;
  metaTags: MetaTag[];
}

export interface ProcessedVideo {
  id: string;
  gameNumber: string;
  date: string;
  opponent: string;
  result: string;
  score: string;
  location: string;
  thumbnailUrl: string;
}

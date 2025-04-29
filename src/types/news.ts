export interface NewsItem {
  id: string;
  title: string;
  source: string;
  url: string;
  publishedAt: string;
  summary: string;
  imageUrl: string;
  categories: string[];
  relatedCandidates?: string[];
  content?: string;
}

export interface NewsApiResponse {
  items: NewsItem[];
  total: number;
  page: number;
  pageSize: number;
}

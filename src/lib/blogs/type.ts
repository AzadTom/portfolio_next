export enum BlogStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
}

export interface CreateBlogDto {
  title: string;
  slug: string;
  excerpt: string;
  content: Record<string, any>;
  status?: BlogStatus;
  publishedAt?: Date;
}
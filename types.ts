
export type Category = 'All' | 'Travel' | 'Nature' | 'Cinematic' | 'Street';

export interface Photo {
  id: string;
  url: string;
  title: string;
  category: Category;
  description: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

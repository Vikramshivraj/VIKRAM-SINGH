
import { Photo, Category } from './types';

export const CATEGORIES: Category[] = ['All', 'Travel', 'Nature', 'Cinematic', 'Street'];

export const PHOTOS: Photo[] = [
  {
    id: '1',
    url: 'https://picsum.photos/seed/travel1/600/800',
    title: 'Moroccan Sunset',
    category: 'Travel',
    description: 'The golden hour over the Atlas Mountains.'
  },
  {
    id: '2',
    url: 'https://picsum.photos/seed/nature1/600/400',
    title: 'Morning Mist',
    category: 'Nature',
    description: 'Ethereal fog rolling through the pine valley.'
  },
  {
    id: '3',
    url: 'https://picsum.photos/seed/cine1/600/900',
    title: 'Neon Nights',
    category: 'Cinematic',
    description: 'A study of light and shadow in Tokyo.'
  },
  {
    id: '4',
    url: 'https://picsum.photos/seed/street1/600/600',
    title: 'The Busy Baker',
    category: 'Street',
    description: 'Capturing the rhythm of daily life in Paris.'
  },
  {
    id: '5',
    url: 'https://picsum.photos/seed/travel2/600/700',
    title: 'Island Solitude',
    category: 'Travel',
    description: 'Remote cliffs in the Faroe Islands.'
  },
  {
    id: '6',
    url: 'https://picsum.photos/seed/nature2/600/500',
    title: 'Wild Blooms',
    category: 'Nature',
    description: 'Spring awakening in the Swiss Alps.'
  },
  {
    id: '7',
    url: 'https://picsum.photos/seed/cine2/600/850',
    title: 'Interstellar Vibes',
    category: 'Cinematic',
    description: 'Lone figure in a vast landscape.'
  },
  {
    id: '8',
    url: 'https://picsum.photos/seed/street2/600/750',
    title: 'Urban Geometry',
    category: 'Street',
    description: 'Architectural patterns in New York City.'
  },
  {
    id: '9',
    url: 'https://picsum.photos/seed/travel3/600/450',
    title: 'Desert Echoes',
    category: 'Travel',
    description: 'The vastness of the Sahara.'
  }
];

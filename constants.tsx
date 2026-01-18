
import { Photo, Category } from './types';

export const CATEGORIES: Category[] = ['All', 'Travel', 'Nature', 'Cinematic', 'Street'];

export interface Video {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
  description: string;
}

export const VIDEOS: Video[] = [
  {
    id: 'v1',
    url: 'https://cdn.pixabay.com/video/2021/08/05/84041-584732104_large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop',
    title: 'The Silent Peaks',
    description: 'A drone exploration of the untouched Himalayan ranges during golden hour.'
  },
  {
    id: 'v2',
    url: 'https://cdn.pixabay.com/video/2022/10/16/135118-760851174_large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1471922694854-ff1b63b20054?q=80&w=1000&auto=format&fit=crop',
    title: 'Coastal Serenity',
    description: 'Atmospheric slow-motion captures of the Goan coastline.'
  },
  {
    id: 'v3',
    url: 'https://cdn.pixabay.com/video/2024/05/26/213702_large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1000&auto=format&fit=crop',
    title: 'Urban Pulse',
    description: 'Behind-the-scenes: Capturing the chaotic beauty of Mumbai streets.'
  }
];

export const PHOTOS: Photo[] = [
  {
    id: '1',
    url: 'http://i.pinimg.com/736x/c1/3d/b8/c13db8b0aac6a1d426327e8c49890c9d.jpg',
    title: 'Faith on the Dashboard',
    category: 'Travel',
    description: 'Faith, freedom, and fresh flowers riding along every journey 🇮🇳🌺🙏.'
  },
  {
    id: '2',
    url: 'https://i.pinimg.com/736x/6f/ee/dd/6feedd3089fdfa07ac99f64a9c03f610.jpg',
    title: 'Morning Mist',
    category: 'Nature',
    description: 'Ethereal fog rolling through the pine valley.'
  },
  {
    id: '3',
    url: 'https://i.pinimg.com/736x/14/1d/67/141d672c8a9505d05e780c5073e733d8.jpg',
    title: 'Hill Station',
    category: 'Cinematic',
    description: 'Lost where the mountains whisper peace and the clouds slow life down 🌄'
  },
  {
    id: '4',
    url: 'https://i.pinimg.com/736x/dd/8a/a4/dd8aa4d603f7829d0f03c2b6925dcc8a.jpg',
    title: 'Kayaking ',
    category: 'Travel',
    description: 'Kayaking in Goa.'
  },
  {
    id: '5',
    url: 'https://i.pinimg.com/736x/e2/d0/5d/e2d05d2ea0e1dc0256450edb1521c4b6.jpg',
    title: 'Horse Ride',
    category: 'Travel',
    description: 'People finding joy and calm as horses carry them through the quiet beauty of the hill station 🐎⛰️.'
  },
  {
    id: '6',
    url: 'https://i.pinimg.com/736x/c0/0c/4b/c00c4b8456fb668fe6bad758f1430c4e.jpg',
    title: 'Wild Blooms',
    category: 'Nature',
    description: 'Lost in the calm where hills meet the mist 🌫️⛰️.'
  },
  {
    id: '7',
    url: 'https://i.pinimg.com/736x/59/26/ee/5926ee8d7c7fcb329efbf1d4cc0ff14c.jpg',
    title: 'Beach Cricket',
    category: 'Cinematic',
    description: 'Beach.Bat.Bliss'
  },
  {
    id: '8',
    url: 'https://i.pinimg.com/736x/f7/e3/5b/f7e35b01d8255c72a3975ad1cd867b2e.jpg',
    title: 'Goa street',
    category: 'Street',
    description: 'Aesthetic patterns in Goa City.'
  },
  {
    id: '9',
    url: 'https://i.pinimg.com/736x/7b/73/ac/7b73acb10e38746e245ee85e52ba96d0.jpg',
    title: 'Goa Architecture',
    category: 'Travel',
    description: 'A majestic old church'
  },
  {
    id: '10',
    url: 'https://i.pinimg.com/474x/53/38/b5/5338b5a52f698ae19a26fccb0112ae0a.jpg',
    title: 'Two ways',
    category: 'Cinematic',
    description: 'Life always stands at two roads, and the hardest part is choosing the one you can’t see the end of'
  }
];

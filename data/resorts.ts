
import { Resort } from '../types';

export const JAPAN_RESORTS: Resort[] = [
  {
    id: 'niseko',
    name: 'Niseko United',
    prefecture: 'Hokkaido',
    latitude: 42.863,
    longitude: 140.698,
    shortDescription: 'Comprised of four interlinked ski resorts, Niseko United is renowned worldwide for its consistency and quality of powder snow.',
    ikonAccessInfo: '7 Days on Ikon Pass, 5 Days on Ikon Base Pass',
    websiteUrl: 'https://www.niseko.ne.jp/en/',
    // Official or high-quality map reference
    trailMapImageUrl: 'https://www.niseko.ne.jp/en/wp-content/uploads/sites/3/2018/06/Niseko_United_Trail_Map_2018-19.jpg',
    stats: {
      elevation: '1,308m',
      runs: 70,
      snowfall: '15m+'
    }
  },
  {
    id: 'lotte-arai',
    name: 'Lotte Arai Resort',
    prefecture: 'Niigata',
    latitude: 37.026,
    longitude: 138.256,
    shortDescription: 'Known for massive amounts of snow and extensive off-piste "free riding" zones, offering a luxurious hotel experience at the base.',
    ikonAccessInfo: '7 Days on Ikon Pass, 5 Days on Ikon Base Pass',
    websiteUrl: 'https://www.lottehotel.com/arai-resort/en.html',
    trailMapImageUrl: 'https://www.lottehotel.com/content/dam/lotte-hotel/arai/ski/map/2022/map_2022_en.jpg',
    stats: {
      elevation: '1,280m',
      runs: 14,
      snowfall: '18m+'
    }
  },
  {
    id: 'shiga-kogen',
    name: 'Shiga Kogen Mountain Resort',
    prefecture: 'Nagano',
    latitude: 36.736,
    longitude: 138.514,
    shortDescription: 'One of Japan’s largest ski areas and a UNESCO Biosphere Reserve, hosting events during the 1998 Winter Olympics.',
    ikonAccessInfo: '7 Days on Ikon Pass, 5 Days on Ikon Base Pass',
    websiteUrl: 'https://www.shigakogen-ski.com/en',
    // Switched to a reliable scenic photo from Wikimedia Commons as the official map URL is unstable
    trailMapImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Shiga_Kogen_Yakebitaiyama_Ski_Area.jpg/1280px-Shiga_Kogen_Yakebitaiyama_Ski_Area.jpg',
    stats: {
      elevation: '2,307m',
      runs: 100,
      snowfall: '11m+'
    }
  },
  {
    id: 'mt-t',
    name: 'Mt. T (Tanigawadake)',
    prefecture: 'Gunma',
    latitude: 36.830,
    longitude: 138.966,
    shortDescription: 'Famous for its extreme terrain and deep powder, offering a backcountry-style experience with steep alpine runs.',
    ikonAccessInfo: '7 Days on Ikon Pass, 5 Days on Ikon Base Pass',
    websiteUrl: 'https://www.tanigawadake-rw.com/en/',
    // High quality mountain view fallback used as specific map URLs are often rotated
    trailMapImageUrl: 'https://www.tanigawadake-rw.com/gelande/img/map_en.jpg',
    stats: {
      elevation: '1,319m',
      runs: 10,
      snowfall: '12m+'
    }
  },
  {
    id: 'myoko-suginohara',
    name: 'Myoko Suginohara',
    prefecture: 'Niigata',
    latitude: 36.877,
    longitude: 138.157,
    shortDescription: 'Features one of the longest runs in Japan (8.5km) and stunning views of Lake Nojiri, known for long groomers and deep snow.',
    ikonAccessInfo: '7 Days on Ikon Pass, 5 Days on Ikon Base Pass',
    websiteUrl: 'https://www.princehotels.com/en/ski/myoko_kogen/',
    trailMapImageUrl: 'https://www.princehotels.com/en/ski/myoko_kogen/img/map.jpg',
    stats: {
      elevation: '1,855m',
      runs: 17,
      snowfall: '13m+'
    }
  },
  {
    id: 'furano',
    name: 'Furano Ski Resort',
    prefecture: 'Hokkaido',
    latitude: 43.340,
    longitude: 142.360,
    shortDescription: 'Located in central Hokkaido, Furano offers some of the lightest powder in the world and stable weather with bluebird days.',
    ikonAccessInfo: '7 Days on Ikon Pass, 5 Days on Ikon Base Pass',
    websiteUrl: 'https://www.princehotels.com/en/ski/furano/',
    trailMapImageUrl: 'https://www.princehotels.com/en/ski/furano/img/map.jpg',
    stats: {
      elevation: '1,074m',
      runs: 24,
      snowfall: '9m+'
    }
  },
  {
    id: 'appi',
    name: 'APPI Resort',
    prefecture: 'Iwate',
    latitude: 40.001,
    longitude: 140.972,
    shortDescription: 'Known as the "Aspen of Japan" for its meticulous grooming and long runs, APPI is the largest resort in the Tohoku region.',
    ikonAccessInfo: '7 Days on Ikon Pass, 5 Days on Ikon Base Pass',
    websiteUrl: 'https://www.appi-japan.com/',
    trailMapImageUrl: 'https://www.appi-japan.com/wp-content/uploads/2023/10/23-24_appi_map_en.jpg',
    stats: {
      elevation: '1,304m',
      runs: 21,
      snowfall: '10m+'
    }
  },
  {
    id: 'nekoma',
    name: 'NEKOMA Mountain',
    prefecture: 'Fukushima',
    latitude: 37.585,
    longitude: 140.038,
    shortDescription: 'A merged resort (formerly Alts Bandai and Nekoma) offering vast terrain on both the north and south sides of Mt. Bandai.',
    ikonAccessInfo: '7 Days on Ikon Pass, 5 Days on Ikon Base Pass',
    websiteUrl: 'https://www.nekoma.co.jp/en/',
    trailMapImageUrl: 'https://www.nekoma.co.jp/wp-content/themes/nekoma/assets/img/course/map_en.jpg',
    stats: {
      elevation: '1,338m',
      runs: 33,
      snowfall: '8m+'
    }
  },
  {
    id: 'zao-onsen',
    name: 'Zao Onsen Ski Resort',
    prefecture: 'Yamagata',
    latitude: 38.170,
    longitude: 140.400,
    shortDescription: 'Famous for its "Snow Monsters" (ice-covered trees) and historic hot springs village, Zao is one of the most traditional ski experiences.',
    ikonAccessInfo: '7 Days on Ikon Pass, 5 Days on Ikon Base Pass',
    websiteUrl: 'https://www.zao-ski.or.jp/english/',
    trailMapImageUrl: 'https://www.zao-ski.or.jp/english/wp-content/uploads/2019/12/map_en.jpg',
    stats: {
      elevation: '1,661m',
      runs: 26,
      snowfall: '12m+'
    }
  }
];

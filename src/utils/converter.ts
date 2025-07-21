type GamePayload = {
  age_ratings?: any | null;
  aggregated_rating?: any | null;
  aggregated_rating_count?: any | null;
  alternative_names?: any | null;
  artworks?: any | null;
  bundles?: any | null;
  category?: any | null;
  checksum?: any | null;
  collection?: any | null;
  collections?: any | null;
  cover?: any | null;
  created_at?: any | null;
  dlcs?: any | null;
  expanded_games?: any | null;
  expansions?: any | null;
  external_games?: any | null;
  first_release_date?: any | null;
  follows?: any | null;
  forks?: any | null;
  franchise?: any | null;
  franchises?: any | null;
  game_engines?: any | null;
  game_localizations?: any | null;
  game_modes?: any | null;
  game_status?: any | null;
  game_type?: any | null;
  genres?: any | null;
  hypes?: any | null;
  involved_companies?: any | null;
  keywords?: any | null;
  language_supports?: any | null;
  multiplayer_modes?: any | null;
  name?: any | null;
  parent_game?: any | null;
  platforms?: any | null;
  player_perspectives?: any | null;
  ports?: any | null;
  rating?: any | null;
  rating_count?: any | null;
  release_dates?: any | null;
  remakes?: any | null;
  remasters?: any | null;
  screenshots?: any | null;
  similar_games?: any | null;
  slug?: any | null;
  standalone_expansions?: any | null;
  status?: any | null;
  storyline?: any | null;
  summary?: any | null;
  tags?: any | null;
  themes?: any | null;
  total_rating?: any | null;
  total_rating_count?: any | null;
  updated_at?: any | null;
  url?: any | null;
  version_parent?: any | null;
  version_title?: any | null;
  videos?: any | null;
  websites?: any | null;
};

const generateGameDetailQuery = (id: string) => {
  return `f aggregated_rating,name,artworks.image_id,checksum,cover.image_id,first_release_date,game_status,game_type,genres.name,videos.video_id,videos.name,websites.url,websites.type.type, screenshots.image_id, summary; w id = ${id};`;
};
function arrayToObject(arr: string[]): { [key: string]: string } {
  const result: { [key: string]: string } = {};

  if (arr.length % 2 !== 0) {
    console.warn(
      "Input array has an odd number of elements. The last element will be ignored."
    );
  }

  for (let i = 0; i < arr.length; i += 2) {
    const key = arr[i];
    const value = arr[i + 1];

    if (key !== undefined && value !== undefined) {
      result[key] = value;
    }
  }

  return result;
}

type IVideo = {
  name: string;
  video_id: string;
};

function extractImageId(items: any[]): string[] {
  return items.map((item) => item.image_id);
}
function extractNames(items: any[]): string[] {
  return items.map((item) => item.name);
}
function extractVideo(items: any[]): IVideo[] {
  return items.map((item) => {
    return { name: item.name, video_id: item.video_id };
  });
}

interface TransformedItem {
  url: string;
  name: string;
}

function extractWebsites(items: any[]): TransformedItem[] {
  return items.map(item => ({
    url: item.url,
    name: item.type.type,
  }));
}

export {
  generateGameDetailQuery,
  arrayToObject,
  extractNames,
  extractImageId,
  extractVideo,
  extractWebsites
};

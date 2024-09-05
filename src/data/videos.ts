import { parse, format, isValid } from 'date-fns';
import type { Video, ProcessedVideo } from '@/types/video';
const LIBRARY_ID = import.meta.env.PUBLIC_BUNNY_STREAM_LIBRARY_ID;

let cachedVideos: ProcessedVideo[] | null = null;

function getMetaTagValue(video: Video, property: string): string {
  return video.metaTags.find(tag => tag.property === property)?.value || 'N/A';
}

function parseDate(dateString: string | undefined): string {
  if (!dateString || dateString === 'N/A') return 'N/A';

  const parsedDate = parse(dateString, 'yyyy-MM-d', new Date());
  return isValid(parsedDate) ? format(parsedDate, 'MMM d, yyyy') : 'N/A';

}

function parseGameNumber(title: string): string {
  const parts = title.split('_');
  const lastPart = parts.pop();
  if (lastPart === undefined) {
      return '';
  }
  return lastPart.replace('.m4v', '').replace(/^0+/, '') || '';
}

async function fetchAndProcessVideos(): Promise<ProcessedVideo[]> {
  const apiKey = import.meta.env.BUNNY_CDN_API_KEY;

  const response = await fetch(`https://video.bunnycdn.com/library/${LIBRARY_ID}/videos`, {
		headers: {
			"Accept": "application/json",
			"AccessKey": apiKey
		}
	});

	const videos: { items: Video[] } = await(response.json());


  return videos.items.map((video): ProcessedVideo => {
		const dateValue = getMetaTagValue(video, 'date');

		return {
			id: video.guid,
			gameNumber: parseGameNumber(video.title),
			opponent: getMetaTagValue(video, 'opponent'),
			date: parseDate(dateValue),
			result: getMetaTagValue(video, 'result'),
			score: getMetaTagValue(video, 'score'),
			location: getMetaTagValue(video, 'location'),
			thumbnailUrl: `https://vz-a6791770-8f4.b-cdn.net/${video.guid}/${video.thumbnailFileName}`
		}
	});
}

export async function getVideos(): Promise<ProcessedVideo[]> {
  if (cachedVideos === null) {
    cachedVideos = await fetchAndProcessVideos();
  }
  return cachedVideos;
}

export async function getTotalWinsAndLosses(): Promise<{ wins: number; losses: number }> {
  const videos = await getVideos();

  const totals = videos.reduce(
    (acc, video) => {
      if (video.result === 'Win') {
        acc.wins += 1;
      } else if (video.result === 'Loss') {
        acc.losses += 1;
      }
      return acc;
    },
    { wins: 0, losses: 0 }
  );

  return totals;
}

import fetchClient from '../providers/fetchClient';
import { AxiosResponse } from 'axios';

interface ArtistsTitleParams {
  (artist: string, title: string): Promise<AxiosResponse<any>>;
}

export const getLyricsByArtistsAndTitle: ArtistsTitleParams = (artist, title) =>
  fetchClient.get(`${artist}/${title}`);

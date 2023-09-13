import fetchClient from "../providers/fetchClient";
import { AxiosResponse } from "axios";

import { encodeQueryData } from "../utils";

export interface ArtistParams {
  (artist: string, page?: number, page_size?: number): Promise<
    AxiosResponse<any>
  >;
}

export const getArtists: ArtistParams = (artist, page_size) =>
  fetchClient.get(
    "artist.search?" +
      encodeQueryData({ q_artist: artist, page_size: page_size })
  );

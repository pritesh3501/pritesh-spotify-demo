export interface FormProps {
  name?: string;
  email?: string;
  password?: string;
  cpassword?: string;
}
export interface PlaylistFormProps {
  name?: string | undefined;
  description?: string;
  details?: MusicProps[];
}

export interface ArtistProps {
  name: string;
}
export interface ImageProps {
  url: string;
}
export interface externalURLProps {
  spotify: string;
}
export interface MusicProps {
  id?: string;
  name?: string;
  url?: string;
  image?: string;
  artists?: ArtistProps[];
  external_urls?: externalURLProps;
  images?: ImageProps;
}

export interface PlaylistProps {
  userEmail?: string;
  data?: PlaylistFormProps;
}

export interface AlbumProps {
  next?: string | undefined;
  total: number;
  items: MusicProps[];
}
export interface ResponseProps {
  status: number;
  message: string;
  data?: string;
  error?: object | undefined;
  albums?: AlbumProps;
}
export interface ReduxGlobalProps {
  authData?: string;
  playList?: number;
}
export interface ReduxProps {
  global?: ReduxGlobalProps;
}

import {
  FormProps,
  PlaylistFormProps,
  PlaylistProps,
  ResponseProps,
} from "./constant";

export const signupUser = (data: FormProps): ResponseProps => {
  const existingList: FormProps[] = getUsers();
  const isAlreadyExist: boolean = existingList?.some(
    (o: FormProps) => o.email === data.email
  );
  if (isAlreadyExist) {
    return {
      status: 204,
      message: "User already exist.",
    };
  } else {
    existingList.push(data);
    localStorage.userList = JSON.stringify(existingList);
    const existingPlaylist = getAllUserPlaylist();
    existingPlaylist.push({ userEmail: data.email, data: [] });
    localStorage.playlist = JSON.stringify(existingPlaylist);
    return {
      status: 201,
      message: "User signup successfully.",
    };
  }
};
export const loginUser = (
  data: Pick<FormProps, "email" | "password">
): ResponseProps => {
  const existingList: FormProps[] = getUsers();
  const findUser = existingList?.find(
    (o: FormProps) => o.email === data?.email
  );
  if (!findUser) {
    return {
      status: 204,
      message: "User not found.",
    };
  } else if (findUser.password !== data?.password) {
    return {
      status: 204,
      message: "Password was incorrect.",
    };
  } else {
    return {
      status: 200,
      message: "Login successfully.",
      data: JSON.stringify(findUser),
    };
  }
};
export const getUsers = (): FormProps[] => {
  const oldData = localStorage.userList
    ? JSON.parse(localStorage.userList)
    : [];
  return oldData;
};
export const getAllUserPlaylist = () => {
  return localStorage.playlist ? JSON.parse(localStorage.playlist) : [];
};
export const getUserPlaylist = (userEmail: string) => {
  const playlist = getAllUserPlaylist();
  return (
    playlist?.find((o: PlaylistProps) => o.userEmail === userEmail)?.data || []
  );
};
export const createPlaylist = (data: PlaylistFormProps): ResponseProps => {
  const userEmail: string = localStorage.authData
    ? JSON.parse(localStorage.authData)?.email
    : "";
  const existingPlaylist = getUserPlaylist(userEmail);
  const isExist = existingPlaylist?.some(
    (o: PlaylistFormProps) => o.name?.toLowerCase() === data.name?.toLowerCase()
  );
  if (isExist) {
    return {
      status: 204,
      message: "Playlist already exist.",
    };
  } else {
    existingPlaylist.push({ ...data, details: [] });
    const allPlaylist = getAllUserPlaylist();
    const fIndex = allPlaylist?.findIndex(
      (o: PlaylistProps) => o.userEmail === userEmail
    );
    allPlaylist[fIndex].data = existingPlaylist;
    localStorage.playlist = JSON.stringify(allPlaylist);
    return {
      status: 201,
      message: "Playlist create successfully.",
    };
  }
};
export const editPlaylist = (
  name: string,
  data: PlaylistFormProps
): ResponseProps => {
  const oldList = getAllUserPlaylist();
  const userEmail: string = localStorage.authData
    ? JSON.parse(localStorage.authData)?.email
    : "";
  const userPlaylist = getUserPlaylist(userEmail);
  const isExist = userPlaylist?.some(
    (o: PlaylistFormProps) => o.name?.toLowerCase() === data.name?.toLowerCase()
  );
  if (isExist) {
    return {
      status: 204,
      message: "Playlist already exist.",
    };
  } else {
    let findCurrent = userPlaylist?.find(
      (o: PlaylistFormProps) => o?.name === name
    );
    findCurrent = { ...findCurrent, ...data };
    const userIndex = userPlaylist?.findIndex(
      (o: PlaylistFormProps) => o.name === name
    );
    userPlaylist[userIndex] = findCurrent;
    const fIndex = oldList?.findIndex(
      (o: PlaylistProps) => o.userEmail === userEmail
    );
    oldList[fIndex].data = userPlaylist;
    localStorage.playlist = JSON.stringify(oldList);
    return {
      status: 200,
      message: "Playlist update successfully.",
    };
  }
};
export const deletePlayList = (data: PlaylistFormProps[]): ResponseProps => {
  const userEmail: string = localStorage.authData
    ? JSON.parse(localStorage.authData)?.email
    : "";
  const allPlaylist = getAllUserPlaylist();
  const fIndex = allPlaylist?.findIndex(
    (o: PlaylistProps) => o.userEmail === userEmail
  );
  allPlaylist[fIndex].data = data;
  localStorage.playlist = JSON.stringify(allPlaylist);
  return {
    status: 200,
    message: "Playlist delete successfully.",
  };
};
export const handleSearchMusic = async (
  searchText: string
): Promise<ResponseProps> => {
  const apiUrl = `${
    import.meta.env.VITE_SPOTIFY_API
  }/search?q=${searchText}&perPage=10`;

  try {
    if (!apiUrl) {
      return {
        status: 204,
        message: "Enviroment API URL is missing.",
      };
    }
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong!";
    return {
      status: 500,
      message: errorMessage,
    };
  }
};
export const addToPlaylist = (name, data) => {
  const userEmail: string = localStorage.authData
    ? JSON.parse(localStorage.authData)?.email
    : "";
  const userPlaylist = getUserPlaylist(userEmail);
  const songList = userPlaylist?.find((o) => o.name === name)?.details;
  const isExist = songList?.some((o) => o.id === data?.id);
  if (isExist) {
    return {
      status: 204,
      message: "Already exist in playlist.",
    };
  } else {
    songList.push(data);
    const playlistIndex = userPlaylist?.findIndex((o) => o.name === name);
    userPlaylist[playlistIndex].details = songList;
    const allPlaylist = getAllUserPlaylist();
    const fIndex = allPlaylist?.findIndex(
      (o: PlaylistProps) => o.userEmail === userEmail
    );
    allPlaylist[fIndex].data = userPlaylist;
    localStorage.playlist = JSON.stringify(allPlaylist);
    return {
      status: 200,
      message: "Playlist update successfully.",
    };
  }
};

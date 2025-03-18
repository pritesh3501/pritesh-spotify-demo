import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { setAuthData } from "../store/globalSlice";
import PlayList from "./PlayList";
import PlaylistForm from "./PlaylistForm";
import { FC, useState } from "react";
import { MusicProps, PlaylistFormProps } from "../utils/constant";
import searchIcon from "../assets/searchMusic.png";
import SearchMusic from "./SearchMusic";
import PlaylistPopup from "./PlaylistPopup";
import { addToPlaylist } from "../utils/helpers";

const Dashboard: FC = () => {
  const dispatch = useDispatch();
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [isForm, setIsForm] = useState<boolean>(false);
  const [editData, setEditData] = useState<PlaylistFormProps | null>(null);
  const [songData, setSongData] = useState<MusicProps | undefined>();
  const [commonError, setCommonError] = useState<string>("");

  // Remove localstorage data and reset redux state
  const handleLogout = () => {
    dispatch(setAuthData(new Date().toLocaleString()));
    localStorage.removeItem("authData");
  };

  // Select music and set in state and open playlist selection popup
  const selectMusic = (data: MusicProps) => {
    setCommonError("");
    if (data?.id) {
      const artistNames = data?.artists
        ?.map((artist: { name: string }) => artist.name)
        .join(", ");
      const imgURL: string | undefined = data?.images
        ? data?.images?.[0].url
        : "";
      setSongData({
        id: data?.id || "",
        name: data?.name || "",
        url: data?.external_urls?.spotify || "",
        image: imgURL,
        artist: artistNames || "",
      });
    } else {
      setSongData(undefined);
    }
  };

  // Add song in playlist
  const handleAddToPlaylist = (name: string) => {
    const res = addToPlaylist(name, songData || {});
    setCommonError("");
    if (res?.status === 200) {
      selectMusic({});
    } else {
      setCommonError(res?.message);
    }
  };

  return (
    <div>
      {songData && (
        <PlaylistPopup
          handleAddToPlaylist={handleAddToPlaylist}
          selectMusic={selectMusic}
          commonError={commonError}
        />
      )}
      {isSearch && (
        <SearchMusic setIsSearch={setIsSearch} selectMusic={selectMusic} />
      )}
      {isForm && <PlaylistForm setIsForm={setIsForm} editData={editData} />}
      <Box sx={{ flexGrow: 1, marginTop: 2 }}>
        <AppBar position="static" color="success">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{ display: "flex", cursor: "pointer" }}
                onClick={() => {
                  setIsSearch(true);
                }}
              >
                <img src={searchIcon} height={30} />
              </Box>
              <Button
                color="inherit"
                variant="text"
                type="button"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <PlayList
          setIsForm={() => setIsForm(!isForm)}
          setEditData={setEditData}
        />
      </Box>
    </div>
  );
};

export default Dashboard;

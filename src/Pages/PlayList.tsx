import { Box, Grid, Menu, MenuItem, Typography } from "@mui/material";
import React, { FC, useState } from "react";
import emptyImage from "../assets/spotify.png";
import createPlaylist from "../assets/createPlaylist.png";
import menuIcon from "../assets/menu.png";
import { deletePlayList } from "../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import {
  MusicProps,
  PlaylistFormProps,
  PlaylistProps,
  ReduxProps,
} from "../utils/constant";
import { setPlaylist } from "../store/globalSlice";
import PlaylistDetails from "./PlaylistDetails";

interface PlayListProps {
  setIsForm: () => void;
  setEditData: React.Dispatch<React.SetStateAction<PlaylistFormProps | null>>;
}
const PlayList: FC<PlayListProps> = ({ setIsForm, setEditData }) => {
  const dispatch = useDispatch();
  const [playlistDetails, setPlaylistDetails] = useState<MusicProps>();
  const reduxData = useSelector((state: ReduxProps) => state.global);
  const [sIndex, setSIndex] = useState<number | string>("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setAnchorEl(event.currentTarget);
    setSIndex(index);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setSIndex("");
    setEditData(null);
  };
  const handleDelete = () => {
    const newList = displayList?.filter(
      (_: never, index: number) => index !== sIndex
    );
    const res = deletePlayList(newList);
    if (res?.status === 200) {
      dispatch(setPlaylist((reduxData?.playList || 0) + 1));
    }
    handleClose();
  };
  const handleEdit = () => {
    setIsForm();
    const findData = displayList[sIndex] || {};
    delete findData?.details;

    setEditData(findData);
  };
  const allPlayList = JSON.parse(localStorage.playlist);
  const userEmail = localStorage.authData
    ? JSON.parse(localStorage.authData).email
    : "";
  const displayList = allPlayList?.find(
    (o: PlaylistProps) => o.userEmail === userEmail
  )?.data;

  return (
    <Grid container spacing={2} sx={{ marginTop: 2 }}>
      {playlistDetails?.name && (
        <PlaylistDetails
          playlistDetails={playlistDetails}
          setPlaylistDetails={setPlaylistDetails}
        />
      )}
      <Grid
        item
        xs={12}
        sm={6}
        md={3}
        lg={3}
        sx={{ cursor: "pointer" }}
        onClick={setIsForm}
        component="div"
      >
        <Box
          sx={{
            border: "1px solid #c3c3c3",
            display: "flex",
            justifyContent: "center",
            padding: 3,
          }}
        >
          <Box sx={{ height: 100, width: 100 }}>
            <img src={createPlaylist} height={100} width={100} />
          </Box>
        </Box>
        <Typography variant="body2" textAlign="center">
          Create New
        </Typography>
      </Grid>
      {displayList?.map((elm: PlaylistFormProps, index: number) => {
        const { name } = elm;
        return (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            lg={3}
            sx={{ cursor: "pointer", position: "relative" }}
            key={index}
            onClick={() => {
              // setPlaylistDetails(elm);
            }}
            component="div"
          >
            <Box
              sx={{
                position: "absolute",
                right: 5,
                top: 26,
                cursor: "pointer",
              }}
              id="demo-positioned-button"
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={(event) => {
                handleClick(event, index);
              }}
            >
              <img src={menuIcon} height={20} width={20} />
            </Box>
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <MenuItem onClick={handleEdit}>Edit</MenuItem>
              <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </Menu>

            <Box
              sx={{
                border: "1px solid #c3c3c3",
                display: "flex",
                justifyContent: "center",
                padding: 3,
                cursor: "pointer",
              }}
              onClick={(e) => {
                e.stopPropagation();
                setPlaylistDetails(elm);
              }}
            >
              <Box sx={{ height: 100, width: 100 }}>
                <img src={emptyImage} height={100} width={100} />
              </Box>
            </Box>
            <Typography variant="body2">{name}</Typography>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default PlayList;

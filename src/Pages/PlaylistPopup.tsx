import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  Modal,
  Typography,
} from "@mui/material";
import React, { FC } from "react";
import { getUserPlaylist } from "../utils/helpers";
import { MusicProps, PlaylistFormProps } from "../utils/constant";

interface PlaylistPopupProps {
  handleAddToPlaylist: (playlistName: string) => void;
  selectMusic: (data: MusicProps) => void;
  commonError: string;
}
const PlaylistPopup: FC<PlaylistPopupProps> = ({
  handleAddToPlaylist,
  selectMusic,
  commonError,
}) => {
  const userEmail = localStorage.authData
    ? JSON.parse(localStorage.authData).email
    : "";
  const userPlayList = getUserPlaylist(userEmail);

  return (
    <Modal
      open
      onClose={() => {
        selectMusic({});
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: 220, sm: 300, md: 350 },
          bgcolor: "background.paper",
          borderRadius: 1,
          boxShadow: 24,
          p: 2,
        }}
      >
        <Typography variant="h6">Select Playlist</Typography>
        {commonError && (
          <Typography
            variant="body2"
            fontWeight="normal"
            sx={{ marginTop: 2 }}
            color="red"
          >
            {commonError}
          </Typography>
        )}
        <List sx={{ maxHeight: 300, overflow: "auto" }}>
          {userPlayList?.map((elm: PlaylistFormProps, index: number) => {
            return (
              <React.Fragment key={index}>
                <ListItem disablePadding>
                  <ListItemButton
                    sx={{ display: "flex", gap: 2 }}
                    onClick={() => {
                      handleAddToPlaylist(elm?.name || "");
                    }}
                  >
                    {elm?.name}
                  </ListItemButton>
                </ListItem>
                <Divider />
              </React.Fragment>
            );
          })}
        </List>
      </Box>
    </Modal>
  );
};

export default PlaylistPopup;

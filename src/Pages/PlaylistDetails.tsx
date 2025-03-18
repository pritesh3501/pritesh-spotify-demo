import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import React, { FC } from "react";
import { MusicProps, PlaylistFormProps } from "../utils/constant";

interface PlaylistDetailsProps {
  playlistDetails: PlaylistFormProps;
  setPlaylistDetails: (data: MusicProps) => void;
}
const PlaylistDetails: FC<PlaylistDetailsProps> = ({
  playlistDetails,
  setPlaylistDetails,
}) => {
  const { name, description, details } = playlistDetails;

  return (
    <Drawer
      anchor="right"
      open
      onClose={() => {
        setPlaylistDetails({});
      }}
    >
      <Box sx={{ width: 300 }}>
        <Typography variant="h5" padding={1}>
          {name}
        </Typography>
        <Typography variant="body2" padding={1} marginBottom={2}>
          {description}
        </Typography>
        <Divider />
        <List sx={{ height: 300, overflow: "auto" }}>
          {details?.map((elem, index: number) => {
            const { name, image, artist, url } = elem;

            return (
              <React.Fragment key={index}>
                <ListItem disablePadding>
                  <ListItemButton
                    sx={{ display: "flex", gap: 2 }}
                    onClick={() => {
                      window.open(url, "_blank");
                    }}
                  >
                    <Box sx={{ display: "flex" }}>
                      <img height={50} width={50} src={image} />
                    </Box>
                    <Box>
                      <Typography variant="body2" fontWeight="bold">
                        {name}
                      </Typography>
                      <Typography variant="caption" fontWeight="normal">
                        {artist}
                      </Typography>
                    </Box>
                  </ListItemButton>
                </ListItem>
                <Divider />
              </React.Fragment>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
};

export default PlaylistDetails;

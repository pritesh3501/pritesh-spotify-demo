import React, { FC, useState } from "react";
import {
  Box,
  CircularProgress,
  Divider,
  FormControl,
  List,
  ListItem,
  ListItemButton,
  Modal,
  OutlinedInput,
  Typography,
} from "@mui/material";
import searchMusicInput from "../assets/searchMusicInput.png";
import { handleSearchMusic } from "../utils/helpers";
import { MusicProps } from "../utils/constant";

interface SearchMusicProps {
  setIsSearch: React.Dispatch<React.SetStateAction<boolean>>;
  selectMusic: (data: MusicProps) => void;
}
const SearchMusic: FC<SearchMusicProps> = ({ setIsSearch, selectMusic }) => {
  const [searchText, setSearchText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [list, setList] = useState<MusicProps[]>([]);

  // search music
  const handleSearch = async () => {
    setLoading(true);
    const res = await handleSearchMusic(searchText);
    if (res?.albums) {
      const { items } = res?.albums || {};

      setList(items);
    }
    setLoading(false);
  };

  return (
    <Modal
      open
      onClose={() => {
        setIsSearch(false);
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
          width: { xs: 250, sm: 350, md: 400 },
          bgcolor: "background.paper",
          borderRadius: 1,
          boxShadow: 24,
          p: 2,
        }}
      >
        <Box>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <OutlinedInput
              color="success"
              id="search-box"
              placeholder="Search..."
              size="small"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value.trimStart());
              }}
              endAdornment={
                <Box
                  sx={{ display: "flex", cursor: "pointer" }}
                  onClick={() => {
                    if (searchText) {
                      handleSearch();
                    }
                  }}
                >
                  <img src={searchMusicInput} height={25} />
                </Box>
              }
            />
          </FormControl>
          {loading ? (
            <Box
              sx={{
                height: 300,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex" }}>
                <CircularProgress color="success" />
              </Box>
            </Box>
          ) : list.length === 0 ? (
            <Box
              sx={{
                height: 300,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography textAlign="center">
                Search for a song and select it from the list to add to your
                playlist.
              </Typography>
            </Box>
          ) : (
            <>
              <List sx={{ height: 300, overflow: "auto" }}>
                {list?.map((elem: MusicProps, index: number) => {
                  const { name, images, artists } = elem;
                  const artistNames = artists
                    ?.map((artist: { name: string }) => artist.name)
                    .join(", ");

                  return (
                    <React.Fragment key={index}>
                      <ListItem disablePadding>
                        <ListItemButton
                          sx={{ display: "flex", gap: 2 }}
                          onClick={() => {
                            selectMusic(elem);
                          }}
                        >
                          <Box sx={{ display: "flex" }}>
                            <img
                              height={50}
                              width={50}
                              src={images?.[0]?.url}
                            />
                          </Box>
                          <Box>
                            <Typography variant="body2" fontWeight="bold">
                              {name}
                            </Typography>
                            <Typography variant="caption" fontWeight="normal">
                              {artistNames}
                            </Typography>
                          </Box>
                        </ListItemButton>
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  );
                })}
              </List>
            </>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default SearchMusic;

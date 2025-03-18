import { Box, Button, FormControl, Modal, Typography } from "@mui/material";
import { FC, useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import TextInput from "../Components/TextInput";
import { PlaylistFormProps } from "../utils/constant";
import { createPlaylist, editPlaylist } from "../utils/helpers";

interface PlayListForm {
  setIsForm: React.Dispatch<React.SetStateAction<boolean>>;
  editData?: PlaylistFormProps | null;
}
const PlaylistForm: FC<PlayListForm> = ({ setIsForm, editData }) => {
  const [commonError, setCommonError] = useState<string>("");

  // Call function from helpers to handle playlist
  const handleSubmit = (values: PlaylistFormProps) => {
    if (editData) {
      const res = editPlaylist(editData?.name || "", values);
      if (res?.status === 200) {
        setIsForm(false);
      } else {
        setCommonError(res?.message);
      }
    } else {
      const res = createPlaylist(values);
      setCommonError("");
      if (res?.status === 201) {
        setIsForm(false);
      } else {
        setCommonError(res?.message);
      }
    }
  };

  // Playlist form validation schemas
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required.")
      .matches(/^\S.*\S$/, "Remove extra spaces."),
  });

  // Playlist form initial value
  const initialValues = {
    name: editData?.name || "",
    description: editData?.description || "",
  };

  return (
    <Modal
      open
      onClose={() => {
        setIsForm(false);
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
        <Typography variant="h5" fontWeight="bold" marginBottom={2}>
          {editData ? "Edit Playlist" : "Create Playlist"}
        </Typography>
        {commonError && (
          <Typography
            variant="body2"
            fontWeight="normal"
            sx={{ marginBottom: 3 }}
            color="red"
          >
            {commonError}
          </Typography>
        )}
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {(props) => {
            const { values, errors, handleChange, handleSubmit } = props;
            const { name, description } = values;
            const { name: errName } = errors;

            return (
              <Box component="form" onSubmit={handleSubmit}>
                <TextInput
                  sx={{ marginBottom: 2 }}
                  id="name"
                  label="Name"
                  helperText={errName}
                  value={name}
                  onChange={handleChange}
                />
                <TextInput
                  sx={{ marginBottom: 2 }}
                  id="description"
                  label="Description"
                  value={description}
                  onChange={handleChange}
                  multiline={true}
                  rows={4}
                />

                <FormControl fullWidth>
                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    disabled={initialValues.name === name}
                  >
                    Submit
                  </Button>
                </FormControl>
              </Box>
            );
          }}
        </Formik>
      </Box>
    </Modal>
  );
};

export default PlaylistForm;

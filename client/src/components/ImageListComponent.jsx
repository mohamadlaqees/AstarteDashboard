import { Box, ImageList, ImageListItem, Stack } from "@mui/material";

const ImageListComponent = ({ media }) => {
  return (
    <Stack spacing={4}>
      <Box sx={{ width: 500, height: 450, overflow: "scroll" }}>
        <ImageList
          variant="masonry"
          sx={{ width: 500, height: 450 }}
          cols={3}
          gap={8}
        >
          {media?.map((e) => (
            <ImageListItem key={e}>
              <img src={e} alt={e} loading="lazy" />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Stack>
  );
};

export default ImageListComponent;

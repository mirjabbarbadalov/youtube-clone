import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import Videos from "./Videos";

import { fetchFromAPI } from "../utils/fetchFromAPI";

function VideoDetail() {
  const { id } = useParams();

  const [videoDetail, setVideoDetail] = useState([]);
  const [videos, setVideos] = useState([]);

  // console.log(videoDetail);

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) =>
      setVideoDetail(data.items[0])
    );

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
      (data) => setVideos(data.items)
    );
  }, [id]);

  const theme = useTheme();
  const isMediumScreenOrHigher = useMediaQuery(theme.breakpoints.up("md"));

  if (!videoDetail?.snippet) return "Loading..";

  return (
    <Box minHeight={"95vh"}>
      <Stack direction={isMediumScreenOrHigher ? "row" : "column"}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />
            <Typography color={"#fff"} variant="h5" fontWeight={"bold"} p={2}>
              {videoDetail?.snippet?.title}
            </Typography>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              sx={{ color: "#fff" }}
              py={1}
              px={2}
              marginTop={"-30px"}
            >
              <Link to={`/channel/${videoDetail.snippet.channelId}`}>
                <Typography
                  variant={isMediumScreenOrHigher ? "h6" : "subtitle1"}
                  color={"#fff"}
                >
                  {videoDetail.snippet.channelTitle}
                  <CheckCircle
                    sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                  />
                </Typography>
              </Link>
              <Stack direction={"row"} gap={"20px"} alignContent={"center"}>
                <Typography variant="body1" sx={{ opacity: "0.7" }}>
                  {parseInt(videoDetail.statistics.viewCount).toLocaleString()}{" "}
                  views
                </Typography>

                <Typography variant="body1" sx={{ opacity: "0.7" }}>
                  {parseInt(videoDetail.statistics.likeCount).toLocaleString()}{" "}
                  likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>

        <Box
          px={2}
          py={isMediumScreenOrHigher ? 1 : 5}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {videos.length > 0 && <Videos videos={videos} direction={"column"} />}
        </Box>
      </Stack>
    </Box>
  );
}

export default VideoDetail;

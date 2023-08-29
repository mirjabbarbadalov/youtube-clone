import { Link } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

import {
  demoThumbnailUrl,
  demoVideoUrl,
  demoVideoTitle,
  demoChannelUrl,
  demoChannelTitle,
} from "../utils/constants";

function VideoCard({ video }) {
  const theme = useTheme();
  const isMediumScreenOrHigher = useMediaQuery(theme.breakpoints.up("md"));

  const imgUrl = video?.snippet?.thumbnails?.high?.url;

  return (
    <Card
      sx={{
        width: !isMediumScreenOrHigher ? "100%" : "320px",
        boxShadow: "none",
        borderRadius: 0,
      }}
    >
      <Link to={`/video/${video.id.videoId}`}>
        <CardMedia
          image={video?.snippet?.thumbnails?.high?.url}
          alt={video?.snippet?.title}
          sx={{ width: "358px", height: "180px" }}
        />
      </Link>
      <CardContent sx={{ backgroundColor: "#1e1e1e", height: "106px" }}>
        <Link to={`/video/${video.id.videoId}`}>
          <Typography variant="subtitle1" fontWeight={"bold"} color={"#FFF"}>
            {video?.snippet?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)}
          </Typography>
        </Link>
        <Link
          to={
            video?.snippet?.channelId
              ? `channel/${video?.snippet?.channelId}`
              : demoChannelUrl
          }
        >
          <Typography variant="subtitle2" fontWeight={"bold"} color={"gray"}>
            {video?.snippet?.channelTitle || demoChannelTitle}
            <CheckCircle
              sx={{ fontSize: 12, color: "gray", marginLeft: "5px" }}
            />
          </Typography>
        </Link>
      </CardContent>
    </Card>
  );
}

export default VideoCard;

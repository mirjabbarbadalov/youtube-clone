import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import Videos from "./Videos";
import ChannelCard from "./ChannelCard";

import { fetchFromAPI } from "../utils/fetchFromAPI";

function ChannelDetail() {
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);

  const { id } = useParams();

  // console.log(channelDetail, videos);

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`).then((data) =>
      setChannelDetail(data?.items[0])
    );

    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`).then(
      (data) => setVideos(data?.items)
    );
  }, [id]);

  return (
    <Box minHeight={"95vh"}>
      <Box>
        <div
          style={{
            background:
              "linear-gradient(90deg, rgba(52,247,255,1) 0%, rgba(213,29,253,1) 51%, rgba(252,69,69,1) 100%)",
            zIndex: 10,
            height: "200px",
          }}
        />
        <ChannelCard channelDetail={channelDetail} marginTop="-110px" />
      </Box>

      <Box sx={{ mr: { sm: "100px" } }}>
        <Videos videos={videos} />
      </Box>
    </Box>
  );
}

export default ChannelDetail;

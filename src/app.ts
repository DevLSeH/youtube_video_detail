import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

interface videoDetailObject {
    id: string,
    name: string,
    channel: string,
    description: string,
    publishedAt: Date,
    img: URL,
    tag: string,
    viewCount: number,
    likeCount: number,
    commentCount: number
}

const apiClient = axios.create({
    baseURL: "https://www.googleapis.com/youtube/v3",
    params: { key: process.env.API_KEY },
});

const videoDetails = async (videoId: string) => {
    try {
        const response = await apiClient.get("/videos", {
            params: {
                part: "snippet, statistics",
                id: videoId
            },
        })
        const data = response.data;
        const snippet = data.items[0].snippet;
        const statistics = data.items[0].statistics;

        const videoPublishedAt = snippet.publishedAt;
        const videoName = snippet.title;
        const videoDescription = snippet.description;
        const videoThumbnail = snippet.thumbnails.medium;
        const channel = snippet.channelTitle;
        const videoTags = snippet.tags;

        const videoViewCount = statistics.viewCount;
        const videoLikeCount = statistics.likeCount;
        const videoCommentCount = statistics.commentCount;

        const videoDetails: videoDetailObject = {
            id: videoId,
            channel: channel,
            name: videoName,
            description: videoDescription,
            publishedAt: videoPublishedAt,
            img: videoThumbnail,
            tag: videoTags,
            viewCount: videoViewCount,
            likeCount: videoLikeCount,
            commentCount: videoCommentCount


        };
        console.log(videoDetails);

        return videoDetails;
    } catch (error) {
        console.error(error);

    }
}

videoDetails("RXykCfCpQd4");
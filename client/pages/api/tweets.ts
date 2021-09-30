import axios from "axios";

const twitterProfileId = process.env.NEXT_PUBLIC_TWITTER_PROFILE_ID;
const twitterBearerTokenId = process.env.NEXT_PUBLIC_TWITTER_BEARER_TOKEN;

const twitterTimelineEndpoint = `https://api.twitter.com/2/users/${twitterProfileId}/tweets?max_results=5`;
const config = {
  headers: { Authorization: `Bearer ${twitterBearerTokenId}` },
};

export async function getLastTweetFromTwitterProfile() {
  const { data: twitterTimelineData } = await axios(
    twitterTimelineEndpoint,
    config
  );

  return twitterTimelineData;
}

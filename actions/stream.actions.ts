"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
  const user = await currentUser();

  if (!user) throw new Error("User is not Authenticated");
  if (!apiKey) throw new Error("No Stream Api Key Found");
  if (!apiSecret) throw new Error("No Stream Api Secret Found");

  const client = new StreamClient(apiKey, apiSecret);

  // validity is optional (by default the token is valid for an hour)
  //   const validity = 60 * 60;

  const token = client.generateUserToken({ user_id: user.id });
  //   console.log("Stream Token : ", token);
  return token;
};

//import myConfiguredSanityClient from './sanityClient'
import imageUrlBuilder from "@sanity/image-url";

import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2023-03-27", // use current UTC date - see "specifying API version"!
  token: process.env.REACT_APP_SANITY_CLIENT_TOKEN,
  useCdn: true, // `false` if you want to ensure fresh data
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

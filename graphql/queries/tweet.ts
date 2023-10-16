import { graphql } from "@/gql";

export const getAllTweetsQuery = graphql(`
    query GetAllTweets {
    getAllTweets {
        id
        content
        imageURL
        author{
            firstaName
            lastName
            profileImageURL
        }
     }
`);
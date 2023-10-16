
import { graphqlClient } from "@/clients/api"
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getAllTweetsQuery } from '@/graphql/queries/tweet'
import { createTweetMutation } from "@/graphql/mutation/tweet"
import { CreateTweetData } from "@/gql/graphql"
import toast from "react-hot-toast"
export const useCreateTweet = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (payload: CreateTweetData) => graphqlClient.request(createTweetMutation, { payload }),
      onMutate: (payload) => toast.loading("Creating", {id:'1'}),
      onSuccess: () => {
        queryClient.invalidateQueries(["all-tweets"])
        toast.success('Created Success', {id: '1'})
      }
    })
  return mutation;
}
export const useGetAllTweets = () => {
    const query = useQuery({
        queryKey: ['all-tweets'],
        queryFn: async () => await graphqlClient.request(getAllTweetsQuery)
    });
    return { ...query, tweets: query.data?.getAllTweets };
}
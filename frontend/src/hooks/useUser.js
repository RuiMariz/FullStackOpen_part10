import { useQuery } from "@apollo/client";
import { GET_AUTHORIZED_USER } from "../graphql/queries";

const useUser = () => {
  const variables = { includeReviews: true, first: 5 };

  const { data, loading, fetchMore, ...result } = useQuery(GET_AUTHORIZED_USER, {
    variables,
    fetchPolicy: "cache-and-network"
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.authorizedUser.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.authorizedUser.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    user: data?.authorizedUser,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useUser;
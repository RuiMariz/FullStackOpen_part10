import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";
import { convertSortBy } from "../utils";

const useRepositories = (sortBy) => {
  const [repositories, setRepositories] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const variables = convertSortBy(sortBy);

  useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables,
    onCompleted: (data) => {
      setRepositories(data.repositories);
      setLoading(false);
    },
    onError: (error) => {
      setError(error);
      setLoading(false);
    }
  });

  return { repositories, loading, error };
};

export default useRepositories;
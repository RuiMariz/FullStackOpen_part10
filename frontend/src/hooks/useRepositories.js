import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
  const [repositories, setRepositories] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
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
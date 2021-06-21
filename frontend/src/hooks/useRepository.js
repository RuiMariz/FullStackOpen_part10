import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = (id) => {
  const [repository, setRepository] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useQuery(GET_REPOSITORY, {
    variables: { id },
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      setRepository(data.repository);
      setLoading(false);
    },
    onError: (error) => {
      setError(error);
      setLoading(false);
    }
  });

  return { repository, loading, error };
};

export default useRepository;
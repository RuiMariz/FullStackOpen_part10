import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from '../graphql/mutations';

const useReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({ ownerName, repositoryName, rating, text }) => {
    // call the mutate function here with the right arguments

    const result = await mutate({
      variables:
        { input:{ownerName, repositoryName, rating, text }}
    });
    return result;
  };

  return [createReview, result];
};

export default useReview;
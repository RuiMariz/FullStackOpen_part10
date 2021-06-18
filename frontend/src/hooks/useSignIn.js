import { useMutation } from "@apollo/client";
import { AUTHORIZE } from "../graphql/mutations";

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHORIZE);

  const signIn = async ({ username, password }) => {
    // call the mutate function here with the right arguments
    const result = await mutate({variables: {input: {username, password}}});
    return result;
  };

  return [signIn, result];
};

export default useSignIn;
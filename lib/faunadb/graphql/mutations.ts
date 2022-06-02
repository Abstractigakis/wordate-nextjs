import { gql } from "graphql-request";

export const updateUserMutation = gql`
  mutation updateUser(
    $id: ID!
    $name: String!
    $displayName: String!
    $email: String!
    $image: String!
  ) {
    updateUsers(
      id: $id
      data: {
        name: $name
        displayName: $displayName
        email: $email
        image: $image
      }
    ) {
      _id
      _ts
      name
      displayName
      email
      image
    }
  }
`;

export const createSolveMutation = gql`
  mutation createSolve(
    $errorStack: [String]!
    $errors: Int!
    $gameStack: [String]!
    $score: Int!
    $wordationStack: [String]!
    $wordations: Int!
    $userId: ID!
    $puzzleId: ID!
  ) {
    createSolves(
      data: {
        errorStack: $errorStack
        errors: $errors
        score: $score
        gameStack: $gameStack
        wordationStack: $wordationStack
        wordations: $wordations
        user: { connect: $userId }
        puzzle: { connect: $puzzleId }
      }
    ) {
      _id
      _ts
      errorStack
      errors
      score
      gameStack
      wordationStack
      wordations
      user {
        _id
        _ts
        name
        displayName
        email
        image
      }
      puzzle {
        _id
        _ts
        wi
        wj
        i
        j
        date
        solves {
          data {
            _id
            _ts
            errors
            gameStack
            score
            user {
              displayName
              name
              _id
            }
          }
        }
      }
    }
  }
`;

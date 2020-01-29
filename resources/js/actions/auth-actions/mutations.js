import gql from 'graphql-tag';
export const  LOGIN_USER = gql`
  mutation login($email: String!,$password:String!) {
    login(data:{email: $email,password:$password}) {
        token,
        user{id,name,email}
    }
  }
`;

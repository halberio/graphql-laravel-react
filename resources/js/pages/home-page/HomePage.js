import React from "react";
import "./home-page.scss";
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const GET_USERS = gql`
    query getGreeting($page: Int!) {
        users(page:$page,first:20) {
            data {
                id
                name
                email
            }
        }
    }
`;

const HomePage = () => {
    const { loading, error, data } = useQuery(GET_USERS, {
        variables: { page: 1 },
    });

  return (
    <div className="home-page">
     <h1 >Users:</h1>
       {error ? <p>error :(</p> : loading ? <p>...loading</p> : data.users.data.map((userItem,index)=>(
         <div key={index} style={{
             display:'flex',
             alignItems:'center',
             justifyContent:'center'
         }}>
             <p  style={{
                 marginRight:"1rem"
             }}>{userItem.id}</p>
             <p>{userItem.name}</p>

         </div>

       )) }
    </div>
  );
};

export default HomePage;

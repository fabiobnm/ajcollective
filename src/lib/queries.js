// lib/queries.js
import { gql } from '@apollo/client';

export const GET_POSTS = gql`
{
  creatives {
    id
    name
  }
}
`;

export const GET_POSTSOrderCreatives = gql`
query{
 creativesOrders{
  creative{
    name
      id
      gif{
      url
      }
    projects{
      ... on Project{
        cover{url}
        title
      }
    } 
    }
  }
}

`;

export const GET_POSTScontacts = gql`
{
  contacts {
    id
    info
    
  }
}
`;

export const GET_GIGI = gql`
 {
  moodFilms {
    id
    title
    editor
    vimeoUrl
    cover{
      url
    }
  }
}
`;

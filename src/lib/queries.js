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
export const GET_POSTSHomePage = gql`
 {
  homePages{
    gallery{
      url
    }
    headerText{
      html
    }
  }
}

`;


export const GET_POSTSWinningJob = gql`
query{
  winningJobs{
   title
   editor
   thumbnail{url
   }
   urlLink
 }
 }`;

export const GET_POSTSOrderCreatives = gql`
query{
 creativesOrders{
  creative(first:100){
    name
      id
      gif{
      url
      }
    projects(first:100){
      ... on Project{
        cover{url}
        title
        urlLink
      }
    } 
    moodFilms(first:100){
      ... on MoodFilm{
        thumbnail{url}
        title
        urlLink
        fileVideo{
        url}
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
    info{
    html 
    raw}
    firstRate{
    markdown
    html 
    raw}
    secondRate{
    markdown
    html 
    raw}
    thirdRate{
    markdown
    html 
    raw}
    fourthRate{
    html 
    raw}
    cancellationFees
    hours
    payment
    
  }
}
`;

export const GET_GIGI = gql`
 {
  MoodFilmOlds (first:100) {
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

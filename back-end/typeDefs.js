const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type Query{
        musics: [Music!]
    }

    type Music{
        id: ID!
        title: String!
        album: String!
        artis: String!
        year: Int!
    }

    input AddMusicInput{
        title: String!
        album: String!
        artis: String!
        year: Int!
    }

    input UpdateMusicInput{
        id: ID!
        title: String
        album: String
        artis: String
        year: Int
    }

    input DeleteMusicInput{
        id: ID!
    }

    type Mutation{
        addMusic(addMusicInput: AddMusicInput): Music
        updateMusic(updateMusicInput: UpdateMusicInput): Boolean
        deleteMusic(deleteMusicInput: DeleteMusicInput): Boolean
    }
`

module.exports = typeDefs
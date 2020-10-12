import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";

const GET_MUSICS = gql`
  query GetMusic {
    musics {
      album
      title
      artis
      year
      id
    }
  }
`;

const UPDATE_MUSIC = gql`
  mutation UpdateMusic(
    $id: ID!
    $title: String
    $album: String
    $artis: String
    $year: Int
  ) {
    updateMusic(
      updateMusicInput: {
        id: $id
        title: $title
        album: $album
        artis: $artis
        year: $year
      }
    )
  }
`;

const DELETE_MUSIC = gql`
  mutation DeleteMusic($id: ID!) {
    deleteMusic(deleteMusicInput: { id: $id })
  }
`;

const ADD_MUSIC = gql`
  mutation AddMusic(
    $title: String!
    $album: String!
    $artis: String!
    $year: Int!
  ) {
    addMusic(
      addMusicInput: {
        title: $title
        album: $album
        artis: $artis
        year: $year
      }
    ) {
      title
      album
      artis
      year
    }
  }
`;

export default function Music() {
  const [title, setTitle] = useState("");
  const [album, setAlbum] = useState("");
  const [artis, setArtis] = useState("");
  const [year, setYear] = useState("");

  const [updates, setUpdates] = useState({
    title: "",
    album: "",
    artis: "",
    year: "",
    id: "",
  });

  const { loading, error, data } = useQuery(GET_MUSICS);
  const [deleteMusic] = useMutation(DELETE_MUSIC, {
    refetchQueries: [{ query: GET_MUSICS }],
  });
  const [addMusic] = useMutation(ADD_MUSIC, {
    refetchQueries: [{ query: GET_MUSICS }],
  });
  const [updateMusic] = useMutation(UPDATE_MUSIC, {
    refetchQueries: [{ query: GET_MUSICS }],
  });
  if (loading) return <h1>Loading....</h1>;
  if (error) return <h1>Error : {error.message}</h1>;

  return (
    <div>
      <div>
        <input
          name="title"
          placeholder="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          name="album"
          placeholder="Album"
          value={album}
          onChange={(e) => {
            setAlbum(e.target.value);
          }}
        />
        <input
          name="artis"
          value={artis}
          placeholder="Artis"
          onChange={(e) => {
            setArtis(e.target.value);
          }}
        />
        <input
          name="year"
          value={year}
          placeholder="Year"
          onChange={(e) => {
            setYear(e.target.value);
          }}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            addMusic({
              variables: {
                title,
                album,
                artis,
                year: +year,
              },
            });
            setTitle("");
            setAlbum("");
            setArtis("");
            setYear("");
          }}
        >
          Add Music
        </button>
      </div>
      <div>
        <input name="id" value={updates.id} />
        <input
          name="title"
          type="text"
          value={updates.title}
          onChange={(e) => {
            setUpdates({
              ...updates,
              title: e.target.value,
            });
          }}
        />
        <input
          name="album"
          type="text"
          value={updates.album}
          onChange={(e) => {
            setUpdates({
              ...updates,
              album: e.target.value,
            });
          }}
        />
        <input
          name="artis"
          type="text"
          value={updates.artis}
          onChange={(e) => {
            setUpdates({
              ...updates,
              artis: e.target.value,
            });
          }}
        />
        <input
          name="year"
          type="number"
          value={updates.year}
          onChange={(e) => {
            setUpdates({
              ...updates,
              year: +e.target.value,
            });
          }}
        />
        <button
          onClick={(e) => {
            updateMusic({
              variables: {
                  id: updates.id,
                  title: updates.title,
                  album: updates.album,
                  artis: updates.artis,
                  year: updates.year,
              },
            });
            setUpdates({
                ...updates,
                title: "",
                album: "",
                artis: "",
                year: "",
                id: "",
              });
          }}
        >
          Update Music
        </button>
      </div>
      <table border="1" cellPadding="15">
        <thead>
          <tr>
            <td>No</td>
            <td>Title</td>
            <td>Album</td>
            <td>Artis</td>
            <td>Year</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {data.musics.map((music, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{music.title}</td>
              <td>{music.album}</td>
              <td>{music.artis}</td>
              <td>{music.year}</td>
              <td>
                <button
                  onClick={(e) => {
                    deleteMusic({
                      variables: {
                        id: music.id,
                      },
                    });
                  }}
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setUpdates({
                      ...updates,
                      title: music.title,
                      album: music.album,
                      artis: music.artis,
                      year: music.year,
                      id: music.id,
                    });
                  }}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

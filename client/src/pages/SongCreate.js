import React, { useState } from "react";

import { gql, useMutation } from "@apollo/client";

import { Form, Button } from "react-bootstrap";

import { GET_SONG_LIST } from "../util/songsQuery";

const SongCreate = (props) => {
  const [title, settitle] = useState("");

  const handleChange = (e) => {
    settitle(e.target.value);
  };

  const createSong = (e) => {
    e.preventDefault();
    console.log(title);
    addSong({
      variables: { title },
    });
  };

  const [addSong, { data, loading }] = useMutation(ADD_SONG, {
    update: (_, result) => {
      console.log(result);
      props.history.push("/songs");
    },
    refetchQueries: [{ query: GET_SONG_LIST }],
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <Form onSubmit={createSong} noValidate>
      <Form.Group controlId="formBasicEmail">
        <Form.Label className="text-white">Create Song</Form.Label>
        <Form.Control
          type="text"
          value={title}
          name="title"
          onChange={handleChange}
          placeholder="Song title"
        />
        <Button type="submit" variant="success">
          Create
        </Button>
      </Form.Group>
    </Form>
  );
};

const ADD_SONG = gql`
  mutation addSong($title: String!) {
    addSong(title: $title) {
      title
    }
  }
`;

export default SongCreate;

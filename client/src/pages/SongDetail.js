import React, { useState } from "react";

import { gql, useQuery } from "@apollo/client";

import { Card, Button, Form } from "react-bootstrap";

import Music from "../assets/music.jpg";

const SongDetail = (props) => {
  const [lyrics, setLyrics] = useState("");

  const { data, loading } = useQuery(SONG_DETAIL, {
    variables: { id: props.location.state.id },
  });

  const lyricsHandler = (e) => {
    setLyrics(e.target.value);
  };

  const addLyric = () => {
    console.log(lyrics);
  };
  return !loading ? (
    <Card bg="success" style={{ width: "50%" }}>
      <Card.Img variant="top" src={Music} />
      <Card.Body>
        <Card.Title className="text-white">{data.song.title}</Card.Title>
        {data.song.lyrics.map((lyric, index) => (
          <Card.Text className="text-white" key={index}>
            {lyric.content}
          </Card.Text>
        ))}
        <Form.Control
          value={lyrics}
          onChange={lyricsHandler}
          type="text"
          placeholder="Add lyrics"
        />
        <Button variant="primary" onClick={addLyric}>
          Add lyrics
        </Button>
      </Card.Body>
    </Card>
  ) : (
    <p>Loading..</p>
  );
};

const SONG_DETAIL = gql`
  query getSongs($id: ID!) {
    song(id: $id) {
      title
      lyrics {
        content
      }
    }
  }
`;

export default SongDetail;

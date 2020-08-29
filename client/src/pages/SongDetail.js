import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { gql, useQuery, useMutation } from "@apollo/client";

import { Card, Button, Form } from "react-bootstrap";

import Music from "../assets/music.jpg";

const SongDetail = (props) => {
  const [lyrics, setLyrics] = useState("");

  useEffect(() => {
    console.log(props);
    if (!props.location.state.id) {
      props.history.push("/songs");
    }
  }, [props]);

  const { data, loading } = useQuery(SONG_DETAIL, {
    variables: { id: props.location.state.id },
  });

  const [addLyric, { loading: lyricLoading }] = useMutation(ADD_LYRIC, {
    update(_, res) {
      setLyrics("");
    },
    refetchQueries: [
      { query: SONG_DETAIL, variables: { id: props.location.state.id } },
    ],
    onError(err) {
      console.log(err);
    },
  });

  const lyricsHandler = (e) => {
    setLyrics(e.target.value);
  };

  return !loading ? (
    <Card bg="success" style={{ width: "50%" }}>
      <Button variant="light" as={Link} to="/songs">
        Back to Song List
      </Button>
      <Card.Img variant="top" src={Music} />
      <Card.Body>
        <Card.Title className="text-white">{data.song.title}</Card.Title>
        {data.song.lyrics.map((lyric, index) => (
          <React.Fragment key={index}>
            <Card.Text className="text-white">{lyric.content}</Card.Text>
            <Button variant="primary">Like</Button>
          </React.Fragment>
        ))}
        <Form.Control
          value={lyrics}
          onChange={lyricsHandler}
          type="text"
          placeholder="Add lyrics"
        />
        {lyricLoading ? (
          <Button variant="primary">Adding lyrics..</Button>
        ) : (
          <Button
            disabled={lyrics.length === 0}
            variant="primary"
            onClick={() =>
              addLyric({
                variables: { content: lyrics, songId: props.location.state.id },
              })
            }
          >
            Add lyrics
          </Button>
        )}
      </Card.Body>
    </Card>
  ) : (
    <p className="text-white">Loading..</p>
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

const ADD_LYRIC = gql`
  mutation addLyric($content: String!, $songId: ID!) {
    addLyricToSong(content: $content, songId: $songId) {
      id
    }
  }
`;

export default SongDetail;

import React from "react";
import { Link } from "react-router-dom";

import { gql, useQuery } from "@apollo/client";

import { Card, ListGroup, Button } from "react-bootstrap";

import { slugify } from "../util/slugify";
import { GET_SONG_LIST } from "../util/songsQuery";

const SongList = (props) => {
  const { data, loading } = useQuery(GET_SONG_LIST);

  const detail = (id, title) => {
    props.history.push(`/songs/${slugify(title)}`, { id });
  };
  return (
    <div className="py-5">
      {!loading ? (
        <Card>
          <Button as={Link} to="/song/create">
            Create a song
          </Button>
          <ListGroup variant="flush">
            {data.songs.map((song) => (
              <React.Fragment key={song.id}>
                <ListGroup.Item>{song.title}</ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    onClick={() => detail(song.id, song.title)}
                  >{`Details of ${song.title}`}</Button>
                </ListGroup.Item>
              </React.Fragment>
            ))}
          </ListGroup>
        </Card>
      ) : (
        <p className="text-white">Loading..</p>
      )}
    </div>
  );
};

export default SongList;

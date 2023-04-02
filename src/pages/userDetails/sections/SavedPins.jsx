import React from "react";

import { useSanity } from "../../../hooks/useSanity";

import Wrapper from "../../../components/ui/Wrapper";
import Pins from "../../../components/Pins/Pins";

const SavedPins = ({ userId }) => {
  const query = `*[_type == "pin" && savedBy._ref == '${userId}'] {
        _id,
        _createdAt,
        images{
          asset->{url}
        },
        title,
        about,
        desnitantion,
        postedBy->{
          _id,
          name,
          avatar
        },
        savedBy->{
          _id,
          name,
          avatar
        }
      }`;

  const { data, isLoading, error } = useSanity(query);

  if (isLoading) return;
  if (error) return;

  return (
    <section className="saved-pins section-padding">
      <Wrapper>
        <h2 className="section-heading">zapisane piny</h2>
        <Pins pins={data} />
      </Wrapper>
    </section>
  );
};

export default SavedPins;

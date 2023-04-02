import React from "react";
import { useSanity } from "../../../hooks/useSanity";

import Wrapper from "../../../components/ui/Wrapper";
import Pins from "../../../components/Pins/Pins";
import Loader from "../../../components/ui/Loader";

import "./CreatedPins.scss";

const CreatedPins = ({ userId }) => {
  const query = `*[_type == "pin" && postedBy._ref == '${userId}'] {
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

  if (isLoading) return <Loader small />;
  if (error) return;

  return (
    <section className="created-pins section-padding">
      <Wrapper>
        <h2 className="section-heading">utworzone piny</h2>
        <Pins pins={data} />
      </Wrapper>
    </section>
  );
};

export default CreatedPins;

import React from "react";

import { useParams } from "react-router-dom";
import { useSanity } from "../../hooks/useSanity";
import { useTitle } from "../../hooks/useTitle";

import PinInfo from "./sections/PinInfo";
import SimilarPins from "./sections/SimilarPins";
import Comments from "./sections/comments/Comments";
import Loader from "../../components/ui/Loader";
import Error from "../../components/ui/Error";

const PinDetails = ({ user }) => {
  const { id } = useParams();

  const query = `*[_type == "pin" && _id == '${id}' ][0]{
    _id,
    _createdAt,
    about,
    images{
      asset->{url}
    },
    title,
    about,
    desnitantion,
    desc,
    postedBy->{
      name,
      avatar
    },
    savedBy->{
      _id,
      name,
      avatar
    },
    category->{
      name
    }
  }`;

  const { data, isLoading, error } = useSanity(query);

  useTitle(data.title ? data.title : "ładowanie...");

  if (isLoading) return <Loader />;
  if (error) return <Error error={error} />;

  if (data.length === 0) return;

  return (
    <main className="main">
      <PinInfo pin={data} user={user} />
      <Comments user={user} pinId={id} />
      <SimilarPins pin={data} />
    </main>
  );
};

export default PinDetails;

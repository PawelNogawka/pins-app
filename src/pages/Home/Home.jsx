import React from "react";

import { useSanity } from "../../hooks/useSanity";

import Pins from "../../components/Pins/Pins";
import Loader from "../../components/ui/Loader";
import Error from "../../components/ui/Error";
import { useTitle } from "../../hooks/useTitle";

const Home = () => {
  const query = `*[_type == "pin"]{
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

  useTitle("pin app");

  if (isLoading) return <Loader />;
  if (error) return <Error error={error} />;

  return (
    <main className="main gray-section">
      <Pins pins={data} />
    </main>
  );
};

export default Home;

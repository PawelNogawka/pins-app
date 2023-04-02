import React from "react";
import { useParams } from "react-router-dom";
import { useSanity } from "../../hooks/useSanity";
import { useTitle } from "../../hooks/useTitle";

import Pins from "../../components/Pins/Pins";
import Loader from "../../components/ui/Loader";
import Error from "../../components/ui/Error";

const Search = () => {
  const { searchTerm } = useParams();

  const query = `*[_type == "pin" && (title match '${searchTerm}*' || about match '${searchTerm}*') || references(*[_type == "category" && name match '${searchTerm}*']._id)]{
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

  useTitle(searchTerm);

  if (isLoading) return <Loader />;
  if (error)
    return (
      <Error search error={`Brak wyników wyszukiwania dla '${searchTerm}'`} />
    );

  return (
    <main className="main gray-section">
      <Pins pins={data} />
    </main>
  );
};

export default Search;

import React from "react";

import { useParams } from "react-router-dom";
import { useSanity } from "../../hooks/useSanity";
import { useTitle } from "../../hooks/useTitle";

import Pins from "../../components/Pins/Pins";
import Loader from "../../components/ui/Loader";
import Error from "../../components/ui/Error";

const Categories = () => {
  const { slug } = useParams();

  const query = `*[_type == "pin" && references(*[_type == "category" && slug.current == '${slug}'][0]._id)]{
        _id,
        _createdAt,
        images{
          asset->{url}
        },
        title,
        about,
        destination,
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

  useTitle(slug);

  if (isLoading) return <Loader />;
  if (error) return <Error error={error} />;

  return (
    <main className="main">
      <Pins pins={data} />
    </main>
  );
};

export default Categories;

import React from "react";
import { useSanity } from "../../../hooks/useSanity";

import Wrapper from "../../../components/ui/Wrapper";
import Pins from "../../../components/Pins/Pins";
import Loader from "../../../components/ui/Loader";

const SimilarPins = ({ pin }) => {
  const { data, isLoading, error } = useSanity(
    `*[_type == 'pin' && category->name == '${pin.category.name}' && _id != '${pin._id}']{
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
        }`
  );

  if (isLoading) return <Loader small />;
  if (error) return;

  return (
    <section className="similar-pins gray-section section-padding">
      <Wrapper>
        <h2 className="section-heading">podobne piny</h2>
        <Pins pins={data} />
      </Wrapper>
    </section>
  );
};

export default SimilarPins;

import React from "react";
import { useParams } from "react-router-dom";

import { useSanity } from "../../hooks/useSanity";
import { useTitle } from "../../hooks/useTitle";

import UserHeader from "./sections/UserHeader";
import CreatedPins from "./sections/CreatedPins";
import SavedPins from "./sections/SavedPins";
import Loader from "../../components/ui/Loader";
import Error from "../../components/ui/Error";

const UserDetails = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useSanity(
    `*[_type == "user" && _id == '${id}'][0]`
  );

  useTitle(data.name ? data.name : "ładowanie...");

  if (isLoading) return <Loader />;
  if (error) return <Error error={error} />;

  return (
    <main className="main--smaller-padding">
      {data?.avatar && data?.heroImg && (
        <UserHeader
          avatarSrc={data.avatar.asset._ref}
          heroSrc={data.heroImg.asset._ref}
          name={data.name}
        />
      )}
      <CreatedPins userId={data._id} />
      <SavedPins userId={data._id} />
    </main>
  );
};

export default UserDetails;

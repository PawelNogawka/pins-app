import { useState, useEffect } from "react";
import { client } from "../lib/client";
import { useAuthContext } from "../hooks/useAuthContext";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { dispatch } = useAuthContext();

  const login = async (name, email, avatarUrl, id) => {
    try {
      setError(null);
      setIsLoading(true);

      const user = await client.createIfNotExists({
        _type: "user",
        _id: id,
        name: name,
        email: email,
      });

      if (!user) {
        throw new Error("Could not complete signup");
      }

      const response = await fetch(avatarUrl);
      const blob = await response.blob();

      const file = new File([blob], "avatar.jpg", { type: "image/jpeg" });

      const uploadedAsset = await client.assets.upload("image", file);

      const patchResult = await client
        .patch(user._id)
        .set({
          avatar: {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: uploadedAsset._id,
            },
          },
        })
        .commit();

      const userWithAvatar = Object.assign({}, user, {
        avatar: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: uploadedAsset._id,
          },
        },
      });
      dispatch({ type: "LOGIN", payload: userWithAvatar });

      setError(null);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    return () => {
      setError(null);
      setIsLoading(false);
    };
  }, []);

  return { login, isLoading, error };
};

import { useState } from "react";
import { client } from "../../lib/client";
import { useCreate } from "../../hooks/useCreate";
import { useSanity } from "../../hooks/useSanity";

import Wrapper from "../../components/ui/Wrapper";
import Input from "../../components/ui/Input";
import TextArea from "../../components/ui/TextArea";
import Button from "../../components/ui/Button";
import Error from "../../components/ui/Error";
import Loader from "../../components/ui/Loader";

import { AiOutlineCloudUpload } from "react-icons/ai";

import "./CreatePin.scss";

const CreatePin = ({ user }) => {
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [destination, setDestination] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoError, setPhotoError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [destinationError, setDestinationError] = useState(null);
  const [error, setError] = useState(null);

  const { error: createError, addDocument } = useCreate();

  const {
    isLoading: sanityLoading,
    error: sanityError,
    data: categories,
  } = useSanity(`*[_type == "category"]{
  _id,
  name
}`);

  if (sanityLoading) return <Loader />;
  if (sanityError) return <Error error={error} />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDestinationError(null);

    const urlRegex =
      /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

    if (!urlRegex.test(destination)) {
      setDestinationError("Niepoprawny adres url");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const photoRef = await client.assets.upload("image", photo, {
        contentType: photo.type,
        filename: photo.name,
      });

      const query = {
        _type: "pin",
        about: about,
        title: title,
        desc: desc,
        desnitantion: destination,
        images: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: photoRef?._id,
          },
        },
        postedBy: {
          _type: "reference",
          _ref: user._id,
        },
        category: {
          _type: "reference",
          _ref: category,
        },
      };

      await addDocument(query);
      setIsLoading(false);
      setError(null);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
      console.log(error);
    }
  };

  const handleResetBtnClick = () => {
    setAbout("");
    setCategory("");
    setDesc("");
    setDestination("");
    setPhoto("");
    setCategory("");
  };

  const handleFileInputChange = (e) => {
    const image = e.target.files[0];
    setPhotoError(null);
    setPhoto(null);

    if (!image) {
      setPhotoError("Wybierz zdjęcie");
      return;
    }

    if (image.size > 1000000) {
      setPhotoError("Zdjęcie jest zbyt duże");
      return;
    }
    if (!image.type.includes("image")) {
      setPhotoError("Plik nie jest zdjęciem");
      return;
    }
    setPhoto(image);
  };

  return (
    <main className="create-pin-main">
      <Wrapper>
        <h1 className="main-heading">Stwórz swój własny pin</h1>
        <form onSubmit={handleSubmit} className="create-pin">
          <div className="create-pin__left">
            {!photo && (
              <label className="create-pin__file-label">
                <input
                  className="create-pin__file-input"
                  type="file"
                  name="file"
                  id="file"
                  onChange={handleFileInputChange}
                  required
                />
                <div className="create-pin__file-btn">
                  <AiOutlineCloudUpload />
                  <span> Dodaj zdjęcie</span>
                </div>
              </label>
            )}
            {photo && (
              <div className="create-pin__added-img-box">
                <img
                  src={URL.createObjectURL(photo)}
                  alt="Dodane zdjęcie"
                  className="create-pin__added-img"
                />
                <button
                  onClick={() => setPhoto(null)}
                  className="create-pin__added-img-btn"
                >
                  usuń zdjęcie
                </button>
              </div>
            )}
            {photoError && (
              <p className="create-pin__img-error">{photoError}</p>
            )}
          </div>
          <div className="create-pin__right">
            <Input
              placeholder="Wpisz tytuł..."
              label="Tytuł:"
              id="title"
              name="title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />
            <Input
              placeholder="Tematyka..."
              label="Pin dotyczy:"
              id="about"
              name="about"
              onChange={(e) => setAbout(e.target.value)}
              value={about}
              required
            />
            <Input
              placeholder="https://www.google.com"
              label="Wpisz link"
              id="destination"
              name="destination"
              onChange={(e) => setDestination(e.target.value)}
              value={destination}
              required
            />
            <TextArea
              placeholder="Napisz opis..."
              label="Opis:"
              id="desc"
              name="desc"
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
              required
            />
            <div className="create-pin__select-box">
              <label htmlFor="select" className="create-pin__select-label">
                Wybierz kategorie
              </label>
              <select
                name="select"
                id="select"
                className="create-pin__select-input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="" selected disabled>
                  Wybierz kategorię
                </option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="create-pin__btns">
              <Button
                submit
                text={`${isLoading ? "Czekaj..." : "stwórz pin"}`}
              />
              <Button
                onClick={handleResetBtnClick}
                outlined
                text="wyczyść formularz"
              />
            </div>
            {createError && <p className="create-pin__error">{createError}</p>}
            {error && <p className="create-pin__error">{error}</p>}
            {destinationError && (
              <p className="create-pin__error">{destinationError}</p>
            )}
          </div>
        </form>
      </Wrapper>
    </main>
  );
};

export default CreatePin;

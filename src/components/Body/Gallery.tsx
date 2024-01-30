import { useState, useEffect } from "react";
import { GalleryImage } from "./Gallery/GalleryImage";
import { Loading } from "./Gallery/Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import Header from "./Header";

import { saveAs } from "file-saver";
import NotFound from "./NotFound";

const apikey = process.env["NEXT_PUBLIC_ACCESSKEY"];

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [notFound, setNotFound] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    fetchImages(searchTerm, false, true);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = (
    query = "modern",
    concat = true,
    search = false,
    count = 12
  ) => {
    let noResults = true;

    setTimeout(() => {
      if (noResults) {
        setNotFound(true);
        console.log("No se encontraron resultados en los primeros 3 segundos.");
      }
    }, 3000);

    if (search) {
      setImages([]);
    }

    axios
      .get(
        `https://api.pexels.com/v1/search?${
          query ? "query=" + encodeURIComponent(query) + "&" : ""
        }page=${page}&per_page=${count}`,
        {
          headers: {
            Authorization: apikey,
          },
        }
      )
      .then((res) => {
        if (res.data.photos.length === 0) {
          noResults = true;
        } else {
          noResults = false;
          setImages(
            concat ? [...images, ...res.data.photos] : [...res.data.photos]
          );
          setPage(page + 1);
          setNotFound(false);
        }
      })
      .catch((err) => {
        noResults = true;
        console.error(err);
      });
  };

  const handleClickImage = (image) => {
    setSelectedImage(image);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setSelectedImage(null);
    }
  };

  const handleDownload = (src, alt) => {
    let url = src;
    saveAs(url, alt);
  };

  const getColumnIndex = (index) => {
    return index % 3;
  };

  const renderColumns = () => {
    const columns = [[], [], []];
    images.forEach((image, index) => {
      const columnIndex = getColumnIndex(index);
      columns[columnIndex].push(
        <div
          className="relative group"
          data-aos="fade-up"
          key={image.id}
          onClick={() => handleClickImage(image)}
        >
          <GalleryImage src={image.src.large} alt={image.alt} />
          <div className="flex justify-center items-center duration-100 opacity-0 bg-gradient-to-t from-gray-800 via-gray-800 to-opacity-30 group-hover:opacity-50 absolute top-0 left-0 h-full w-full"></div>
          <div className="absolute top-0 left-0 w-full h-full px-3 flex justify-center items-center duration-100 opacity-0 hover:opacity-100">
            <div className="flex-row text-center">
              <p className="text-gray-50 font-bold text-lg overflow-ellipsis">
                {image.alt}
              </p>
              <p className="text-gray-200 font-semibold text-sm">
                By <span className="font-bold">{image.photographer}</span>
              </p>
              <small className="text-xs font-light text-gray-300">
                Photo provided by{" "}
                <a className="font-semibold" href="https://www.pexels.com/">
                  Pexels Api
                </a>
              </small>
            </div>
          </div>
        </div>
      );
    });
    return columns.map((column, index) => (
      <div className="flex flex-col gap-3" key={index}>
        {column}
      </div>
    ));
  };

  return (
    <>
      <Header onSearch={handleSearch}></Header>
      <div
        className={`${
          selectedImage ? "opacity-100 z-50" : "opacity-0 z-[-1]"
        } duration-300 fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-80`}
        onClick={handleOverlayClick}
      >
        {selectedImage && (
          <div>
            <img
              src={selectedImage.src.large}
              alt={selectedImage.alt}
              className="max-w-full max-h-full"
            />
            <div className="absolute top-4 right-4 flex flex-row gap-3">
              <button
                onClick={() =>
                  handleDownload(selectedImage.src.large, selectedImage.alt)
                }
                className="text-white bg-gray-800 px-5 py-2 rounded-full hover:bg-gray-600"
              >
                Download
              </button>

              <button
                onClick={() => setSelectedImage(null)}
                className="text-white bg-gray-800 px-5 py-2 rounded-full hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      {notFound == false ? (
        <InfiniteScroll
          dataLength={images.length}
          next={fetchImages}
          hasMore={true}
          style={{ height: "fit-content", overflowY: "hidden" }}
          loader={<Loading />}
        >
          <div className="mx-auto container px-3 sm:px-0">
            <div className="w-full h-fit flex justify-center flex-col gap-3 md:flex-row">
              {renderColumns()}
            </div>
          </div>
        </InfiniteScroll>
      ) : (
        <NotFound query={searchTerm} />
      )}
    </>
  );
}

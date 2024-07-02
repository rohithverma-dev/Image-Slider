import { useEffect, useState } from "react";
import "./App.css";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function App() {
  const [allImages, setAllImages] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const getAllImages = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://picsum.photos/v2/list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data) {
        setLoading(false);
        setAllImages(data);
      } else {
        setAllImages([]);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getAllImages();
  }, []);

  return loading ? (
    <>loading...</>
  ) : (
    <>
      <h1>Image Slider</h1>
      <div className="container">
        {allImages.map((item, index) => {
          return (
            imageIndex == Number(item.id) && (
              <img key={item.id} src={item.download_url} alt="image-loading" />
            )
          );
        })}
        <div className="small-buttons">
          {allImages.map((item, index) => {
            return (
              <div
                key={item.id} 
                onClick={()=>{setImageIndex(item.id)}}
                className={`button ${imageIndex == item.id ? "active" : ""} `}
              ></div>
            );
          })}
        </div>
        <button onClick={()=>setImageIndex(prev => prev!== 0 ? prev-1: 0  )} className="left arrow"><FaArrowLeft/></button>
        <button onClick={()=>setImageIndex(prev => prev < ( allImages.length) ? prev+1 : allImages.length  )} className="right arrow"><FaArrowRight/></button>
      </div>
    </>
  );
}

export default App;

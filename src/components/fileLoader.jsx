export default function MediaLoader({media})  {
    console.log("yes..".media)
  
    return (
      <div className="overflow-x-auto mt-2" style={{ width: "100%" }}>
  
        {media.imageUrl.length !== 0 && (
          <div className="flex  h-[10vh] w-full overflow-x-auto">
            {media.imageUrl.length === 1 ? (
              <img
                src={media.imageUrl[0]}
                className="w-[4vw] h bg-[#B9B9B9] rounded-lg"
                alt="Uploaded Image"
              />
            ) : (
              media.imageUrl.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  className="w-[4vw]  bg-[#B9B9B9] rounded-lg mx-2"
                  alt={`Uploaded Image ${index + 1}`}
                />
              ))
            )}
          </div>
        )}
      </div>
    );
  };
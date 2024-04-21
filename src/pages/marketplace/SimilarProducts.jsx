import React from "react";
import propertyData from "../../json/propertyData";
import Property from "./Property";


function SimilarProducts() {
  const getRandomProperties = (array, count) => {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };
  const selectedProperties = getRandomProperties(propertyData, 3);

  return (
    <div className="">
      <h1 className="text-3xl font-black mb-[6.85vh] ">Similar Properties</h1>
      <div className="flex item-center justify-between gap-x-[1.927vw]">
        {selectedProperties.map((property) => (
          <div className="w-[30.94vw] ">
            <Property
              key={property.id}
              name={property.name}
              price={property.price}
              image={property.img}
              units={property.availableUnits}
              ownership={property.ownership}
              coOwners={property.coOwners}
              location={property.location}
              soldOut={property.soldOut}
              type={property.type}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SimilarProducts;

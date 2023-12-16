import React, {useState} from "react";
import Check from "./Check";
import Ingridents from "./Ingridents";
import Supplies from "./Supplies";
import Notes from "./Notes";

const Detail = ({ onSelect }) => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const components = {
    Ingridents: <Ingridents onSelect={onSelect} />,
    Supplies: <Supplies onSelect={onSelect} />,
    Notes: <Notes />
  };
  const handleChange = (e) => {
    const componentName = e.target.value;
    setSelectedComponent(components[componentName]);
  };

  return (
    <div>
      <div className="my-4" onChange={handleChange}>
        <Check label="Ingridents" name="group1" id="radio-1"/>
        <Check label="Supplies" name="group1" id="radio-2"/>

        <Check label="Notes" name="group1" id="radio-3"/>
        <Check label="None" name="group1" id="radio-4" />
      </div>
      {selectedComponent ? selectedComponent : ""}
    </div>
  );
};

export default Detail;

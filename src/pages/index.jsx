import { useState, useEffect } from "react";
import clientPromise, { jsonify } from "@/modules/db";

import { Accordion } from "@/ui/accordion";
import { ColorSelect } from "@/ui/color-select";
import { ModelSelect } from "@/ui/model-select";
import { MakeSelect } from "@/ui/make-select";

const colors = ["white", "black", "beige", "red", "blue", "green", "grey"];

export default function Homepage({ makes = [], models = [] }) {
  const [selectedColor, setSelectedColor] = useState(undefined);
  const [selectedMake, setSelectedMake] = useState(undefined);
  const [selectedModel, setSelectedModel] = useState(undefined);
  const [results, setResults] = useState([]);

  useEffect(async () => {
    const response = await fetch("/api/cars", {
      method: "POSt",
      body: JSON.stringify({
        color: selectedColor,
        make: selectedMake?._id,
        model: selectedModel?._id,
      }),
    });
    const json = await response.json();
    setResults(json);
  }, [selectedColor, selectedMake, selectedModel]);

  const accordionSections = [
    {
      title: "Color",
      Component: (
        <ColorSelect
          colors={colors}
          value={selectedColor}
          onChange={(color) => setSelectedColor(color)}
        />
      ),
    },
    {
      title: "Make/Model",
      Component: (
        <>
          <div>
            <MakeSelect
              makes={makes}
              value={selectedMake}
              onChange={(make) => {
                setSelectedMake(make);
                setSelectedModel(undefined);
              }}
            />
          </div>
          <div>
            <ModelSelect
              models={models.filter(
                (model) => model.make === selectedMake?._id
              )}
              value={selectedModel}
              onChange={(model) => setSelectedModel(model)}
            />
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="mt-16 container mx-auto">
      <div className="flex items-start gap-8">
        <div>
          <h2>Filters</h2>
          <Accordion sections={accordionSections} />
          year condition price range location
        </div>

        <div>
          <h3>Results</h3>

          <div>
            <h3>selected filters</h3>
            <div>color: {selectedColor}</div>
            <div>
              make/model: {selectedMake?.name}/{selectedModel?.name}
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Make</th>
                <th>Model</th>
                <th>Year</th>
                <th>Color</th>
                <th>Condition</th>
                <th>Price Range</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr>
                  <td>{result.make}</td>
                  <td>{result.model}</td>
                  <td>{result.color}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const makes = await (await clientPromise)
    .db()
    .collection("makes")
    .find({})
    .toArray();

  const models = await (await clientPromise)
    .db()
    .collection("models")
    .find({})
    .toArray();

  return {
    props: {
      makes: jsonify(makes),
      models: jsonify(models),
    },
  };
}

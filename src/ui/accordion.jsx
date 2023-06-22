import { useState } from "react";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

export const Accordion = ({ sections = [] }) => {
  const [activeSection, setActiveSection] = useState(0);

  return (
    <div className="space-y-2">
      {sections.map((section, index) => (
        <div key={index} className="border rounded p-2">
          <button
            className="flex items-center justify-between w-full focus:outline-none"
            onClick={() => setActiveSection(index)}
          >
            <span className="text-lg font-medium">{section.title}</span>
            {activeSection === index ? (
              <ChevronDownIcon className="w-5 h-5" />
            ) : (
              <ChevronRightIcon className="w-5 h-5" />
            )}
          </button>
          {activeSection === index && (
            <div className="mt-2">{section.Component}</div>
          )}
        </div>
      ))}
    </div>
  );
};

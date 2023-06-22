export const ColorSelect = ({
  colors = ["white", "black", "beige", "red", "blue", "green", "grey"],
  value,
  onChange = () => {},
}) => {
  return (
    <div>
      <h2>Select Color:</h2>
      <div className=" grid grid-cols-4 gap-2">
        {colors.map((color, index) => (
          <div
            key={index}
            className={` border-black h-6 w-6 rounded cursor-pointer ${
              color === value ? "border-blue-500 border-2" : "border"
            }`}
            style={{ backgroundColor: color }}
            onClick={() => onChange(color)}
          ></div>
        ))}
      </div>
    </div>
  );
};

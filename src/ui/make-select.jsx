export const MakeSelect = ({ value, onChange = () => {}, makes }) => {
  return (
    <select
      value={value}
      onChange={(e) => {
        if (!Boolean(e.target.value)) return;
        onChange(makes.find((make) => make.name === e.target.value));
      }}
    >
      <option value="">Select make</option>
      {makes.map((make, index) => (
        <option key={index} value={make.name}>
          {make.name}
        </option>
      ))}
    </select>
  );
};

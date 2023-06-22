export const ModelSelect = ({ value, onChange = () => {}, models }) => {
  return (
    <select
      value={value?.name}
      onChange={(e) => {
        if (!Boolean(e.target.value)) return;
        onChange(models.find((model) => model.name === e.target.value));
      }}
    >
      <option value="">Select model</option>
      {models.map((model, index) => (
        <option key={index} value={model.name}>
          {model.name}
        </option>
      ))}
    </select>
  );
};

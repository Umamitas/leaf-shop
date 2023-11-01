import { formInputLabel, Group, Input } from "./Form-inputs.styles.jsx";

const FormInputs = ({ label, inputOptions }) => {
  return (
    <Group>
      <Input {...inputOptions} />
      {label && (
        <formInputLabel shrink={inputOptions.value.length}>{label}</formInputLabel>
      )}
    </Group>
  );
};

export default FormInputs;

type Props = {
  label?: string;
  error?: string;
  inputProps: any;
};

const TextField: React.FC<Props> = ({ label, error, inputProps }) => {
  const isError = error && error.length;

  return (
    <div>
      {label && <label>{label}</label>}
      <input {...inputProps} />

      {isError && (
        <p data-testid={`textfield-${inputProps.name}-error`}>{error}</p>
      )}
    </div>
  );
};

export default TextField;

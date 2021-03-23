type Props = {
  error: string;
  isLoading: boolean;
};

const FormStatus: React.FC<Props> = ({ error, isLoading }) => {
  return (
    <div data-testid="form-status">
      {isLoading && <div>loading...</div>}
      {error && <div>errorMessage</div>}
    </div>
  );
};

export default FormStatus;

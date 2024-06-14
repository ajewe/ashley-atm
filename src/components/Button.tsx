type ButtonProps = {
  disabled?: boolean;
  displayText: string;
  handleClick: () => void;
  isDestructive?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  disabled = false,
  displayText,
  handleClick,
  isDestructive = false,
}) => {
  // TODO : hover styles
  return (
    <button
      className={`flex-grow ${
        isDestructive ? 'bg-red-200' : 'bg-green-200'
      } p-4 rounded ${disabled ? 'disabled cursor-not-allowed' : ''}`}
      type='button'
      onClick={handleClick}
    >
      {displayText}
    </button>
  );
};

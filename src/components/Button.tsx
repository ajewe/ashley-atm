type ButtonProps = {
  displayText: string;
  handleClick: () => void;
  isDestructive?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  displayText,
  handleClick,
  isDestructive = false,
}) => {
  // TODO : hover styles
  return (
    <button
      className={`flex-grow ${
        isDestructive ? 'bg-red-200' : 'bg-green-200'
      } p-4 rounded`}
      onClick={handleClick}
    >
      {displayText}
    </button>
  );
};

type ButtonProps = {
  children: React.ReactElement | string;
  disabled?: boolean;
  handleClick: () => void;
  isDestructive?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  disabled = false,
  handleClick,
  isDestructive = false,
}) => {
  return (
    <button
      className={`flex-grow font-bold p-4 rounded-full tracking-widest disabled:opacity-50 disabled:cursor-not-allowed ${
        isDestructive
          ? 'bg-rose-400 enabled:hover:bg-rose-700 enabled:hover:text-white'
          : 'bg-emerald-400 enabled:hover:bg-emerald-700 enabled:hover:text-white'
      } `}
      disabled={disabled}
      type='button'
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

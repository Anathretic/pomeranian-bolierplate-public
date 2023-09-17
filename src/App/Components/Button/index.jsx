import './style.css';

// variant value (only text) - primary, secondary, tertiary

export const Button = ({
  children,
  onClick,
  variant = 'primary',
  ...otherProps
}) => {
  return (
    <button
      className={`main-button main-button-${variant}`}
      onClick={onClick}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export const OptionButton = ({ isSelected, onClick, children }) => (
  <Button variant={isSelected ? 'primary' : 'secondary'} onClick={onClick}>
    {children}
  </Button>
);

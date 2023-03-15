import Button from 'react-bootstrap/Button';

function CustomButton(props) {
  return (
    <Button
      type="submit"
      className={props.className}
      onClick={props.onClick}
    >
      {props.label}
    </Button>
  );
}

export default CustomButton;
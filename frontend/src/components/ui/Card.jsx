import PropTypes from "prop-types";

function Card({ children, className}) {
  return (
    <div className={`w-full h-fit px-5 py-3 rounded-md ${className}`}>
        {children}
    </div>
  )
}

export default Card

Card.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
}
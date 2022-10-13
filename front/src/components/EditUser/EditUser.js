import { createPortal } from "react-dom";
import { EditUserModal } from "./EditUserModal";

const portal = document.getElementById("portal");

const Portal = ({ children }) => {
  return createPortal(children, portal);
};

export default Portal;

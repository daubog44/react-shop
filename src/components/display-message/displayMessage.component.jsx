import { useState, useEffect } from "react";
import { Message, errorTheme, successTheme } from "./displeyMessage.styles";

const DisplayMessage = function ({ type, message, closable = false }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => {
      setVisible(false);
    }, 2000);
    return () => clearTimeout(id);
  }, []);

  return (
    <>
      <Message
        theme={type === "error" ? errorTheme : successTheme}
        visible={visible}
      >
        {message}
        {/* {closable && <ClosePopup visible={visible}>X</ClosePopup>}*/}
      </Message>
    </>
  );
};

export default DisplayMessage;

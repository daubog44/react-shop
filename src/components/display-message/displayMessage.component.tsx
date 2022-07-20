import { useState, useEffect, FC } from "react";
import { Message, errorTheme, successTheme } from "./displeyMessage.styles";

type displeyMessageProps = {
  message: string;
  type: "success" | "error";
};

const DisplayMessage: FC<displeyMessageProps> = function ({ type, message }) {
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

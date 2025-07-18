import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
export default function ScrollDialog({ openflag, setOpenflag, data }) {
  ScrollDialog.propTypes = {
    openflag: PropTypes.bool,
    setOpenflag: PropTypes.any,
    data: PropTypes.object,
  };
  console.log(data);
  const [open, setOpen] = React.useState(openflag);
  const [scroll, setScroll] = React.useState("paper");

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenflag(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  console.log(Object.keys(data));

  React.useEffect(() => {}, [data]);

  return (
    <div>
      {/* <Button onClick={handleClickOpen("paper")}>scroll=paper</Button>
      <Button onClick={handleClickOpen("body")}>scroll=body</Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Data</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {/* {JSON.stringify(data)} */}
            {Object.keys(data).map((heading) => {
              <p>
                {/* <b>{heading}</b> : {data[heading]} */}
                Hello
              </p>;
            })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {/* <Button onClick={handleClose}>Subscribe</Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}

import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import "./Date.css";
import Date from "./Date";
import { useState } from "react";
import axios from "axios";

type DialogProps = {
  resourceId: number,
}

export default function FormDialog(props: DialogProps) {
  const [open, setOpen] = React.useState(false);
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [inputValue, setInputValue] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleBook = (e: any) => {
    e.preventDefault();
    const bookData = {
      dateFrom: dateFrom,
      dateTo: dateTo,
      bookedQuantity: inputValue,
    };

    axios
      .post(
        `https://localhost:44370/api/resources/${props.resourceId}/bookings`,
        bookData
      )
      .then((response: any) => {
        alert("Booked Successfully");

        console.log(
          `EMAIL SENT TO admin@admin.com FOR CREATED BOOKING WITH ID ${response.data.id}`
        );
        setOpen(false);
      })
      .catch(() => {
        alert("Error while Booking");
      });
  };

  const handleDateChange = (id: string, date: any) => {
    if (id === "from") {
      setDateFrom(date);
      console.log("From ", date);
    } else if (id === "to") {
      setDateTo(date);
      console.log("To ", date);
    }
  };

  return (
    <>
      <React.Fragment>
        <Button onClick={handleClickOpen} className="customButton">
          {/* {res.map((ros)=>(
      <div key={ros.id}>
      </div> 
    ))}  */}
          Book here
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries((formData as any).entries());
              const email = formJson.email;
              console.log(email);
              handleClose();
            },
          }}
        >
      
          <DialogTitle>Resources</DialogTitle>
          <DialogContent className="customDialogContent">
            <div className="customDatePicker">
              <h3 className="col-25">Date From :</h3>
              <Date id="from" onChange={handleDateChange} />
              <h3 className="col-24">Date To :</h3>
              <Date id="to" onChange={handleDateChange} />
              <h3 className="col-23">Quantity :</h3>
              <TextField
                label="Number"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(+e.target.value)}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleBook}>Book</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </>
  );
}

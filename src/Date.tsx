import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

type DateTypes={
  id:string
  onChange:any
}
export default function Date(props :DateTypes) {

  const handleDateChange = (date: any) => {
    if (props.onChange) {
      props.onChange(props.id, date?.format('YYYY-MM-DD'));
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker onChange={handleDateChange} />
    </LocalizationProvider>
  );
}
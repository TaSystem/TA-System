import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider, DatePicker, KeyboardDatePicker } from "material-ui-thai-datepickers";
import DateFnsUtils from '@date-io/date-fns';
import LuxonUtils from '@date-io/luxon';
import 'moment/locale/th';
import th from 'date-fns/locale/th'
import React from 'react';

class LocalizedUtils extends DateFnsUtils {
    getMonthText(month){
        return this.format(month, 'MM', { locale: th})
    }
}

function DatePickers(props) {
    // const [check, setCheck] = React.useState(new Date())
  return (
      <>
    <MuiPickersUtilsProvider utils={LocalizedUtils} locale={th}>
    <DatePicker
        // label="with B.E. yearOffset"
        // eiei
        format="dd/MM/YYYY"
        pickerHeaderFormat="dd, MMMM"
        yearOffset={543}
        value={props.date}
        // onChange={(date) => setCheck(date)}
        onChange = {props.onChange}
      />
    </MuiPickersUtilsProvider>
    </>
    // 
  );
}

export default DatePickers;
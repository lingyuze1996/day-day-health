import { DateTimePicker } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterLuxon';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {
  Grid,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  FormControlLabel,
  FormGroup,
} from '@mui/material';
import { DateTime } from 'luxon';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import { formatLuxonDate } from '../utils/Formatter';

export function ModifyRecordDialog(props) {
  const [timestampValue, setTimestampValue] = useState(DateTime.now());
  const [bpLow, setBpLow] = useState(0);
  const [bpHigh, setBpHigh] = useState(0);
  const [bs, setBs] = useState(0);
  const [recordID, setRecordID] = useState('');

  const [bpSelected, setBpSelected] = useState(true);
  const [bsSelected, setBsSelected] = useState(true);

  const type = props.type;

  useEffect(() => {
    setTimestampValue(
      props.data.timestamp
        ? DateTime.fromJSDate(new Date(props.data.timestamp))
        : DateTime.now()
    );
    setBpHigh(props.data.bpHigh ?? 120);
    setBpLow(props.data.bpLow ?? 70);
    setBs(props.data.bs ?? 6.2);
    setRecordID(props.data.recordID ?? uuidv4());
  }, [props.data]);

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      open={props.dialogOpen}
      onClose={props.onClose}
    >
      <DialogTitle style={{ fontWeight: 600 }}>{`${
        type === 'create' ? '添加' : '修改'
      }记录`}</DialogTitle>
      <DialogContent dividers>
        <Grid container>
          <Grid item xs={12} sm={12} md={12}>
            <LocalizationProvider dateAdapter={DateAdapter}>
              <DateTimePicker
                label="Record Datetime"
                value={timestampValue}
                onChange={setTimestampValue}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>

            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={bpSelected}
                    onChange={(e) => setBpSelected(e.target.checked)}
                  />
                }
                label="添加血压"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={bsSelected}
                    onChange={(e) => setBsSelected(e.target.checked)}
                  />
                }
                label="添加血糖"
              />
            </FormGroup>
          </Grid>

          {bpSelected ? (
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                style={{ marginTop: '25px' }}
                size="small"
                label="收缩压 (mmHg)"
                value={bpHigh}
                onChange={(e) => setBpHigh(+e.target.value)}
                type="number"
              />
            </Grid>
          ) : (
            ''
          )}

          {bpSelected ? (
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                style={{ marginTop: '25px' }}
                size="small"
                label="舒张压 (mmHg)"
                value={bpLow}
                onChange={(e) => setBpLow(+e.target.value)}
                type="number"
              />
            </Grid>
          ) : (
            ''
          )}

          {bsSelected ? (
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                style={{ marginTop: '25px' }}
                size="small"
                label="血糖 (mmol/L)"
                value={bs}
                inputProps={{
                  pattern: '[0-9]{1,2}[.]?[0-9]?',
                }}
                onChange={(e) => setBs(e.target.value)}
              />
            </Grid>
          ) : (
            ''
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            props.onClose();
          }}
        >
          取消
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            const timestamp = formatLuxonDate(timestampValue);
            if (bsSelected && bpSelected) {
              if (isNaN(bs)) {
                alert('血糖值输入错误，请重试！');
                return;
              }
              props.onSave({ recordID, timestamp, bpHigh, bpLow, bs: +bs });
            } else if (bpSelected) {
              props.onSave({ recordID, timestamp, bpHigh, bpLow });
            } else if (bsSelected) {
              if (isNaN(bs)) {
                alert('血糖值输入错误，请重试！');
                return;
              }
              props.onSave({ recordID, timestamp, bs: +bs });
            } else {
            }
            props.onClose();
          }}
        >
          确定
        </Button>
      </DialogActions>
    </Dialog>
  );
}

import { DateTimePicker } from '@mui/lab'
import DateAdapter from '@mui/lab/AdapterLuxon'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { Grid, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import { DateTime } from 'luxon'
import { useState } from 'react'

export function ModifyRecordDialog(props) {
    const [timestampValue, setTimestampValue] = useState(DateTime.now())
    const [bpLow, setBpLow] = useState(70)
    const [bpHigh, setBpHigh] = useState(120)
    const [bs, setBs] = useState(6.2)

    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
            maxWidth="xs"
            open={props.dialogOpen}
            onClose={props.onClose}>
            <DialogTitle style={{ fontWeight: 600 }}>添加记录</DialogTitle>
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
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                        <TextField style={{ marginTop: "25px" }}
                            size="small"
                            label="舒张压 (mmHg)"
                            value={bpHigh}
                            onChange={(e) => setBpHigh(+ e.target.value)}
                            type="number"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                        <TextField style={{ marginTop: "25px" }}
                            size="small"
                            label="收缩压 (mmHg)"
                            value={bpLow}
                            onChange={(e) => setBpLow(+ e.target.value)}
                            type="number"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                        <TextField style={{ marginTop: "25px" }}
                            size="small"
                            label="血糖 (mmol/L)"
                            value={bs}
                            inputProps={{
                                step: "0.1"
                              }}
                            onChange={(e) => setBs(+ e.target.value)}
                            type="number"
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    color="error"
                    onClick={() => { props.onClose() }}>
                    取消
                </Button>
                <Button
                    variant="contained"
                    color="success"
                    onClick={() => { 
                        props.onSave(timestampValue, bpHigh, bpLow, bs)
                        props.onClose()
                    }}>
                    确定
                </Button>
            </DialogActions>
        </Dialog>
    )
}
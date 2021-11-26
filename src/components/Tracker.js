import { Container, Grid, Box, Button, FormControlLabel, Checkbox, FormGroup, CircularProgress } from "@mui/material";
import { useState } from "react";
import { addRecord, deleteRecord, getRecords } from "../apis/ServiceAPI";
import { formatLuxonDate } from "../utils/Formatter";
import { RecordTable } from "./DataTable";
import { ModifyRecordDialog } from "./ModifyRecord";

export default function Tracker() {
    const [records, setRecords] = useState([])
    const [dialogOpen, setDialogOpen] = useState(false)

    const [bpSelected, setBpSelected] = useState(false)
    const [bsSelected, setBsSelected] = useState(false)

    const [isLoading, setIsLoading] = useState(false)

    const token = localStorage.getItem("id_token")
    const handleAddRecord = async (datetime, bpHigh, bpLow, bs) => {
        const timestamp = formatLuxonDate(datetime)
        const newRecord = { timestamp, bpHigh, bpLow, bs }
        setIsLoading(true)
        await addRecord(newRecord, token)
        setRecords((prev) => (
            [
                ...prev,
                newRecord
            ]
        ))
        setIsLoading(false)
    }

    const handleDeleteRecord = async (index) => {
        setIsLoading(true)

        await deleteRecord(records[index]["recordID"], token)
        setRecords((preState) => {
            let newState = [...preState]
            newState.splice(index, 1)
            return newState
        })

        setIsLoading(false)
    }

    const handleLoadData = async () => {
        try {
            setIsLoading(true)
            setRecords(await getRecords(token))
            setIsLoading(false)
        } catch (e) {
            alert("数据加载异常，请稍后再试！")
            setIsLoading(false)
        }
    }

    return (
        <Container maxWidth="xl" >
            <Grid container>
                <Grid container>
                    <Grid item xs={6} sm={3} md={3}>
                        <h2>{`选择监测指标:`}</h2>
                    </Grid>
                    <Grid item xs={6} sm={4} md={5}>
                        <FormGroup row style={{ marginTop: "15px", padding: "0 5px" }}>
                            <FormControlLabel
                                control={<Checkbox checked={bpSelected} onChange={(e) => setBpSelected(e.target.checked)} />}
                                label={<b>血压</b>} />
                            <FormControlLabel
                                control={<Checkbox checked={bsSelected} onChange={(e) => setBsSelected(e.target.checked)} />}
                                label={<b>血糖</b>} />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={6} sm={3} md={2}>
                        <Button
                            style={{ marginTop: "15px" }}
                            variant="contained"
                            size="large"
                            color="primary"
                            onClick={handleLoadData}>
                            加载历史数据
                        </Button>
                    </Grid>
                    <Grid item xs={6} sm={2} md={2}>
                        <Button
                            style={{ marginTop: "15px" }}
                            variant="contained"
                            size="large"
                            color="primary"
                            onClick={() => { setDialogOpen(true) }}>
                            添加数据
                        </Button>
                    </Grid>
                </Grid>
            </Grid>

            {
                !isLoading ?
                    <Grid container style={{ marginTop: "20px" }}>
                        <Grid item xs={12} md={6}>
                            {
                                bsSelected || bpSelected ?
                                    <RecordTable deleteRecord={handleDeleteRecord} records={records} bsSelected={bsSelected} bpSelected={bpSelected} />
                                    : ""
                            }
                        </Grid>
                        <Grid item xs={12} md={6} justifyContent="flex-end">

                        </Grid>
                    </Grid>
                    :
                    <Box sx={{ minHeight: "60vh", display: "flex", justifyContent: "center" }}>
                        <CircularProgress size={60} sx={{ padding: "60px" }} />
                    </Box>
            }

            <ModifyRecordDialog dialogOpen={dialogOpen} onSave={handleAddRecord} onClose={() => setDialogOpen(false)} />
        </Container >
    )
}
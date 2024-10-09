import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell
} from '@mui/material'


export default function AdminContact() {

    const dispatch = useDispatch()

    const contactData = useSelector((store) => store.contactData)

    useEffect(() => {
        dispatch({ type: 'SAGA/FETCH_CONTACT_DATA' })
    }, [])

    return (
        <>
            <h1>User Contact Details</h1>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableCell>Name</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Details</TableCell>
                        <TableCell>Resolve</TableCell>
                    </TableHead>
                    <TableBody>
                        {contactData && contactData.length>0 &&
                            contactData.map((item) => {
                                <TableRow key={item.id}>
                                    <TableCell>{item.user_id}</TableCell>
                                    <TableCell>{item.inserted_at}</TableCell>
                                    <TableCell>{item.details}</TableCell>
                                    <TableCell>{item.resolved}</TableCell>
                                </TableRow>
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
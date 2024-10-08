import React, { useEffect, useState } from 'react'
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const [data, setData] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        axios.get("http://localhost:3050/employes")
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }, [])

    const handleDelete = (id) => {
        const confirm = window.confirm("Do u like to delete?")
        if (confirm) {
            axios.delete("http://localhost:3050/employes/" + id)
                .then(res => {
                    alert("Deleted successfully")
                    navigate('/')
                
                })
        }
    }

    return (
        <Box sx={{ margin: 10, width: '50%' }}>
            <Typography variant='h5' component='h2' textAlign='center' fontWeight='bold' sx={{ mb: 5 }}>
                List of Employes
            </Typography>
            <Link to='/create'>
                <Button variant='contained' color='success' sx={{ mb: 2 }}>Create +</Button></Link>
            <TableContainer component={Paper} elevation={5} >
                <Table aria-label='simple table' sx={{ minWidth: 360 }} >
                    <TableHead>
                        <TableRow >
                            <TableCell>ID</TableCell>
                            <TableCell>NAME</TableCell>
                            <TableCell>EMAIL</TableCell>
                            <TableCell>PHONE</TableCell>
                            <TableCell>ACTIONS</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            data.map((user, index) => (
                                <TableRow key={index}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                    <TableCell>
                                        <Link to={`/update/${user.id}`}><Button variant='contained' color='primary' sx={{ mr: 2 }} size='small'>Update</Button></Link>
                                        <Button variant='contained' color='error' size='small' onClick={e => handleDelete(user.id)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>

    )

}

export default Home

import React, { useEffect, useState } from 'react'
import { Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from "@mui/material";
import axios from "axios";
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

const Home = () => {
    const [data, setData] = useState([])
    //const navigate = useNavigate()

    const [filterData, setFilterData] = useState([])
    const [query, setQuery] = useState('')

    const columns = [
        { 'id': 'id', name: 'ID' },
        { 'id': 'name', name: 'NAME' },
        { 'id': 'email', name: 'EMAIL' },
        { 'id': 'phone', name: 'PHONE' },
        { 'id': 'actions', name: 'ACTIONS' }
    ]

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerChange = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }


    useEffect(() => {
        axios.get("http://localhost:3050/employes")
            .then(res => {
                setData(res.data)
                setFilterData(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const handleDelete = (id) => {
        const confirm = window.confirm("Do u like to delete?")
        if (confirm) {
            axios.delete("http://localhost:3050/employes/" + id)
                .then(res => {
                    setData(data.filter((post) => post.id !== id))
                    alert("Deleted successfully")
                    //navigate('/')

                })
        }
    }

    const handleSearch = (e) => {
        const getSearch = e.target.value
        setQuery(getSearch)
        //console.log(getSearch);
        if (getSearch.length > 0) {
            const SearchData = data.filter((item) => item.name.toLowerCase().includes(getSearch))
            setData(SearchData)
        } else {
            setData(filterData)
        }
        setQuery(getSearch)
    }

    return (
        <Box sx={{ margin: 10, width: '50%' }}>
            <Typography variant='h5' component='h2' textAlign='center' fontWeight='bold' sx={{ mb: 5 }}>
                List of Employees
            </Typography>
            <Link to='/create'>
                <Button variant='contained' color='success' sx={{ mb: 2, mr: '320px' }}>Create +</Button>
            </Link>
            <IconButton>
                <SearchIcon sx={{ position: 'relative', left: '220px', bottom: '8px' }} />
                <TextField label='search...' size='small' variant='outlined' sx={{ mb: 2 }} value={query} onChange={(e) => handleSearch(e)} />
            </IconButton>
            <TableContainer component={Paper} elevation={5} sx={{ width: '90%', overflow: 'hidden' }}>
                <Table aria-label='simple table' sx={{ minWidth: 360 }} >
                    <TableHead>
                        <TableRow >
                            {columns.map((column) => (
                                <TableCell key={column.id} sx={{ backgroundColor: 'blue', color: 'white' }}>{column.name}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => (
                            <TableRow key={index}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.phone}</TableCell>
                                <TableCell>
                                    <Link to={`/update/${user.id}`}>
                                        <Button variant='contained' color='primary' sx={{ mr: 2 }} size='small'>Update</Button>
                                    </Link>
                                    <Button variant='contained' color='error' size='small' onClick={e => handleDelete(user.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))
                        }
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component='div'
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerChange}>

                </TablePagination>
            </TableContainer>
        </Box>

    )

}

export default Home

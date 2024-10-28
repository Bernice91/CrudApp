import React, { useEffect, useState } from 'react'
import { Box, Button, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

const Home = () => {
    const [data, setData] = useState([])
    //sorting
    const [order, setOrder] = useState('asc')
    const [orderBy, setOrderBy] = useState('id')

    //searching
    const [filterData, setFilterData] = useState([])
    const [query, setQuery] = useState('')

    //pagination
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerChange = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }
    //sorting the algorithm
    const descendingComparator = (a, b, orderBy) => {
        if (b[orderBy] < a[orderBy]) {
            return -1
        }
        if (b[orderBy] > a[orderBy]) {
            return 1
        }
        return 0
    }


    const getComparator = (order, orderBy) => {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy) 
            : (a, b) => -descendingComparator(a, b, orderBy)
    }

    const handleRequestSort=(property)=>{
        const isAsc = orderBy === property && order === 'asc';
          setOrder(isAsc ? 'desc' : 'asc');
          setOrderBy(property);
    }

    const sortedRows = [...data].sort(getComparator(order, orderBy));


    useEffect(() => {
        axios.get("http://localhost:3050/employes")
            .then(res => {
                setData(res.data)
                setFilterData(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    //deleting the data
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
    //searching the data
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
                <Button variant='contained' color='success' sx={{ mb: 2, mr: '340px' }}>Create +</Button>
            </Link>
            <TextField
                placeholder='search...'
                size='small'
                variant='outlined'
                sx={{ mb: 2 }}
                value={query}
                onChange={(e) => handleSearch(e)}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment>
                                <SearchIcon />
                            </InputAdornment>
                        )
                    }
                }} />

            <TableContainer component={Paper} elevation={5} sx={{ width: '90%', overflow: 'hidden' }}>
                <Table aria-label='simple table' sx={{ minWidth: 360 }} >
                    <TableHead>
                        <TableRow >
                            <TableCell>
                                <TableSortLabel active={orderBy === 'id'}
                                    direction={orderBy === 'id' ? order : 'asc'} onClick={()=>handleRequestSort('id')}>
                                    ID
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel active={orderBy === 'name'}
                                    direction={orderBy === 'name' ? order : 'asc'} onClick={()=>handleRequestSort('name')}>
                                    NAME
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel active={orderBy === 'email'}
                                    direction={orderBy === 'email' ? order : 'asc'} onClick={()=>handleRequestSort('email')}>
                                    EMAIL
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel active={orderBy === 'phone'}
                                    direction={orderBy === 'phone' ? order : 'asc'} onClick={()=>handleRequestSort('phone')}>
                                    PHONE
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                ACTIONS
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => (
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

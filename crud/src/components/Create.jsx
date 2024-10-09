import React, { useState } from 'react'
import { Box, TextField, Button, styled, Typography } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Component = styled(Box)({
    padding: '30px',
    marginTop: '50px',
    border: '1px solid white',
    boxShadow: '0 0 20px 0',
    width: '100',
    height: '100'
})

const Create = () => {
    const [input, setInput] = useState({ name: '', email: '', phone: '' })
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3050/employes', input)
            .then(res => {
                console.log(res.data)
                alert('Data posted successfully')
                navigate('/')
            }

            )
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant='h5' component='h2' textAlign='center' marginTop='50px' fontWeight='bold'>Add Employes</Typography>
            <Component>
                <Box sx={{ mb: 2, mt: 5 }}>
                    <TextField
                        variant='outlined'
                        label='Enter the name'
                        id='name'
                        name='name'
                        size='small'
                        value={input.name}
                        onChange={(e) => setInput({ ...input, name: e.target.value })}
                        fullWidth />
                </Box>
                <Box sx={{ mb: 2 }}>
                    <TextField
                        variant='outlined'
                        label='Enter the email'
                        id='email'
                        name='email'
                        size='small'
                        value={input.email}
                        onChange={(e) => setInput({ ...input, email: e.target.value })}
                        fullWidth />
                </Box>
                <Box sx={{ mb: 2 }}>
                    <TextField
                        variant='outlined'
                        label='Enter the phone'
                        id='phone'
                        name='phone'
                        size='small'
                        value={input.phone}
                        onChange={(e) => setInput({ ...input, phone: e.target.value })}
                        fullWidth />
                </Box>
                <Box textAlign='center' mb={2}>
                    <Button variant='contained' color='primary' size='small' onClick={handleSubmit}>Submit</Button>
                </Box>
            </Component>
        </Box>
    )
}

export default Create

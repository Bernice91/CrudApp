import React, { useState, useEffect } from 'react'
import { Box, TextField, Button, styled, Typography } from '@mui/material'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const Component = styled(Box)({
  padding: '30px',
  marginTop: '50px',
  border: '1px solid white',
  boxShadow: '0 0 20px 0',
  width: '100',
  height: '100'
})

const Update = () => {
  const [data, setData] = useState({ name: '', email: '', phone: '' })
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    axios.get("http://localhost:3050/employes/" + id)
      .then(res => setData(res.data))
      .catch(err => console.log(err))
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.put('http://localhost:3050/employes/' + id, data)
      .then(res => {
        console.log(res)
        alert('Data updated successfully')
        navigate('/')
      }

      )
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant='h5' component='h2' textAlign='center' marginTop='50px' fontWeight='bold'>Update Employes</Typography>
      <Component>
        <Box sx={{ mb: 2, mt: 5 }}>
          <TextField
            variant='outlined'
            id='name'
            name='name'
            size='small'
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            fullWidth />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            variant='outlined'
            id='email'
            name='email'
            size='small'
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            fullWidth />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            variant='outlined'
            id='phone'
            name='phone'
            size='small'
            value={data.phone}
            onChange={(e) => setData({ ...data, phone: e.target.value })}
            fullWidth />
        </Box>
        <Box textAlign='center' mb={2}>
          <Button variant='contained' color='primary' size='small' onClick={handleSubmit}>Update</Button>

        </Box>
      </Component>
    </Box>
  )
}

export default Update

import {
  Grid,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { fetchUsers } from '../dbcandidates/dcandidateSlice'
import DCandidateForm from './dcandidateForm'

const DCandidates = (props: any) => {
  const dispatch = useDispatch()
  const userList = useSelector((state: any) => state.dcandidate.userList)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  return (
    <div>
      <Paper>
        <Grid container>
          <Grid item xs={6}>
            <DCandidateForm />
          </Grid>
          <Grid item xs={6}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Mobile</TableCell>
                    <TableCell>Blood GRoup</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userList.status !== 'loading' &&
                    userList.data.length &&
                    userList.data.map((player: any, index:number) => (
                      <TableRow key={index}>
                        <TableCell>{player.fullName}</TableCell>
                        <TableCell>{player.mobile}</TableCell>
                        <TableCell>{player.bloodGroup}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Paper>

      {/* <button
        onClick={() => {
          dispatch(fetchUsers())
        }}
      >
        Fetch Team players
      </button> */}
    </div>
  )
}

export default DCandidates

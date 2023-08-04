import React, { useState } from 'react'
import { Autocomplete, Pagination, TextField, Typography } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

const optionsPerPage = ['10', '25', '100', '200']

interface IProps {
  onChagePage?: any
  onChangeRowsPerPage?: any
  quantity: number
}

export function PPagination(props: IProps) {
  const [rowsPerPage, setRowsPerPage] = useState(100)
  const [curPage, setCurPage] = useState(1)
  const [numPage, setNumPage] = useState(
    Math.ceil(props.quantity / 100),
  )

  //--------------------------------------------------//
  //--------------------------------------------------//
  ///// Table /////
  const handleChangeRowsPerPage = (event: any, value: string | null) => {
    setRowsPerPage(Number(value))
    setNumPage(Math.ceil(props.quantity / Number(value)))

    setCurPage(1)
    props.onChangeRowsPerPage(Number(value))
  }

  const handleChangePage = (e: React.ChangeEvent<unknown>, value: number) => {
    setCurPage(value)
    props.onChagePage(value)
  }

  //--------------------------------------------------//
  //--------------------------------------------------//
  return (
    <div className="dis-flex flex-row flex-r-m">
      <Typography variant="body1"> แสดง </Typography>
      <Autocomplete
        sx={{ px: 1, color: 'red' }}
        options={optionsPerPage}
        value={rowsPerPage.toString()}
        disableClearable
        size="small"
        renderInput={(params) => (
          <TextField {...params} color="primary" focused label="" />
        )}
        popupIcon={<ArrowDropDownIcon />}
        onChange={handleChangeRowsPerPage}
      />
      <Typography variant="body1"> รายการ </Typography>
      <Pagination
        color="primary"
        defaultPage={1}
        siblingCount={0}
        onChange={handleChangePage}
        count={numPage}
        page={curPage}
      />
    </div>
  )
}

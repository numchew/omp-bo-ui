import React, { useState } from 'react'
import { Autocomplete, Pagination, TextField, Typography } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { RowsPerPage } from '../../Libs/Constants/size';

const optionsPerPage = ['10', '25', '100', '200']

interface IProps {
  onChagePage?: any
  onChangeRowsPerPage?: any
  quantity: number
}

export function PPagination(props: IProps) {
  const [rowsPerPage, setRowsPerPage] = useState(RowsPerPage);
  const [numPage, setNumPage] = useState(1);
  const [curPage, setCurPage] = useState(1);

  React.useEffect(() => {
    setNumPage(Math.ceil(props.quantity / rowsPerPage));
    setCurPage(1);
  }, [props.quantity, rowsPerPage])
  //--------------------------------------------------//
  //--------------------------------------------------//
  ///// Table /////
  const handleChangeRowsPerPage = (event: any, value: string | null) => {
    setRowsPerPage(Number(value))
    setNumPage(Math.ceil(props.quantity / Number(value)))

    //setCurPage(1)
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
        defaultPage={curPage} siblingCount={1} //boundaryCount={1}
        onChange={handleChangePage}
        count={numPage}
        page={curPage}
      />
    </div>
  )
}

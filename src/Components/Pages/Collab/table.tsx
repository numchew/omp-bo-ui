import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import {
  Button,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography
} from "@mui/material";

import HTable, { IHeadTabel } from '../../Layout/HTable';
import { OrderType, stableSort } from '../../../Libs/Extensions/Number.extension';
import Action from '../../../Libs/Redux/Actions/Action.action';
import { ICollab } from '../../../Libs/Models/ICollab.model';
import env from '../../../Libs/Services/env';
import { TypeIC } from '../../Common/TypeEvent';


const headerCells: IHeadTabel[] = [
  { id: "_id", label: "ID", align: "left", sort: true, width: 95 },
  { id: null, label: "THUMBNAIL", align: "left", sort: false, width: 50 }, //thumbnail(image)
  { id: "name", label: "NAME", align: "left", sort: true, width: 150 },
  { id: null, label: "GRAPHIC", align: "center", sort: false, width: 50 },
  { id: null, label: "PRODUCT", align: "center", sort: true, width: 300 },
  { id: "type", label: "TYPE", align: "center", sort: true, width: 100 },
  { id: "activate", label: "ACTIVATE", align: "center", sort: true, width: 50 },
  { id: null, label: "", align: "center", sort: false }, //column --> end
];

const maxWidth = 800

interface IProps {
  data: ICollab[];
  isCanSort: boolean;
  isCanView: boolean;
}

export const TableList = (props: IProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [orderType, setOrderType] = useState(OrderType.Asc);

  const [data, setData] = useState<ICollab[]>();

  React.useEffect(() => {
    setData(props.data);
  }, [props.data])
  //--------------------------------------------------//
  //--------------------------------------------------//
  const onClickView = (value: ICollab) => {
    dispatch(Action.getColorDetail(value));
    navigate(`/character/` + value._id);
  };

  const sortHandler = (id: keyof ICollab) => {
    if (orderType === OrderType.Asc) {
      setOrderType(OrderType.Desc);
      setData(stableSort(props.data, OrderType.Desc, id));
    } else {
      setOrderType(OrderType.Asc);
      setData(stableSort(props.data, OrderType.Asc, id));
    }
  }
  //--------------------------------------------------//
  //--------------------------------------------------//
  return (
    <TableContainer component={Paper} elevation={0}>
      <Table size="small" sx={{ minWidth: maxWidth }} aria-label="customized table">
        <HTable cells={headerCells} sortHandler={sortHandler} isCanSort={props.isCanSort} />
        <TableBody>
          {data && data.map((row: ICollab, index: number) => (
            <TableRow key={index}>
              <TableCell align="left">{row._id}</TableCell>
              <TableCell align="left">
                <Paper className='flex-c-m' elevation={1}>
                  <img src={`${env.APP_API_HOST}/${row.icon}`} alt="img" width={50} height={50} />
                </Paper>
              </TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="center">{row.thumbnail.length}</TableCell>

              <TableCell align="center">
                <TypeIC value="sticker" disabled={true} selected={row.sticker} size={50} />
                <TypeIC value="mug" disabled={true} selected={row.mug} size={50} />
                <TypeIC value="shirt" disabled={true} selected={row.shirt} size={50} />
                <TypeIC value="totebag" disabled={true} selected={row.totebag} size={50} />

              </TableCell>
              <TableCell align="left">{row.type.toUpperCase()}</TableCell>
              <TableCell align="left">
                <Checkbox checked={row.activate} />
              </TableCell>
              <TableCell align="left" colSpan={2}>
                {props.isCanView &&
                  <Button variant="contained" size="small" sx={{ px: 3 }} onClick={() => { onClickView(row); }}>
                    <Typography variant="body1">EDIT</Typography>
                  </Button>
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer >
  );

  //--------------------------------------------------//
  //--------------------------------------------------//
}

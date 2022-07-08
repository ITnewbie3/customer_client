import React from 'react';
import { Table, TableBody, TableCell, TableRow } from '@mui/material';
import { useParams } from "react-router-dom"
import axios from "axios"
import useAsync from '../customHook/useAsync';

async function getCustomer(id){
    const customer = await axios.get(`http://localhost:3001/customer/${id}`)
    return customer.data
}

const DetailCustomer = () => {
    const { id } = useParams();
    const [state] = useAsync(() => getCustomer(id),[id])
    const {loading, data:costom, error} = state;
    console.log(costom);
    if(loading) return <div>L O O ㄷ ㅣ ㅇ</div>
    if(error) return console.log(error)
    if(!costom) return null;
    return (
        <div>
            <h2> 고객 상세 정보</h2>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>고객명</TableCell>
                        <TableCell>{costom[0].name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>연락처</TableCell>
                        <TableCell>{costom.phone}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>생년월일</TableCell>
                        <TableCell>{costom.birth}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>성별</TableCell>
                        <TableCell>{costom.gender}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>주소</TableCell>
                        <TableCell>{costom.add1}</TableCell>
                    </TableRow>
                </TableBody>    
            </Table>         
        </div>
    );
};

export default DetailCustomer;
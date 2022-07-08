import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import useAsync from './customHook/useAsync';
import CreateCustomer from './components/CreateCustomer';
import CustomerList from './components/CustomerList';
import DetailCustomer from './components/DetailCustomer';
import Footer from './components/Footer';
import Header from './components/Header';
import { useState , useEffect } from "react";

async function getCustomer(){
const customers = await axios.get(`http://localhost:3001/customers`)
  return customers.data;
}

function App() {

  const [state, refetch] = useAsync(getCustomer,[])
  const { loading, data, error} = state;
  if(loading) return <div>로딩중......</div>
  if(error) return console.log(error)
  if(!data) return <div>로딩중입니다.</div>
  if(!state) return null;
  return ( 
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<CustomerList customers={data}/>}/>
        <Route path="/detailview/:id" element={<DetailCustomer/>} />
        <Route path="/write" element={<CreateCustomer/>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;

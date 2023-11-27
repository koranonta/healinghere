/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import './Clients.css'
// mui icon
import TextField from '@material-ui/core/TextField';

// Data Table by react data table components
import DataTable from 'react-data-table-component';

// Components
import Loading from '../../components/Loading'

// React router link
import { Link } from 'react-router-dom';

export default function Clients() {
    // useState
    const [filterText, setFilterText] = useState('');
    const [data, setData] = useState([]);
    const [pending, setPending] = React.useState(true);

    // Custome data table
    const tableHeaderstyle = {
        headCells: {
            style: {
                fontWeight: "bold",
                fontSize: "16px",
            },
        },
    }
    const columns = [
        {
            name: 'Id',
            selector: row => row.clientid,
            sortable: true,
            left: true
        },
        {
            name: 'Name',
            selector: row => row.clientname,
            sortable: true,
            left: true
        },
        {
            name: 'UserName',
            selector: row => row.username,
            sortable: true,
            left: true,
        },
        {
            name: 'Email',
            selector: row => row.emailaddress,
            sortable: true,
            left: true
        },
        // {
        //     name: 'Last active',
        //     selector: row => row.lastactive,
        //     sortable: true,
        // },
        // {
        //     name: 'Signup',
        //     selector: row => row.signup,
        //     sortable: true,
        // },
        {
            name: 'City',
            selector: row => row.city,
            sortable: true,
            left: true
        },
        {
            name: 'Region',
            selector: row => row.region,
            sortable: true,
            left: true
        },
        {
            name: 'Post code',
            selector: row => row.postcode,
            sortable: true,
            right: true
        },
        {
            name: 'Action',
            cell: row => <> <div className='row'> <div className='col-6'><Link to={'/session'} >Edit<i className="far fa-edit"></i></Link></div> <div className='col-6'><Link to={'/session'} >Del<i className="fas fa-trash-alt"></i></Link></div> </div> </>,
            center: true
        }
    ];

    // HandleFilter
    const handleFilterChange = (e) => {
        setFilterText(e.target.value);
    };
    const filteredData = data.filter(item =>
        item.clientname.toLowerCase().includes(filterText.toLowerCase()) ||
        item.username.toString().includes(filterText) ||
        item.emailaddress.toLowerCase().includes(filterText.toLowerCase())
    );

    // Handle Edit
    function handleEdit() {

    }

    // Call Services
    async function getDataClients() {
        try {
            const req = await fetch("https://healinghere.co.uk/app/clientinfo/backend/api/clients.php");
            const res = await req.json();
            setData(res.response.data);
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setPending(false);
        }, 3000);
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        getDataClients()
    }, []);
    return (
                <div className='row'>
                    <div className='col-12'>

                        <div className='scrollable-table'>
                            <DataTable
                                title={
                                    <>
                                        <div className='mt-2'>
                                            <h2>Clients <div>

                                            </div>
                                            </h2>
                                        </div>
                                    </>
                                }
                                customStyles={tableHeaderstyle}
                                columns={columns}
                                data={filteredData}
                                pagination
                                progressPending={pending}
                                progressComponent={<Loading />}
                                fixedHeader
                                selectableRowsHighlight
                                subHeader
                                subHeaderAlign="right"
                                subHeaderComponent={
                                    <>
                                        <div className="mb-4 mt-4">
                                            <TextField id="outlined-basic" label="Search..." variant="outlined" value={filterText} onChange={handleFilterChange} />
                                        </div>
                                    </>
                                }
                            />
                        </div>
                    </div>
                </div>
    )
}

import React from 'react';
import { Grid, Card } from '@material-ui/core';
import MUIDataTable from "mui-datatables";

import PageTitle from '../../components/PageTitle';
import Widget from '../../components/Widget';
import Table from '../dashboard/components/Table/Table';
import mock from '../dashboard/mock'; 

const datatableData = [
 ["Joe James", "Example Inc.", "Yonkers", "NY"],
 ["John Walsh", "Example Inc.", "Hartford", "CT"],
 ["Bob Herm", "Example Inc.", "Tampa", "FL"],
 ["James Houston", "Example Inc.", "Dallas", "TX"],
 ["Prabhakar Linwood", "Example Inc.", "Hartford", "CT"],
 ["Kaui Ignace", "Example Inc.", "Yonkers", "NY"],
 ["Esperanza Susanne", "Example Inc.", "Hartford", "CT"],
 ["Christian Birgitte", "Example Inc.", "Tampa", "FL"],
 ["Meral Elias", "Example Inc.", "Hartford", "CT"],
 ["Deep Pau", "Example Inc.", "Yonkers", "NY"],
 ["Sebastiana Hani", "Example Inc.", "Dallas", "TX"],
 ["Marciano Oihana", "Example Inc.", "Yonkers", "NY"],
 ["Brigid Ankur", "Example Inc.", "Dallas", "TX"],
 ["Anna Siranush", "Example Inc.", "Yonkers", "NY"],
 ["Avram Sylva", "Example Inc.", "Hartford", "CT"],
 ["Serafima Babatunde", "Example Inc.", "Tampa", "FL"],
 ["Gaston Festus", "Example Inc.", "Tampa", "FL"],
];

const Tables = props => (
  <React.Fragment>
    <Grid container spacing={32}>
      {/* <Grid item xs={12}>
        <MUIDataTable
          title="Employee List"
          data={datatableData}
          columns={["Name", "Company", "City", "State"]}
          options={{
            filterType: 'checkbox',
          }}
        />
      </Grid> */}
      <Grid item xs={12}>
        {/* <Widget title="Material-UI Table" upperTitle noBodyPadding> */}
        <Card >
          <div style={{padding:"25px 15px"}}>
          <Table data={mock.table} />
          </div>
        </Card>
      </Grid>
    </Grid>
  </React.Fragment>
);

export default Tables;
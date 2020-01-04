import React from 'react';
import { Grid, Card } from '@material-ui/core';
import MUIDataTable from "mui-datatables";

import PageTitle from '../../components/PageTitle';
import Widget from '../../components/Widget';
import Table from '../dashboard/components/Table/Table';



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
          <Table data={props.data} />
          </div>
        </Card>
      </Grid>
    </Grid>
  </React.Fragment>
);

export default Tables;
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';
import { FormValues } from './FormComponent'; 
import { useUsers } from './UsersContext';

interface DataRowModel {
  id: GridRowId;
  fullName: string;
  email: string;
  age: number;
  dateOfBirth: string | null;
  phoneNumber: string;
  address: string;
}

const columns: GridColDef[] = [
  { field: 'fullName', headerName: 'Full Name', width: 180 },
  { field: 'email', headerName: 'Email', width: 250 },
  { field: 'age', headerName: 'Age', width: 100 },
  { field: 'dateOfBirth', headerName: 'Date of Birth', width: 180 },
  { field: 'phoneNumber', headerName: 'Phone Number', width: 150 },
  { field: 'address', headerName: 'Address', width: 200 },
];

// interface GridData {
//   columns: GridColDef[];
//   rows: DataRowModel[];
// }

const mapUsersToRows =(users: FormValues[]): DataRowModel[]=> {
  return users.map((user, index) => ({
    id: index,
    fullName: user.fullName,
    email: user.email,
    age: user.age,
    dateOfBirth: user.dateOfBirth ,
    phoneNumber: user.phoneNumber,
    address: user.address,
  }));
}

export default function UserDataGrid() {
  const { users } = useUsers();
  console.log('Users in userDataGrid',users)
  const rows = mapUsersToRows(users);

  return (
    <div style={{ height: 400, width: '100%', marginTop: '20px' }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}

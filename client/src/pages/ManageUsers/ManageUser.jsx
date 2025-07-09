// client/src/pages/ManageUsers/ManageUser.jsx
import React, { useEffect, useState, useMemo } from 'react'; // Added useMemo
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ManageUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // State for Filters and Sort
  const [searchTerm, setSearchTerm] = useState('');
  const [filterUserType, setFilterUserType] = useState(''); // Stores selected user type for filtering
  const [sortConfig, setSortConfig] = useState({ key: 'firstName', direction: 'ascending' }); // Default sort

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');
      // Fetch all users; filtering, sorting, and searching will be done client-side for simplicity.
      // For large datasets, consider server-side filtering/sorting.
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching users:', err.response ? err.response.data : err.message);
      setError(err.response && err.response.data && err.response.data.message ? err.response.data.message : 'Failed to load users.');
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        setMessage('');
        const response = await axios.delete(`http://localhost:5000/api/users/${userId}`);
        setMessage(response.data.message);
        fetchUsers(); // Re-fetch users to update the list
      } catch (err) {
        console.error('Error deleting user:', err.response ? err.response.data : err.message);
        setError(err.response && err.response.data && err.response.data.message ? err.response.data.message : 'Failed to delete user.');
      }
    }
  };

  const handleEdit = (userId) => {
    alert(`Edit user with ID: ${userId} (Implementation for edit page navigation needed)`);
  };

  const handleAddNewUserClick = () => {
    navigate('/dashboard/manage-users/add');
  };

  // User Type options (should match backend enum)
  const userTypeOptions = ['Super Admin', 'Admin', 'Doctor', 'Therapist', 'Resource Person', 'Parent'];

  // Memoized filtering and sorting logic
  const filteredAndSortedUsers = useMemo(() => {
    let currentUsers = [...users];

    // 1. Filter by User Type
    if (filterUserType) {
      currentUsers = currentUsers.filter(user => user.userType === filterUserType);
    }

    // 2. Search
    if (searchTerm) {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      currentUsers = currentUsers.filter(user =>
        user.firstName.toLowerCase().includes(lowercasedSearchTerm) ||
        user.lastName.toLowerCase().includes(lowercasedSearchTerm) ||
        user.idNumber.toLowerCase().includes(lowercasedSearchTerm) ||
        user.userType.toLowerCase().includes(lowercasedSearchTerm) ||
        user.username.toLowerCase().includes(lowercasedSearchTerm) ||
        (user.childRegNo && user.childRegNo.toLowerCase().includes(lowercasedSearchTerm))
      );
    }

    // 3. Sort
    if (sortConfig.key) {
      currentUsers.sort((a, b) => {
        const aValue = a[sortConfig.key] || '';
        const bValue = b[sortConfig.key] || '';

        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return currentUsers;
  }, [users, searchTerm, filterUserType, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? ' ▲' : ' ▼';
    }
    return '';
  };


  if (loading) {
    return <div style={styles.container}><p>Loading users...</p></div>;
  }

  if (error) {
    return <div style={styles.container}><p style={styles.errorMessage}>{error}</p></div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.heading}>Users List</h1>
        <button onClick={handleAddNewUserClick} style={styles.addButton}>Add New User</button>
      </div>
      {message && <p style={styles.successMessage}>{message}</p>}

      {/* Filters and Search Section */}
      <div style={styles.filterSortSection}>
        <div style={styles.filterSortGroup}>
          <label htmlFor="search" style={styles.label}>Search:</label>
          <input
            type="text"
            id="search"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.filterSortGroup}>
          <label htmlFor="filterUserType" style={styles.label}>Filter by User Type:</label>
          <select
            id="filterUserType"
            value={filterUserType}
            onChange={(e) => setFilterUserType(e.target.value)}
            style={styles.select}
          >
            <option value="">All User Types</option>
            {userTypeOptions.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div style={styles.filterSortGroup}>
          <label htmlFor="sortField" style={styles.label}>Sort By:</label>
          <select
            id="sortField"
            value={sortConfig.key}
            onChange={(e) => requestSort(e.target.value)}
            style={styles.select}
          >
            <option value="firstName">First Name</option>
            <option value="lastName">Last Name</option>
            <option value="idNumber">ID Number</option>
            <option value="userType">User Type</option>
            <option value="username">Username</option>
            <option value="childRegNo">Child Reg No.</option>
          </select>
          <button
            onClick={() => setSortConfig(prev => ({ ...prev, direction: prev.direction === 'ascending' ? 'descending' : 'ascending' }))}
            style={styles.sortDirectionButton}
          >
            {sortConfig.direction === 'ascending' ? 'Asc ▲' : 'Desc ▼'}
          </button>
        </div>
      </div>


      {filteredAndSortedUsers.length === 0 ? (
        <p>No users found matching your criteria.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th} onClick={() => requestSort('firstName')}>First Name {getSortIndicator('firstName')}</th>
              <th style={styles.th} onClick={() => requestSort('lastName')}>Last Name {getSortIndicator('lastName')}</th>
              <th style={styles.th} onClick={() => requestSort('idNumber')}>ID Number {getSortIndicator('idNumber')}</th>
              <th style={styles.th} onClick={() => requestSort('userType')}>User Type {getSortIndicator('userType')}</th>
              <th style={styles.th} onClick={() => requestSort('username')}>Username {getSortIndicator('username')}</th>
              <th style={styles.th} onClick={() => requestSort('childRegNo')}>Child Reg No. {getSortIndicator('childRegNo')}</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedUsers.map((user) => (
              <tr key={user._id} style={styles.tr}>
                <td style={styles.td}>{user.firstName}</td>
                <td style={styles.td}>{user.lastName}</td>
                <td style={styles.td}>{user.idNumber}</td>
                <td style={styles.td}>{user.userType}</td>
                <td style={styles.td}>{user.username}</td>
                <td style={styles.td}>{user.childRegNo || 'N/A'}</td>
                <td style={styles.tdActions}>
                  <button onClick={() => handleEdit(user._id)} style={styles.editButton}>Edit</button>
                  <button onClick={() => handleDelete(user._id)} style={styles.deleteButton}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// Basic inline styles
const styles = {
    container: {
      maxWidth: '1200px', // Increased max-width for filters
      margin: '50px auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      backgroundColor: '#fff',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
    },
    heading: {
      color: '#333',
    },
    addButton: {
      padding: '10px 15px',
      backgroundColor: '#28a745',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
    },
    filterSortSection: {
        display: 'flex',
        flexWrap: 'wrap', // Allow items to wrap to the next line
        gap: '20px', // Space between filter/sort groups
        marginBottom: '20px',
        padding: '15px',
        border: '1px solid #eee',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
    },
    filterSortGroup: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: '200px', // Minimum width for each group
    },
    label: {
        marginBottom: '5px',
        fontWeight: 'bold',
        color: '#555',
    },
    input: {
        padding: '8px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '14px',
    },
    select: {
        padding: '8px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '14px',
        backgroundColor: '#fff',
    },
    sortDirectionButton: {
        padding: '8px 12px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        marginTop: '10px', // Space from select box
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '20px',
    },
    th: {
      backgroundColor: '#f2f2f2',
      border: '1px solid #ddd',
      padding: '12px',
      textAlign: 'left',
      fontWeight: 'bold',
      color: '#555',
      cursor: 'pointer', // Indicate sortable columns
    },
    td: {
      border: '1px solid #ddd',
      padding: '10px',
      textAlign: 'left',
    },
    tdActions: {
      border: '1px solid #ddd',
      padding: '10px',
      textAlign: 'center',
      whiteSpace: 'nowrap',
    },
    tr: {
      '&:nth-child(even)': {
        backgroundColor: '#f9f9f9',
      },
    },
    editButton: {
      padding: '8px 12px',
      backgroundColor: '#ffc107',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      marginRight: '5px',
    },
    deleteButton: {
      padding: '8px 12px',
      backgroundColor: '#dc3545',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    successMessage: {
      color: 'green',
      backgroundColor: '#e6ffe6',
      border: '1px solid green',
      padding: '10px',
      borderRadius: '5px',
      marginBottom: '15px',
      textAlign: 'center',
    },
    errorMessage: {
      color: 'red',
      backgroundColor: '#ffe6e6',
      border: '1px solid red',
      padding: '10px',
      borderRadius: '5px',
      marginBottom: '15px',
      textAlign: 'center',
    },
  };
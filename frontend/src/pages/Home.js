//Base imports
import { useState, useEffect } from "react";
import { Spinner, Table, Container, Button } from "react-bootstrap";
import { BsPencil, BsTrash } from 'react-icons/bs';
import { TiPlus } from 'react-icons/ti';
import { RiRefreshLine } from 'react-icons/ri';

//Components
import { getRestaurants } from './../services/api/restaurantAPI';
import Filter from './../components/modals/Filter';
import InsertLine from './../components/modals/InsertLine';
import EditLine from './../components/modals/EditLine';
import DeleteLine from './../components/modals/DeleteLine';

export default function Home() {
    const [restaurantTable, setrestaurantTable] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    //Load data of a restaurants
    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                setIsLoading(true);
                const data = await getRestaurants();
                setrestaurantTable(data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        };
        fetchRestaurants();
    }, []);

    //Modals controller
    const [ShowFilter, setShowFilter] = useState(false);
    const [showInsertLine, setShowInsertLine] = useState(false);
    const [showEditLine, setShowEditLine] = useState(false);
    const [showDeleteLine, setShowDeleteLine] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [selectedRowID, setSelectedRowID] = useState(null);

    const handleShowFilter = () => setShowFilter(true);

    const handleShowInsertLine = () => setShowInsertLine(true);

    const handleShowEditLine = (restaurant) => {
        setSelectedRowData(restaurant);
        setShowEditLine(true);
    }
    
    const handleShowDeleteLine = (restaurantID) => {
        setSelectedRowID(restaurantID);
        setShowDeleteLine(true);
    }
    
    const handleCloseFilter = () => setShowFilter(false);
    const handleCloseInsertLine = () => setShowInsertLine(false);
    const handleCloseEditLine = () => setShowEditLine(false);
    const handleCloseDeleteLine = () => setShowDeleteLine(false);

    //Sort columns
    const [sortField, setSortField] = useState("");
    const [order, setOrder] = useState("asc");

    const handleSorting = (sortField, sortOrder) => {
        if (sortField) {
            const sorted = [...restaurantTable].sort((a, b) => {
                return (
                    a[sortField].toString().localeCompare(
                        b[sortField].toString(), "en", {
                            numeric: true,
                        }
                    ) * (sortOrder === "asc" ? 1 : -1)
                );
            });
            setrestaurantTable(sorted);
        }
    };

    const handleSortingChange = (column) => {
        const sortOrder = column === sortField && order === "asc" ? "desc" : "asc";
        setSortField(column);
        setOrder(sortOrder);
        handleSorting(column, sortOrder);
    };

    //Search element in table
    const [searchValue, setSearchValue] = useState ("");

    const handleSearch = (e) => {
        const search = e.target.value;
        setSearchValue(search);
        restaurantTable.forEach(restaurant => {
            let count = 0;
            for (let i = 1; i < restaurant.length - 1; i++) {
                if (((restaurant[i]).toString()).toLowerCase().includes(search.toLowerCase())){
                    count++;
                    break;
                }
            }
            const fila = document.getElementById(`${restaurant[0]}`);
            if (count === 0){
                fila.style.display = 'none';
            }
            else{
                fila.style.display = 'table-row';
            }
        });
    };

    //Reload page and set filters in null
    const reloadPage = () => {
        window.location.reload();
      };
    
    //Loading...
    if (isLoading) {
        return(
            <div className="d-flex flex-column align-items-center">
                <Spinner animation="border" variant="dark"/>
            </div>
        );
    }

    return (
        <div>
            <h1>Home Page</h1>
            <Container style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                <Button style={{ backgroundColor: '#3CB371'}} onClick={() => handleShowInsertLine()}>
                    Añadir Restaurant <TiPlus  />
                </Button>
                <Button className="ms-2" style={{ backgroundColor: 'blue'}} onClick={() => handleShowFilter()}>
                    Filtro Avanzado <TiPlus  />
                </Button>
                <input
                    type="text"
                    placeholder="Buscar elemento..."
                    value = {searchValue}
                    onChange = {handleSearch}
                    className="ms-2"
                />
                <Button className="ms-2" onClick={reloadPage}>
                    <RiRefreshLine />
                </Button>
            </Container>
            <Container style={{marginTop:'2em'}}>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th key="name" onClick={() => handleSortingChange(1)} >Nombre</th>
                            <th key="locate" onClick={() => handleSortingChange(2)} >Ubicación</th>
                            <th key="food" onClick={() => handleSortingChange(3)} >Tipo de comida</th>
                            <th key="score" onClick={() => handleSortingChange(4)} >Calificación</th>
                            <th key="visited" onClick={() => handleSortingChange(5)} >Visitado</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {restaurantTable?.map((restaurant) => (
                            <tr key={restaurant[0]} id={restaurant[0]}>
                            <td>{restaurant[1]}</td>
                            <td>{restaurant[2]}</td>
                            <td>{restaurant[3]}</td>
                            <td>{restaurant[4]}</td>
                            <td>{restaurant[5] === 1 ? "✔️" : "❌"}</td>
                            <td>
                                <Button variant="info" size="sm" onClick={() => handleShowEditLine(restaurant)}>
                                    <BsPencil />
                                </Button>
                                <Button variant="danger" size="sm" className="ms-2" onClick={() => handleShowDeleteLine(restaurant[0])}>
                                    <BsTrash />
                                </Button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </Table>
                <Filter show={ShowFilter} handleClose={handleCloseFilter} setrestaurantTable={setrestaurantTable} setIsLoading={setIsLoading}/>
                <InsertLine show={showInsertLine} handleClose={handleCloseInsertLine} />
                <EditLine show={showEditLine} handleClose={handleCloseEditLine} restaurantData={selectedRowData} />
                <DeleteLine show={showDeleteLine} handleClose={handleCloseDeleteLine} restaurantID={selectedRowID} />
            </Container >
        </div>
    );
}
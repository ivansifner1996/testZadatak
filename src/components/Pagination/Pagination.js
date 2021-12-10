import React,{useState, useEffect} from 'react'
import { useLocation, useHistory } from 'react-router';
import './Pagination.css';

const Pagination = ({data,pageLimit, RenderComponent, dataLimit, ...rest}) => {
    const pages = Math.round(data.length / dataLimit);
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {

    },[]);
    
    function goToNextPage(){
        let pageNumber = currentPage + 1;
        setCurrentPage(pageNumber);
    }

    function goToPreviousPage(){
        let pageNumber = currentPage - 1;
        setCurrentPage(pageNumber);
    }

    function changePage(event){
        const pageNumber = Number(event.target.textContent);
        setCurrentPage(pageNumber);
    }

    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit;
        const endIndex = startIndex + dataLimit;
        return data.slice(startIndex, endIndex);
    };

    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / pageLimit * pageLimit);
        if(start >= 3){
            start = start - 3;
        }
        return new Array(pageLimit).fill().map((_, idx) => start + idx + 1).filter(v => v < pages);
    };

    return(
        <>
      {getPaginatedData().map((d, idx) => (
        <RenderComponent key={idx}
            data = {d}
            {...d}
        />
      ))}
        <div className="pagination">
            <button
                onClick={goToPreviousPage}
                className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
            >
                prethodna
            </button>
            {getPaginationGroup().map((item, index) => (
                <button
                    key={index}
                    onClick={changePage}
                    className={`paginationItem ${currentPage === item ? 'active' : null}`}
                >
                    <span>{item}</span>
                </button>
            ))}
        <button
                onClick={goToNextPage}
                className={`next ${currentPage >= pages ? 'disabled' : ''}`}
            >
                sljedeca
        </button>
            
        </div>
        </>
    )
}

export default Pagination;
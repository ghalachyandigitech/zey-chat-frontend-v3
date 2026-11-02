import {HISTORY_PAGE_ITEMS_COUNT} from '../../../Constants';

const Pagination = ({page, setPage, totalCount}) => {
    const pagesCount = Math.ceil(totalCount/HISTORY_PAGE_ITEMS_COUNT);
    const Page = ({number}) => (
        <button className={page === number ? 'active': ''} onClick={() => setPage(number)}>
            {number}
        </button>
    );

    return(
        <div className="pagination">
            <div>result {totalCount}</div>
            <div>
                {pagesCount > 1 && page !== 1 && <Page className="prev" number={page-1}/>}
                {page <= pagesCount && pagesCount >= 1 && <Page number={1}/>}
                {pagesCount > 5 && page > 3 && ' ... '}
                {
                    (page < 4 && [2,3,4].map(r => {if(r < pagesCount) return <Page number={r}/>}))
                    || (page > pagesCount-3 && [3,2,1].map(r => <Page number={pagesCount-r}/>))
                    || ([-1,0,1].map(r => <Page number={page+r}/>))
                }
                {page < pagesCount-2 && ' ... '}
                {pagesCount > 1 && <Page number={pagesCount}/>}
                {page < pagesCount && pagesCount > 0 && <Page className="next" number={page+1}/>}
            </div>
        </div>
    )
};

export default Pagination;
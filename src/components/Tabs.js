const Tabs = ({tabs, page, setPage}) => {
    return(
        <>
            <div className="tabs">
                {tabs.map(([key, name]) =>
                    <button onClick={() => page !== key && setPage(key)} className={page === key && 'active'}>{name}</button>
                )}
            </div>
        </>
    )
};

export default Tabs;
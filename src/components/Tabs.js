const Tabs = ({tabs, page, setPage}) => {
    return(
        <>
            <div className="tabs">
                {tabs.map(([key, name]) =>
                    <span key={key} onClick={() => page !== key && setPage(key)} className={page === key ? 'active' : ''}>{name}</span>
                )}
            </div>
        </>
    )
};

export default Tabs;
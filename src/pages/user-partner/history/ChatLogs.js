const ChatLogs = ({logUsers, logs}) => {
    return (
        <>
            {logs.map(log =>
                <div>{logUsers[log.userId]} {log.action} {log.createdAt}</div>
            )}
        </>
    );
};

export default ChatLogs;

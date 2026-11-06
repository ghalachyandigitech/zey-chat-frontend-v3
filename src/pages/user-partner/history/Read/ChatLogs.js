const ChatLogs = ({logUsers, logs}) => {
    return (
        <div className="chat-logs">
            {logs.map(log =>
                <div>{logUsers[log.userId]} {log.action} <span style={{float: 'right'}}>{new Date(log.createdAt).toLocaleString(['sv'])}</span></div>
            )}
        </div>
    );
};

export default ChatLogs;

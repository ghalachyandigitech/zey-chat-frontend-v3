const HotKeys = () => {
    return (
        <div className="hot-keys">
            <h3>When chatting</h3>
            <pre>
                Ctrl + 1 , 2 ...    Switch between chat windows<br />
                Ctrl + ,            Minimize chat window<br />
                Ctrl + .            Close chat window<br />
                Ctrl + ~            Serve incoming chat<br />
                Ctrl + Alt + [      Go to previous chat window<br />
                Ctrl + Alt + ]      Go to next chat window<br />
            </pre>
            <h4>Global</h4>
            <pre>
                Ctrl + /  Open keyboard shortcuts help
            </pre>
        </div>
    )
};

export default HotKeys;
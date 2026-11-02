import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setPopUp} from "../../reducers/popUpSlice";
import {chatPopupClose, chatPopupOpen} from "../../reducers/user-partner/chatPopupSlice";
import {setFlashPopUp} from "../../reducers/flashPopUpSlice";

const hotKeys = {
    chatPopUpChatIndex: '',
    chatRequestsRef: null,
    dispatch: null,
    _chats: [],
    _ids: [],
    _list: {},
    set list (list){
        this._list = list;
        this._ids = Object.keys(list);
        this._chats = Object.values(list);
    },
    'number': function(index){
        const chat = this._chats[index-1];
        if(chat) this.dispatch(chatPopupOpen(chat));
        else this.dispatch(setFlashPopUp(`chat number ${index} not found`));
    },
    'true[': function(){
        let previousIndex = this._ids.findIndex(_id => _id === this.chatsListId) - 1;
        if(previousIndex < 0) previousIndex = this._ids.length - 1;

        const chat = this._chats[previousIndex];
        if(chat) this.dispatch(chatPopupOpen(chat));
    },
    'true]': function(){
        let nextIndex = this._ids.findIndex(_id => _id === this.chatsListId) + 1;
        if(nextIndex >= this._ids.length) nextIndex = 0;

        const chat = this._chats[nextIndex];
        if(chat) this.dispatch(chatPopupOpen(chat));
    },
    'false.': function(){
        const chat = this._list[this.chatsListId];
        if(chat) this.dispatch(setPopUp(['chats/end', chat]));
    },
    'false,': function(){this.dispatch(chatPopupClose());},
    'false~': function(){this.chatRequestsRef.current.click()},
    'false/': () => {console.log('/')},
    'falseEscape': function(){this.dispatch(chatPopupClose())}
};

const KeyboardController = ({chatRequestsRef}) => {
    const dispatch = useDispatch();
    const {_id, collection} = useSelector(state => state.chatPopup);
    const list = useSelector(state => state.chats.list);

    console.log('HotKeysButton component');
    useEffect(() => {
        hotKeys.dispatch = dispatch;
        hotKeys.chatRequestsRef = chatRequestsRef;

        document.body.addEventListener('keydown', e => {
            const {key, ctrlKey, altKey} = e;

            if((ctrlKey && /[~,./\]\[0-9]/.test(key)) || key === 'Escape'){
                e.preventDefault();

                if(!isNaN(key)) hotKeys['number'](key);
                else if(hotKeys[altKey + key]) hotKeys[altKey + key]();
            }
        });
    }, []);

    hotKeys.list = list;
    hotKeys.chatsListId = collection+_id;
};

export default KeyboardController;
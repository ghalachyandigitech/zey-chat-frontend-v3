import {createSlice} from '@reduxjs/toolkit'

function selected(state, widget){
    state.selected._id = widget._id || '';
    state.selected.name = widget.name || '';
    state.selected.styles = widget.styles || {};
    state.selected.language = widget.language;
    state.selected.notificationSound = widget.notificationSound;
    state.selected.isRatingEnabled = widget.isRatingEnabled;
    state.selected.offlineGreeting = widget.offlineGreeting || false;
    state.selected.greetingMessage = widget.greetingMessage;
}

export const widgetsSlice = createSlice({
    name: 'widgets',
    initialState: {
        script: '',
        list: [],
        selected: {
            _id: '',
            name: '',
            styles: {},
            language: '',
            greetingMessage: '',
            notificationSound: false,
            isRatingEnabled: false,
            offlineGreeting: false
        },
    },
    reducers: {
        setWidgets: (state, {payload}) => {
            const {script, widgets} = payload;

            state.script = script;
            if(widgets.length){
                state.list = widgets;
                selected(state, widgets[0]);
            }
        },
        setWidget: (state, {payload}) => {
            state.list.push(payload);
            selected(state, payload);
        },
        setSelected(state, {payload}){
            const widget = state.list.find(i => i._id === payload);
            if(widget) selected(state, widget);
        },
        setStyle(state, {payload}){
            state.selected.styles[payload[0]] = payload[1];
        },
        setSetting(state, {payload}){
            state.selected[payload[0]] = payload[1];
        },
        setForm(state, {payload}){
            state.selected[payload[0]] = payload[1];
        },
        discard(state, {payload}){
            const widget = state.list.find(i => i._id === state.selected._id);
            if(widget){
                if(payload === 'styles'){
                    state.selected.styles = widget.styles;
                }else if(payload === 'settings'){
                    state.selected.language = widget.language;
                    state.selected.notificationSound = widget.notificationSound;
                    state.selected.isRatingEnabled = widget.isRatingEnabled;
                }else if(payload === 'forms'){
                    state.selected.offlineGreeting = widget.offlineGreeting;
                    state.selected.greetingMessage = widget.greetingMessage;
                }
            }
        },
        deleteById: (state, {payload}) => {
            state.list = state.list.filter(i => i._id !== payload);
            selected(state, state.list[0] || {});
        },
        updateSelected(state, {payload}){
            const widget = state.list.find(i => i._id === state.selected._id);
            if(widget){
                if(payload === 'styles'){
                    widget.styles = state.selected.styles;
                }else if(payload === 'settings'){
                    widget.language = state.selected.language;
                    widget.notificationSound = state.selected.notificationSound;
                    widget.isRatingEnabled = state.selected.isRatingEnabled;
                }else if(payload === 'forms'){
                    widget.offlineGreeting = state.selected.offlineGreeting;
                    widget.greetingMessage = state.selected.greetingMessage;
                }
            }
        }
    },
});

export const {setWidgets, setSelected, setWidget, setStyle, discard, deleteById,
    setSetting, updateSelected, setForm} = widgetsSlice.actions;
export default widgetsSlice.reducer;
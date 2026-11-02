import {StyleSheet} from "@react-pdf/renderer";

export const styles =  StyleSheet.create({
    message: {
        paddingBottom: '3px',
        wordBreak: 'break-all'
    },
    text: {
        log: {color: 'grey',  fontStyle: 'italic', fontSize: '13px'},
        agents: {fontWeight: '600'},
        visitors: {fontWeight: '600'}
    },
    date: {
        log: {color: 'grey', fontStyle: 'italic', fontSize: '12px'},
        agents: {color: '#2f4f4f', fontWeight: '600', fontSize: '12px'},
        visitors: {color: '#2f4f4f', fontWeight: '600', fontSize: '12px'},
    },
    side:{
        log: {display: 'block', textAlign: 'center'},
        agents: {display: 'block', textAlign: 'right'},
        visitors: {display: 'block', textAlign: 'left'},
    },
    info: {
        display: 'inline-block',
        marginBottom: '10px',
        color: '#3c4858'
    },
    documentPdf: {
        overflowY: 'auto'
    },
    page: {
        padding: '10px',
        display: 'block'
    }
});
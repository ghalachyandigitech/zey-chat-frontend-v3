import {PDFDownloadLink, Document as documentPdf, Page, Text, View, StyleSheet} from '@react-pdf/renderer';
import {UploadSvg} from "../../Icons";
import File from "../../components/File";
import {DATE_OPTIONS} from "../../Constants";
import {styles} from "../../css/user-partner/transcript.css.js";

const Transcript = ({transcript, companionId}) => {
    const Chat = () => (
        <documentPdf style={styles.documentPdf}>
            <Page style={styles.page}>
                <View>
                    <Text style={styles.info}>
                        rating {transcript.rating ? transcript.rating : '--'}&nbsp;&nbsp;&nbsp;&nbsp;
                        date {transcript.createdAt ? new Date(transcript.createdAt).toLocaleDateString(...DATE_OPTIONS) : '--'}
                    </Text>
                    {transcript.messages && transcript.messages.map(({id, userId: userPartnerId, message: text, file, date}) => {
                        const type = !userPartnerId ? 'log' : userPartnerId === companionId ? 'visitors' : 'agents';
                        const fileType = file.split('.').reverse()[0];

                        if (!userPartnerId) {
                            const log = text.split('_');

                            text = transcript.logUsers[log[0]] + ' ' + log[1];
                        }

                        return (
                            <div style={styles.message}>
                                <Text style={{...styles.text[type], ...styles.side[type]}}>{text}</Text>
                                <Text style={styles.side[type]}>
                                    {!fileType && <File value={[fileType, file]} error={true} />}
                                </Text>
                                <Text style={{...styles.date[type], ...styles.side[type]}}>
                                    {date && new Date(date).toLocaleTimeString(...DATE_OPTIONS)}
                                </Text>
                            </div>
                        )
                    })}
                </View>
            </Page>
        </documentPdf>
    );

    return (
        <>
            <PDFDownloadLink document={<Chat />} fileName="my-document.pdf"><UploadSvg/></PDFDownloadLink>
            <Chat />
        </>
    );
};

export default Transcript;
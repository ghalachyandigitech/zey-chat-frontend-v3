import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setStyle, discard, updateSelected} from '../../../../reducers/user-partner/widgetsSlice';
import Input from '../../../../components/Input';
import {updateStyles} from '../../../../controllers/user-partner/WidgetsController';
import Tabs from "../../../../components/Tabs";
import {WidgetCircularSvg, WidgetAgentImg} from "../../../../Icons";
import {setPopUp} from "../../../../reducers/popUpSlice";
import {setFlashPopUp} from "../../../../reducers/flashPopUpSlice";

const Appearance = () => {
    const dispatch = useDispatch();
    const [platform, setPlatform] = useState(0);
    const [load, setLoad] = useState(false);
    const {_id, styles} = useSelector(state => state.widgets.selected);
    const {widgetDegree, widgetLeftColor, widgetRightColor} = styles;

    const gradients = {
        'linear-gradient': 'linear-gradient(' + widgetDegree + 'deg, ' + widgetLeftColor + ', ' + widgetRightColor + ')',
        'radial-gradient': 'radial-gradient(' + widgetLeftColor + ', ' + widgetRightColor + ')',
        'conic-gradient': 'conic-gradient(from ' + widgetDegree + 'deg, ' + widgetLeftColor + ' 0deg, ' + widgetRightColor + ' 360deg)',
        'midline-gradient': 'linear-gradient(' + widgetDegree + 'deg, ' + widgetLeftColor + ', ' + widgetRightColor + ', ' + widgetLeftColor + ')'
    };

    return (
        <div className="widget-appearance">
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div className="appearance">
                    <h3>vhat window</h3>
                    <div className="row">
                        <span>top title</span>
                        <div>
                            <Input name="title" value={styles.title} setValue={v => dispatch(setStyle(['title', v]))} />
                        </div>
                    </div>
                    <div className="row">
                        <span>header</span>
                        <div>
                            <input value={styles.headerLeftColor} onChange={e => dispatch(setStyle(['headerLeftColor', e.target.value]))}
                                   className="input-color" type="color"/>
                            <input value={styles.headerRightColor} onChange={e => dispatch(setStyle(['headerRightColor', e.target.value]))}
                                   className="input-color" type="color"/>
                            <input value={styles.headerDegree} onChange={e => dispatch(setStyle(['headerDegree', e.target.value*1]))}
                                   className="input-number" type="number" min={0} max={360}/>
                        </div>
                    </div>
                    <div className="row">
                        <span>text color</span>
                        <div>
                            <input value={styles.agentTextColor} onChange={e => dispatch(setStyle(['agentTextColor', e.target.value]))}
                                   className="input-color" type="color"/>
                            <input value={styles.visitorTextColor} onChange={e => dispatch(setStyle(['visitorTextColor', e.target.value]))}
                                   className="input-color" type="color"/>
                        </div>
                    </div>
                    <div className="row">
                        <span>background</span>
                        <div>
                            <input value={styles.chatBadgeBackgroundColor} onChange={e => dispatch(setStyle(['chatBadgeBackgroundColor', e.target.value]))}
                                   className="input-color" type="color"/>
                        </div>
                    </div>
                    <div className="row">
                        <span>text bubble color</span>
                        <div>
                            <input className="input-color" type="color" value={styles.messagesBackgroundColors?.our}
                                   onChange={e => dispatch(setStyle(['messagesBackgroundColors', {
                                       our: e.target.value, client: styles.messagesBackgroundColors?.client
                                   }]))}/>
                            <input className="input-color" type="color" value={styles.messagesBackgroundColors?.client}
                                   onChange={e => dispatch(setStyle(['messagesBackgroundColors', {
                                       client: e.target.value, our: styles.messagesBackgroundColors?.our
                                   }]))}/>
                        </div>
                    </div>
                    <div className="row">
                        <span>bot messages color</span>
                        <div>
                            <input value={styles.botTextColor} onChange={e => dispatch(setStyle(['botTextColor', e.target.value]))}
                                   className="input-color" type="color"/>
                        </div>
                    </div>
                    <h3>chat window</h3>
                    <div className="row">
                        <span>widget</span>
                        <div>
                            <label className="input-radio">
                                <input checked={styles.widgetType === 'circular'} onChange={() => dispatch(setStyle(['widgetType', 'circular']))}
                                       type="radio" />circular
                            </label>
                            <label className="input-radio">
                                <input checked={styles.widgetType === 'bar'} onChange={() => dispatch(setStyle(['widgetType', 'bar']))}
                                       type="radio" />bar
                            </label>
                        </div>
                    </div>
                    <div className="row">
                        <span>background color</span>
                        <div>
                            <input value={styles.widgetLeftColor} onChange={e => dispatch(setStyle(['widgetLeftColor', e.target.value]))}
                                   type="color" className="input-color"/>
                            <input value={styles.widgetRightColor} onChange={e => dispatch(setStyle(['widgetRightColor', e.target.value]))}
                                   type="color" className="input-color"/>
                            <input value={styles.widgetDegree} onChange={e => dispatch(setStyle(['widgetDegree', e.target.value*1]))}
                                   className="input-number" type="number" min={0} max={360}/>
                            <div className="background-gradients">
                                {Object.keys(gradients).map(key =>
                                    <label style={{background: gradients[key]}} className={styles.widgetGradientType === key ? 'inset' : 'outset'}>
                                        <input hidden type="radio" checked={styles.widgetGradientType === key}
                                               onChange={() => dispatch(setStyle(['widgetGradientType', key]))} />
                                    </label>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <span>icon color</span>
                        <div>
                            <input value={styles.widgetIconColor} onChange={e => dispatch(setStyle(['widgetIconColor', e.target.value]))}
                                   className="input-color" type="color"/>
                        </div>
                    </div>
                    <div className="row">
                        <span>notification color</span>
                        <div>
                            <input value={styles.notificationColor} onChange={e => dispatch(setStyle(['notificationColor', e.target.value]))}
                                   className="input-color" type="color"/>
                        </div>
                    </div>
                </div>
                <div className="widget">
                    <div className="widget-container">
                        <div className="header" style={{background: 'linear-gradient(' + styles.headerDegree + 'deg, ' + styles.headerLeftColor + ', ' + styles.headerRightColor + ')'}}>
                            <WidgetAgentImg />
                            <div>
                                <div>{styles.title}</div>
                                <div>Test agent</div>
                            </div>
                        </div>
                        <div className="body" style={{backgroundColor: styles.chatBadgeBackgroundColor}}>
                            <div className="messages">
                                <div className="message" style={{color: styles.botTextColor}}>
                                    <div className="text">
                                        You joined
                                    </div>
                                    <div className="time">15:51</div>
                                </div>
                                <div className="message message-start" style={{color: styles.agentTextColor}}>
                                    <div className="text" style={{backgroundColor: styles.messagesBackgroundColors?.our}}>
                                        messagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessage
                                        <span style={{color: styles.messagesBackgroundColors?.our}}> </span>
                                    </div>
                                    <div className="time">15:51</div>
                                </div>
                                <div className="message message-end" style={{color: styles.visitorTextColor}}>
                                    <div className="text" style={{backgroundColor: styles.messagesBackgroundColors?.client}}>
                                        messagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessage
                                        <span style={{color: styles.messagesBackgroundColors?.client}}> </span>
                                    </div>
                                    <div className="time">15:51</div>
                                </div>
                            </div>
                            <div className="messaging">
                                <form>
                                    <textarea> </textarea>
                                    <div className="buttons">
                                        <svg transform="rotate(25 0  0)" viewBox="0 0 24 24"><path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"> </path></svg>
                                        <svg><path viewBox="0 0 24 24" d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z"> </path></svg>
                                    </div>
                                </form>
                                <div className="end-chat">
                                    <svg viewBox="0 0 80.504 70.321">
                                        <g transform="translate(-155.512 -2297.704)">
                                            <path fill="#8e8e8e" d="M196.092,2297.7h0c-20.418,0-36.964,13.489-36.964,30.138a25.262,25.262,0,0,0,2.555,11.034l56.654-35.107A42.516,42.516,0,0,0,196.092,2297.7Z"> </path>
                                            <path fill="#8e8e8e" d="M233.056,2327.841a26.864,26.864,0,0,0-8.347-19.074l11.307-7.007-1.453-2.346-11.97,7.418-.009-.008-58.426,36.206.007.009-8.653,5.362,1.454,2.346,8.924-5.53c6.692,7.72,17.721,12.763,30.2,12.763a63.118,63.118,0,0,0,9.918-.773l19.834,10.818L218.63,2350.9C227.283,2345.378,233.056,2337.492,233.056,2327.841Z"> </path>
                                        </g>
                                    </svg>
                                    end chat
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="toggle" style={{
                        borderRadius: (styles.widgetType === 'circular' && '50%') || (styles.widgetType === 'bar' && '10px'),
                        background: gradients[styles.widgetGradientType]
                    }}>
                        <WidgetCircularSvg fill={styles.widgetIconColor}/>
                    </div>
                </div>
            </div>
            <Tabs page={platform} setPage={setPlatform} tabs={[
                [0, 'desktop'],
                [1, 'mobile'],
            ]} />
            <div style={{display: platform === 0 ? '' : 'none'}}>
                <div className="row">
                    <span>window size</span>
                    <div>
                        <label className="input-radio">
                            <input name="windowSize" type="radio" checked={styles.windowSize === 'overlay'}
                                   onChange={e => dispatch(setStyle(['windowSize', 'overlay']))}/>
                            overlay window
                        </label>
                        <label className="input-radio">
                            <input name="windowSize" type="radio" checked={styles.windowSize === 'popup'}
                                   onChange={e => dispatch(setStyle(['windowSize', 'popup']))}/>
                            chat popup
                        </label>
                    </div>
                </div>
                <div className="row">
                    <span>window position</span>
                    <div>
                        <label className="input-radio">
                            <input name="widgetPosition" type="radio" checked={styles.widgetPosition === 'bottom-left'}
                                   onChange={e => dispatch(setStyle(['widgetPosition', 'bottom-left']))}/>
                            bottom left
                        </label>
                        <label className="input-radio">
                            <input name="widgetPosition" type="radio" checked={styles.widgetPosition === 'bottom-right'}
                                   onChange={e => dispatch(setStyle(['widgetPosition', 'bottom-right']))}/>
                            bottom right
                        </label>
                    </div>
                </div>
                <div className="row">
                    <span>window spacing</span>
                    <div>
                        <label className="label-number">
                            side<input value={styles.spacingSide} onChange={e => dispatch(setStyle(['spacingSide', e.target.value]))}
                                   className="input-number" type="number" min={0} max={1000}/>px
                        </label>
                        <label className="label-number">
                            side<input value={styles.spacingBottom} onChange={e => dispatch(setStyle(['spacingBottom', e.target.value]))}
                                       className="input-number" type="number" min={0} max={1000}/>px
                        </label>
                    </div>
                </div>
                <div className="row">
                    <span>z-index</span>
                    <div>
                        <label className="label-number">
                            <input value={styles.zIndex} onChange={e => dispatch(setStyle(['zIndex', e.target.value]))}
                                   className="input-number" type="number" min={0} max={999999}/>
                        </label>
                    </div>
                </div>
            </div>
            <div style={{display: platform === 1 ? '' : 'none'}}>
                <div className="row">
                    <span>window size</span>
                    <div>
                        <label className="input-radio">
                            <input name="windowSizeMobile" type="radio" checked={styles.windowSizeMobile === 'overlay'}
                                   onChange={e => dispatch(setStyle(['windowSizeMobile', 'overlay']))}/>
                            overlay window
                        </label>
                        <label className="input-radio">
                            <input name="windowSizeMobile" type="radio" checked={styles.windowSizeMobile === 'popup'}
                                   onChange={e => dispatch(setStyle(['windowSizeMobile', 'popup']))}/>
                            chat popup
                        </label>
                    </div>
                </div>
                <div className="row">
                    <span>window position</span>
                    <div>
                        <label className="input-radio">
                            <input name="widgetPositionMobile" type="radio" checked={styles.widgetPositionMobile === 'bottom-left'}
                                   onChange={e => dispatch(setStyle(['widgetPositionMobile', 'bottom-left']))}/>
                            bottom left
                        </label>
                        <label className="input-radio">
                            <input name="widgetPositionMobile" type="radio" checked={styles.widgetPositionMobile === 'bottom-right'}
                                   onChange={e => dispatch(setStyle(['widgetPositionMobile', 'bottom-right']))}/>
                            bottom right
                        </label>
                    </div>
                </div>
                <div className="row">
                    <span>window spacing</span>
                    <div>
                        <label className="label-number">
                            side<input value={styles.spacingSideMobile} onChange={e => dispatch(setStyle(['spacingSideMobile', e.target.value]))}
                                       className="input-number" type="number" min={0} max={1000}/>px
                        </label>
                        <label className="label-number">
                            side<input value={styles.spacingBottomMobile} onChange={e => dispatch(setStyle(['spacingBottomMobile', e.target.value]))}
                                       className="input-number" type="number" min={0} max={1000}/>px
                        </label>
                    </div>
                </div>
                <div className="row">
                    <span>z-index</span>
                    <div>
                        <label className="label-number">
                            <input value={styles.zIndexMobile} onChange={e => dispatch(setStyle(['zIndexMobile', e.target.value]))}
                                   className="input-number" type="number" min={0} max={999999}/>
                        </label>
                    </div>
                </div>
            </div>
            <div className="input-group">
                <button className="button" onClick={async () => {
                    setLoad(true);

                    const [error] = await updateStyles({_id, styles});

                    setLoad(false);

                    if(Object.keys(error).length) return;

                    dispatch(updateSelected('styles'));
                    dispatch(setPopUp([0]));
                    dispatch(setFlashPopUp('widget styles updated'));
                }}>update</button>
                <button className="button" onClick={() => dispatch(discard('styles'))}>discard</button>
            </div>
        </div>
    )
};

export default Appearance;
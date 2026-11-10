import {useState} from "react";
import '../../../../css/user-partner/b1.css'
import {useDispatch, useSelector} from "react-redux";
import {setStyle, discard, updateSelected} from '../../../../reducers/user-partner/widgetsSlice';
import Input from '../../../../components/Input';
import {updateStyles} from '../../../../controllers/user-partner/WidgetsController';
import Tabs from "../../../../components/Tabs";
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
                    <h3>chat window</h3>
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
                    <div className="row">
                        <span>typing animation color</span>
                        <div>
                            <input className="input-color" type="color" value={styles.typingAnimationColor}
                                   onChange={e => dispatch(setStyle(['typingAnimationColor', e.target.value]))}/>
                        </div>
                    </div>
                    <div className="row">
                        <span>waiting agent animation color</span>
                        <div>
                            <input className="input-color" type="color" value={styles.waitingAgentAnimationColor}
                                   onChange={e => dispatch(setStyle(['waitingAgentAnimationColor', e.target.value]))}/>
                        </div>
                    </div>
                    <div className="row">
                        <span>textarea Placeholder color</span>
                        <div>
                            <input className="input-color" type="color" value={styles.textareaPlaceholderColor}
                                   onChange={e => dispatch(setStyle(['textareaPlaceholderColor', e.target.value]))}/>
                        </div>
                    </div>
                    <div className="row">
                        <span>textarea border color</span>
                        <div>
                            <input className="input-color" type="color" value={styles.textareaBorderColor}
                                   onChange={e => dispatch(setStyle(['textareaBorderColor', e.target.value]))}/>
                        </div>
                    </div>
                    <div className="row">
                        <span>typing text color</span>
                        <div>
                            <input className="input-color" type="color" value={styles.typingTextColor}
                                   onChange={e => dispatch(setStyle(['typingTextColor', e.target.value]))}/>
                        </div>
                    </div>
                    <div className="row">
                        <span>buttons background color</span>
                        <div>
                            <input className="input-color" type="color" value={styles.fileButtonBackgroundColor}
                                   onChange={e => dispatch(setStyle(['fileButtonBackgroundColor', e.target.value]))}/>
                            <input className="input-color" type="color" value={styles.sendButtonBackgroundColor}
                                   onChange={e => dispatch(setStyle(['sendButtonBackgroundColor', e.target.value]))}/>
                        </div>
                    </div>
                    <div className="row">
                        <span>buttons icon color</span>
                        <div>
                            <input className="input-color" type="color" value={styles.fileButtonIconColor}
                                   onChange={e => dispatch(setStyle(['fileButtonIconColor', e.target.value]))}/>
                            <input className="input-color" type="color" value={styles.sendButtonIconColor}
                                   onChange={e => dispatch(setStyle(['sendButtonIconColor', e.target.value]))}/>
                        </div>
                    </div>
                    <div className="row">
                        <span>buttons hover color</span>
                        <div>
                            <input className="input-color" type="color" value={styles.fileButtonHoverColor}
                                   onChange={e => dispatch(setStyle(['fileButtonHoverColor', e.target.value]))}/>
                            <input className="input-color" type="color" value={styles.sendButtonHoverColor}
                                   onChange={e => dispatch(setStyle(['sendButtonHoverColor', e.target.value]))}/>
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
                                    <label key={key} style={{background: gradients[key]}} className={styles.widgetGradientType === key ? 'inset' : 'outset'}>
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

                <div className="window window-desktop">
                    <div className="container" style={{backgroundColor: styles.chatBadgeBackgroundColor}}>
                        <div className="header"
                             style={{background: `linear-gradient(${styles.headerDegree}deg, ${styles.headerLeftColor},${styles.headerRightColor})`}}>
                            <div>
                                <div className="agent-profile">
                                    <div className="circle-image1">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="38 38 512 512">
                                            <path fill="#454545" fillRule="evenodd" d="M256 42.667A213.333 213.333 0 0 1 469.334 256c0 117.821-95.513 213.334-213.334 213.334c-117.82 0-213.333-95.513-213.333-213.334C42.667 138.18 138.18 42.667 256 42.667m21.334 234.667h-42.667c-52.815 0-98.158 31.987-117.715 77.648c30.944 43.391 81.692 71.685 139.048 71.685s108.104-28.294 139.049-71.688c-19.557-45.658-64.9-77.645-117.715-77.645M256 106.667c-35.346 0-64 28.654-64 64s28.654 64 64 64s64-28.654 64-64s-28.653-64-64-64" />
                                        </svg>
                                    </div>
                                    <span id="agent-status"></span>
                                </div>
                                <div style={{flex: '1'}}>
                                    <div className="partner-name">{styles.title}</div>
                                    <div className="agent-name">
                                        <svg className="wait" width="40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path d="M0 0h24v24H0z" fill="none"/>
                                            <circle cx="4" cy="12" r="0" fill={styles.waitingAgentAnimationColor}>
                                                <animate fill="freeze" attributeName="r" begin="0;SVGUppsBdVN.end" calcMode="spline" dur="0.5s"
                                                         keySplines=".36,.6,.31,1" values="0;3"/>
                                                <animate fill="freeze" attributeName="cx" begin="SVGqCgsydxJ.end" calcMode="spline" dur="0.5s"
                                                         keySplines=".36,.6,.31,1" values="4;12"/>
                                                <animate fill="freeze" attributeName="cx" begin="SVG3PwDNd6F.end" calcMode="spline" dur="0.5s"
                                                         keySplines=".36,.6,.31,1" values="12;20"/>
                                                <animate id="SVG3V8yEdYE" fill="freeze" attributeName="r" begin="SVG6wCQhd9Q.end"
                                                         calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="3;0"/>
                                                <animate id="SVGUppsBdVN" fill="freeze" attributeName="cx" begin="SVG3V8yEdYE.end" dur="0.001s"
                                                         values="20;4"/>
                                            </circle>
                                            <circle cx="4" cy="12" r="3" fill={styles.waitingAgentAnimationColor}>
                                                <animate fill="freeze" attributeName="cx" begin="0;SVGUppsBdVN.end" calcMode="spline" dur="0.5s"
                                                         keySplines=".36,.6,.31,1" values="4;12"/>
                                                <animate fill="freeze" attributeName="cx" begin="SVGqCgsydxJ.end" calcMode="spline" dur="0.5s"
                                                         keySplines=".36,.6,.31,1" values="12;20"/>
                                                <animate id="SVG4PgJdbds" fill="freeze" attributeName="r" begin="SVG3PwDNd6F.end"
                                                         calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="3;0"/>
                                                <animate id="SVG6wCQhd9Q" fill="freeze" attributeName="cx" begin="SVG4PgJdbds.end" dur="0.001s"
                                                         values="20;4"/>
                                                <animate fill="freeze" attributeName="r" begin="SVG6wCQhd9Q.end" calcMode="spline" dur="0.5s"
                                                         keySplines=".36,.6,.31,1" values="0;3"/>
                                            </circle>
                                            <circle cx="12" cy="12" r="3" fill={styles.waitingAgentAnimationColor}>
                                                <animate fill="freeze" attributeName="cx" begin="0;SVGUppsBdVN.end" calcMode="spline" dur="0.5s"
                                                         keySplines=".36,.6,.31,1" values="12;20"/>
                                                <animate id="SVG38aCdcdI" fill="freeze" attributeName="r" begin="SVGqCgsydxJ.end"
                                                         calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="3;0"/>
                                                <animate id="SVG3PwDNd6F" fill="freeze" attributeName="cx" begin="SVG38aCdcdI.end" dur="0.001s"
                                                         values="20;4"/>
                                                <animate fill="freeze" attributeName="r" begin="SVG3PwDNd6F.end" calcMode="spline" dur="0.5s"
                                                         keySplines=".36,.6,.31,1" values="0;3"/>
                                                <animate fill="freeze" attributeName="cx" begin="SVG6wCQhd9Q.end" calcMode="spline" dur="0.5s"
                                                         keySplines=".36,.6,.31,1" values="4;12"/>
                                            </circle>
                                            <circle cx="20" cy="12" r="3" fill={styles.waitingAgentAnimationColor}>
                                                <animate id="SVGwaWzveSq" fill="freeze" attributeName="r" begin="0;SVGUppsBdVN.end"
                                                         calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="3;0"/>
                                                <animate id="SVGqCgsydxJ" fill="freeze" attributeName="cx" begin="SVGwaWzveSq.end" dur="0.001s"
                                                         values="20;4"/>
                                                <animate fill="freeze" attributeName="r" begin="SVGqCgsydxJ.end" calcMode="spline" dur="0.5s"
                                                         keySplines=".36,.6,.31,1" values="0;3"/>
                                                <animate fill="freeze" attributeName="cx" begin="SVG3PwDNd6F.end" calcMode="spline" dur="0.5s"
                                                         keySplines=".36,.6,.31,1" values="4;12"/>
                                                <animate fill="freeze" attributeName="cx" begin="SVG6wCQhd9Q.end" calcMode="spline" dur="0.5s"
                                                         keySplines=".36,.6,.31,1" values="12;20"/>
                                            </circle>
                                        </svg>
                                    </div>
                                </div>
                                <div className="buttons">
                                    <button id="chat-end-confirm-open">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32">
                                            <path d="M28 8v13h2V8a4 4 0 0 0-4-4H8.243l2 2H26a1.997 1.997 0 0 1 2 2m2 20.586L3.414 2L2 3.414l1.504 1.504A3.92 3.92 0 0 0 2 8v12a4 4 0 0 0 4 4h6v-2H6a1.997 1.997 0 0 1-2-2V8a1.98 1.98 0 0 1 .92-1.666L20.585 22H17l-4 7l1.736 1l3.429-6h4.42l6 6Z"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="messages">
                            <div className="messages-container">
                                <div id="i2" className="message message-right">
                                    <div>
                                        <div className="message-container" style={{backgroundColor: styles.messagesBackgroundColors.client, color: styles.visitorTextColor}}>
                                            <div className="text">I have a question about your pricing plans.</div>
                                        </div>
                                        <div className="info1">
                                            <span style={{color: styles.botTextColor}}>10:30 AM</span>
                                        </div>
                                    </div>
                                </div>
                                <div id="i4" className="message message-left">
                                    <div>
                                        <div className="message-container" style={{backgroundColor: styles.messagesBackgroundColors.our, color: styles.agentTextColor}}>
                                            <div className="text">Of course! I'd be happy to help.\nCan you tell me a bit about your needs?</div>
                                        </div>
                                        <div className="info1">
                                            <span style={{color: styles.botTextColor}}>10:31 AM</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="typing" className="message message-left" style={{marginTop: 'auto'}}>
                                <div className="message-container" style={{backgroundColor: styles.messagesBackgroundColors.our}}>
                                    <div id="typing-animation">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path d="M0 0h24v24H0z" fill="none" />
                                            <circle cx="4" cy="12" r="3" fill={styles.typingAnimationColor}>
                                                <animate id="SVGKiXXedfO" attributeName="cy" begin="0;SVGgLulOGrw.end+0.25s" calcMode="spline" dur="0.6s" keySplines=".33,.66,.66,1;.33,0,.66,.33" values="12;6;12" />
                                            </circle>
                                            <circle cx="12" cy="12" r="3" fill={styles.typingAnimationColor}>
                                                <animate attributeName="cy" begin="SVGKiXXedfO.begin+0.1s" calcMode="spline" dur="0.6s" keySplines=".33,.66,.66,1;.33,0,.66,.33" values="12;6;12" />
                                            </circle>
                                            <circle cx="20" cy="12" r="3" fill={styles.typingAnimationColor}>
                                                <animate id="SVGgLulOGrw" attributeName="cy" begin="SVGKiXXedfO.begin+0.2s" calcMode="spline" dur="0.6s" keySplines=".33,.66,.66,1;.33,0,.66,.33" values="12;6;12" />
                                            </circle>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{borderTop: `1px solid ${styles.textareaBorderColor}`}} className="messaging">
                            <div>
                                <div style={{border: `1px solid ${styles.textareaBorderColor}`}} className="textarea-container">
                                    <textarea style={{['--tpc']: styles.textareaPlaceholderColor, color: styles.typingTextColor}} placeholder="Type your message…" rows="1"></textarea>
                                </div>
                                <button style={{['--fbh']: styles.fileButtonHoverColor, backgroundColor: styles.fileButtonBackgroundColor}} id="file-select" className="file-select-desktop" type="button">
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path fill="none" stroke={styles.fileButtonIconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 10.5l-8.6 8.6a5 5 0 01-7.1-7.1L14 3.3a3.5 3.5 0 015 5L10.4 17a2 2 0 01-2.8-2.8l8.1-8.1"> </path>
                                    </svg>
                                </button>
                                <button id="message-create" className="message-create-desktop" style={{['--sbh']: styles.sendButtonHoverColor, backgroundColor: styles.sendButtonBackgroundColor}} type="button">
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path fill="none" stroke={styles.sendButtonIconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                              d="M22 2L11 13"> </path>
                                        <path fill="none" stroke={styles.sendButtonIconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                              d="M22 2l-7 20-4-9-9-4 20-7z"> </path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div style={{display: 'flex', gap: '5px'}}>
                        <button className="" id="window-toggle" style={{
                            width: '64px',
                            height: '64px',
                            borderRadius: styles.widgetType === 'bar' ? '10px' : '50%',
                            background: gradients[styles.widgetGradientType]
                        }}>
                            <svg id="opened" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path fill={styles.widgetIconColor} d="M6.7 9.3a1 1 0 011.4 0L12 13.2l3.9-3.9a1 1 0 111.4 1.4l-4.6 4.6a1 1 0 01-1.4 0l-4.6-4.6a1 1 0 010-1.4z"> </path>
                            </svg>
                        </button>
                        <button id="window-toggle" style={{
                            width: '64px',
                            height: '64px',
                            borderRadius: styles.widgetType === 'bar' ? '10px' : '50%',
                            background: gradients[styles.widgetGradientType]
                        }}>
                            <svg id="closed" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g fill="none" stroke={styles.widgetIconColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                                    <path d="M2 10.5c0-.77.013-1.523.04-2.25c.083-2.373.125-3.56 1.09-4.533c.965-.972 2.186-1.024 4.626-1.129A100 100 0 0 1 12 2.5c1.48 0 2.905.03 4.244.088c2.44.105 3.66.157 4.626 1.13c.965.972 1.007 2.159 1.09 4.532a64 64 0 0 1 0 4.5c-.083 2.373-.125 3.56-1.09 4.533c-.965.972-2.186 1.024-4.626 1.129q-1.102.047-2.275.07c-.74.014-1.111.02-1.437.145s-.6.358-1.148.828l-2.179 1.87A.73.73 0 0 1 8 20.77v-2.348l-.244-.01c-2.44-.105-3.66-.157-4.626-1.13c-.965-.972-1.007-2.159-1.09-4.532A64 64 0 0 1 2 10.5" />
                                    <path d="M12.126 10.5H12m-3.876 0H8m8.125 0H16m-3.75 0a.25.25 0 1 1-.5 0a.25.25 0 0 1 .5 0m-4 0a.25.25 0 1 1-.5 0a.25.25 0 0 1 .5 0m8 0a.25.25 0 1 1-.5 0a.25.25 0 0 1 .5 0" />
                                </g>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <Tabs page={platform} setPage={setPlatform} tabs={[
                [0, 'desktop'],
                [1, 'mobile'],
            ]} />
            <div style={{display: platform === 0 ? '' : 'none'}}>
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
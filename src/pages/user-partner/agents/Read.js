import {setPopUp} from "../../../reducers/popUpSlice";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {get, agentInactive, agentLogout} from "../../../controllers/user-partner/AgentsController";
import {setRequest} from "../../../controllers/user-super/PartnersController";
import {setAgents, updateStatus} from "../../../reducers/user-partner/agentsSlice";
import {setPartnerRequest} from "../../../reducers/user-partner/profileSlice";
import {setFlashPopUp} from "../../../reducers/flashPopUpSlice"
import {DeleteSvg, EditSvg, LoadingGif, LogOutSvg} from "../../../Icons";
import CheckBox from '../../../components/CheckBox';
import {USER_PARTNERS_ROLES, USER_PARTNERS_STATUSES} from '../../../Constants';

const Read = () => {
    const dispatch = useDispatch();
    const {role, config} = useSelector(state => state.userPartner);
    const agents = useSelector(state => state.agents.list);
    const {partnerRequest} = useSelector(state => state.profile);
    const {createAgentButton, deleteAgentButton, inactivateUserButton} = config;

    return (
        <>
            <div className="input-group">
                {createAgentButton && <button className="button" onClick={() => {dispatch(setPopUp(['agents/create']))}}>New</button>}
                <CheckBox name="manual chat routing" checked={partnerRequest} onChange={async checked => {
                    const status = checked*1;
                    await setRequest({request: status});
                    dispatch(setPartnerRequest(status));
                    dispatch(setFlashPopUp('chats request type update sent'));
                }}/>
            </div>
            <div className="table">
                <table>
                    <thead>
                        <tr>
                            <th>name</th>
                            <th>email</th>
                            <th>role</th>
                            <th>status</th>
                            {inactivateUserButton && <th>active</th>}
                            <th>actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.values(agents).map(agent => <tr key={agent.userPartnerId}>
                            <td>{agent.name}</td>
                            <td>{agent.email}</td>
                            <td>{USER_PARTNERS_ROLES[agent.role]}</td>
                            <td>{USER_PARTNERS_STATUSES[agent.status]}</td>
                            {inactivateUserButton && <td>
                                <CheckBox checked={agent.status > 0} onChange={async checked => {
                                    const status = checked*1;
                                    await agentInactive({userPartnerId: agent.userPartnerId, status});
                                    dispatch(updateStatus({userPartnerId: agent.userPartnerId, status}));
                                    dispatch(setFlashPopUp('agent inactivat request sent'));
                                }}/>
                            </td>}
                            <td>
                                <div className="actions">
                                    <EditSvg onButtonClick={async () => dispatch(setPopUp([USER_PARTNERS_ROLES[role]+'/agents/update', agent]))}/>
                                    {(agent.status > 1 && <LogOutSvg onButtonClick={async () => {
                                        agentLogout({userPartnerId: agent.userPartnerId});
                                        dispatch(setFlashPopUp('logout request sent'));
                                    }}/>) || <LogOutSvg fill='grey' />}
                                    {deleteAgentButton && <DeleteSvg onButtonClick={async () =>
                                        dispatch(setPopUp(['agents/delete', agent, 'warning']))
                                    }/>}
                                </div>
                            </td>
                        </tr>)}
                    </tbody>
                </table>
                {!Object.values(agents).length && <div>result not found</div>}
            </div>
        </>
    )
};

export default Read;
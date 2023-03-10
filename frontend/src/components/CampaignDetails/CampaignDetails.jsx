import { useState } from 'react';
import React, { useLocation, useNavigate } from 'react-router-dom';
import { campaigns } from '../../dummyData';

export default function CampaignDetails() {
    const location = useLocation();
    const navigate = useNavigate();

    const [readOnly, setReadOnly] = useState(true);
    const campaignId = location.state.campaignId;
    const campaignName = campaigns.find(campaign => campaign.id === campaignId).campaignName;
    const campaignDetails = campaigns.find(campaign => campaign.id === campaignId).campaignDetails;
    const options = campaigns.find(campaign => campaign.id === campaignId).options;
    const deadline = campaigns.find(campaign => campaign.id === campaignId).deadline;
    const voters = campaigns.find(campaign => campaign.id === campaignId).voters;
    // console.log(voters);

    const dataChangeHandler = (event) => {
        if(event.target.id === 'backBtn') {
            navigate('/campaigns')
        }
        else if(event.target.id === 'modifyBtn') {
            navigate('/newCampaignForm', {state: {campaignId,
                campaignName,
                campaignDetails,
                options,
                voters,
                deadline,
                usagePurpose: 'modify'
            }});
        }
    }

    return (
        <div className='p-1 my-1'>
            <div className="flex align-middle justify-end gap-x-1">
                <button className="btn btn-dark" id='modifyBtn' onClick={dataChangeHandler}>Modify</button>
                <button className="btn btn-dark">Launch</button>
                <button className="btn btn-dark">View Results</button>
                <button className="btn btn-dark" id='backBtn' onClick={dataChangeHandler}>Back</button>
            </div>
            <div class="card mt-2">
                <div class="card-header">
                    Campaign Details
                </div>
                <div class="card-body">
                    <div class="mb-3">
                        <label for="campaignName" class="form-label">Campaign Name</label>
                        <input type="text" class="form-control" id="campaignName" placeholder="Campaign Name" readOnly={readOnly} value={campaignName} />
                    </div>
                    <div class="mb-3">
                        <label for="campaignDetails" class="form-label">Campaign Details</label>
                        <input type="text" class="form-control" id="campaignDetails" placeholder="Campaign Details" readOnly={readOnly} value={campaignDetails} />
                    </div>
                    <div class="mb-3">
                        <label for="deadline" class="form-label">Deadline</label>
                        <input type="text" class="form-control" id="deadline" placeholder="Deadline" readOnly={readOnly} value={deadline} />
                    </div>
                    <div class="mb-3">
                        <label for="options" class="form-label">Campaign Options</label>
                        <div className='flex flex-col gap-y-1'>
                            {options.map(option => <input type="text" class="form-control" id="options" placeholder="Campaign Option" readOnly={readOnly} value={option.optionName} />)}
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="options" class="form-label">Voters</label>
                        <div className='flex flex-col gap-y-1'>
                            {voters.map(voter => <input type="text" class="form-control" id="voters" placeholder="Campaign Option" readOnly={readOnly} value={voter.voterName} />)}
                        </div>
                    </div>

                </div>
                {/* <div class="card-footer text-muted">
                    2 days ago
                </div> */}
            </div>
        </div>
    )
}

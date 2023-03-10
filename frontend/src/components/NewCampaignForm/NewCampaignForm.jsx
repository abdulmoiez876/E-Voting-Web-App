import React from 'react'
import { useState, useEffect } from 'react'
import Option from './Option/Option';
import SearchBar from '../SearchBar/SearchBar';
import Voter from './Voter/Voter';
import { useNavigate, useLocation } from 'react-router-dom';

const votersDummyData = [
    {
        id: 1,
        voterName: 'Anas'
    },
    {
        id: 2,
        voterName: 'Moiez'
    },
    {
        id: 3,
        voterName: 'Faique'
    },
    {
        id: 4,
        voterName: 'Fauji'
    },
    {
        id: 5,
        voterName: 'Abdul'
    },
    {
        id: 6,
        voterName: 'Ali'
    },
    {
        id: 7,
        voterName: 'Rizwan'
    },
    {
        id: 8,
        voterName: 'Nauman'
    },
]

export default function NewCampaignForm() {
    const location = useLocation();
    const [campaignId, setCampaignId] = useState(location.state?location.state.campainId:null);
    const [campaignName, setCampaignName] = useState(location.state?location.state.campaignName:'');
    const [deadline, setDeadline] = useState(location.state?location.state.deadline:'');
    const [optionsArray, setOptionsArray] = useState(location.state?location.state.options:[{ id: 1, optionName: '' }, { id: 2, optionName: '' }]);
    const [votersArray, setVotersArray] = useState(location.state?location.state.voters:[]);
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const [readonlyDeadline, setReadonlyDeadline] = useState(false);

    // when save button is clicked data is logged through this effect:
    useEffect(() => {
        // to log data only when the save button is clicked and to prevent logging of data when the component renders the first time

        // To see whether we need to update the campaign or add a new campaign we see the field of campaignId, if it is null then it means that the data must be added i.e new row un the database, if it is not null it means the campaign with that campaignId must be modified
        if(readonlyDeadline) {
            console.log(data);
        }
    }, [data])

    const dataChangeHandler = (event) => {
        if (event.target.id === 'campaignName') {
            setCampaignName(event.target.value);
        }
        else if (event.target.id === 'deadline') {
            setDeadline(event.target.value);
        }
        else if (event.target.id === 'addNewOption') {
            if (optionsArray.length === 0) {
                setOptionsArray([{ id: 1, optionName: '' }])
            }
            else if (optionsArray.length > 0) {
                setOptionsArray(prev => [...prev, { id: prev[prev.length - 1].id + 1, optionName: '' }])
            }
        }
        else if (event.target.id === 'saveBtn') {
            setReadonlyDeadline(true);
            setData({
                campaignName,
                deadline,
                voters: votersArray,
                options: optionsArray
            })
        }
        else if(event.target.id === 'backBtn') {
            navigate(-1)
        }
    }

    const deleteOptionHandler = (id) => {
        setOptionsArray(prev => prev.filter(prevOption => prevOption.id !== id))
    }

    const setOptionNameHandler = (updatedOption) => {
        const newOptionsArray = optionsArray.map(option => {
            if (option.id === updatedOption.id) {
                return { ...option, optionName: updatedOption.optionName }
            }
            else {
                return option
            }
        });
        setOptionsArray(newOptionsArray);
    }

    const voterSelectionHandler = (voterId) => {
        const currentVoter = votersDummyData.find(voter => parseInt(voterId) === voter.id);

        if (votersArray.length === 0) {
            setVotersArray([currentVoter])
        }
        else if (votersArray.length > 0) {
            setVotersArray(prev => [...prev, currentVoter])
        }
    }

    const removeVoterHandler = (id) => {
        setVotersArray(prev => prev.filter(prevVoter => prevVoter.id !== id))
    }

    return (
        <div className='w-100 pt-10 flex justify-center align-middle'>
            <div className='bg-slate-500 container p-10 rounded-md'>
                <form className='container'>
                    <div className="mb-3">
                        <label htmlFor="campaignName" className="form-label font-semibold">Campaign Name</label>
                        <input onChange={dataChangeHandler} type="text" className="form-control" id="campaignName" value={campaignName} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="deadline" className="form-label font-semibold">Deadline</label>
                        <input onChange={dataChangeHandler} type="date" className="form-control" id="deadline" value={deadline} readOnly={readonlyDeadline} />
                    </div>
                    <div className="mb-3">
                        <SearchBar
                            placeholder='Search Voter...'
                            dataToBeSearched={votersDummyData}
                            onItemSelected={voterSelectionHandler}
                        />
                        <div className='flex align-middle gap-x-2 flex-wrap gap-y-2 my-1'>
                            {votersArray.map(voter => <Voter
                                key={voter.id}
                                id={voter.id}
                                voterName={voter.voterName}
                                removeVoterHandler={removeVoterHandler}
                            />)}
                        </div>

                    </div>
                    <div className='form-floating flex flex-col gap-y-1'>
                        {optionsArray.length > 0 && <label className="form-label font-semibold">Options:</label>}
                        <div className="flex align-middle gap-x-2 flex-wrap gap-y-2">
                            {optionsArray.map(option => <Option
                                key={option.id}
                                id={option.id}
                                deleteOptionHandler={deleteOptionHandler}
                                optionName={option.optionName}
                                setOptionNameHandler={setOptionNameHandler}
                            />)}
                        </div>
                        <button type='button' className="btn btn-dark" onClick={dataChangeHandler} id='addNewOption'>Add</button>
                    </div>
                    <div className='flex align-middle gap-x-2 mt-2'>
                        <button type='button' className="w-100 btn btn-dark" onClick={dataChangeHandler} id='saveBtn'>Save</button>
                        <button type='button' className="w-100 btn btn-dark" onClick={dataChangeHandler} id='backBtn'>Back</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

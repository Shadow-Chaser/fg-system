import React, { useContext } from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
} from "@chakra-ui/react"
import { FeedbackContext } from '../TabContainer/TabContainer';
import './FeedbackTable.css'

const FeedbackTable = () => {
    const [feedbacks, setFeedbacks] = useContext(FeedbackContext)
    // const feedbacks = localStorage.getItem('feedbacks') ? JSON.parse(localStorage.getItem('feedbacks')) : [];

    return (
        <div>
            <h1 className="table_title">All Feedback</h1>
            <table class="table table-bordered w-75">
                <thead>
                    <tr class='table-light'>
                        <th>Form Name</th>
                        <th>Text Field</th>
                        <th>Phone Field</th>
                        <th>Email Field</th>
                        <th>Radio Field</th>
                        <th>Name</th>

                    </tr>
                </thead>
                <tbody>

                    {
                        feedbacks?.map(f =>
                            <tr>
                                <td>{f.formName}</td>
                                <td>{f.textField}</td>
                                <td>{f.phoneField}</td>
                                <td>{f.email}</td>
                                <td>
                                    <span>Service Quality : {f.serviceQuality}</span> <br />
                                    <span>Beverage Quality : {f.beverageQuality}</span> <br />
                                    <span>Cleanness : {f.cleanness} </span> <br />
                                    <span>Dining Experience : {f.diningExperience} </span>
                                </td>
                                <td>{f.name}</td>
                            </tr>
                        )
                    }

                </tbody>
            </table>
        </div>
    );
};

export default FeedbackTable;
import React, { useState } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"
import FeedbackForm from '../FeedbackForm/FeedbackForm';
import FeedbackTable from '../FeedbackTable/FeedbackTable';
import { createContext } from 'react';
export const FeedbackContext = createContext();

const TabContainer = () => {
    const [feedbacks, setFeedbacks] = useState(localStorage.getItem('feedbacks') ? JSON.parse(localStorage.getItem('feedbacks')) : [])

    return (
        <FeedbackContext.Provider value={[feedbacks, setFeedbacks]}>
            <div>
                <Tabs>
                    <TabList>
                        <Tab>Form</Tab>
                        <Tab>Table</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <FeedbackForm />
                        </TabPanel>
                        <TabPanel>
                            <FeedbackTable />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </div>
        </FeedbackContext.Provider>
    );
};

export default TabContainer;
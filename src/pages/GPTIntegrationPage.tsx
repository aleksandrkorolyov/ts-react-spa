import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query";
import GptAnswer from "../components/GptAnswer";

const queryClient = new QueryClient();

const GPTIntegrationPage = () => {

    const [req, setReq] = useState('');

    const PromptContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    `;

    const PromptLabel = styled.div`
        display: flex;
        justify-content: center;
    `;

    const submitHandler = async (event: React.SyntheticEvent) => {
        event.preventDefault()

        const form = event.target as HTMLFormElement;
        const questionInput = form.elements.namedItem('question') as HTMLInputElement;

        setReq(questionInput.value);
    }
    return (
        <QueryClientProvider client={queryClient}>
            <>
                <PromptContainer>
                    <PromptLabel>Ask me something</PromptLabel>
                    <form onSubmit={(event) => { submitHandler(event) }}>
                        <input name="question" type="text" />
                        <input type="submit" value="Ask!" />
                    </form>

                    {req !== "" ?
                    <>
                        <p>Question: {req}</p>
                        <GptAnswer req={req} />
                    </>
                        : null
                    }

                </PromptContainer>
            </>
        </QueryClientProvider>
    );
}

export default GPTIntegrationPage;
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const GPTIntegrationPage = () => {

    const [req, setReq] = useState('');
    const [resp, setResp] = useState('');

    const API_KEY = "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"

    const API_BODY = {
        "model": "text-davinci-003",
        "prompt": req,
        "temperature": 0,
        "max_tokens": 100,
        "top_p": 1,
        "frequency_penalty": 0.0,
        "presence_penalty": 0.0
    };

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

    useEffect(() => {
        if(req !== '') {
        try {
            fetch("https://api.openai.com/v1/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + API_KEY
                },
                body: JSON.stringify(API_BODY)
            }).then((response) => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return(response.json());
                
            }).then((data) => {
                setResp(data.choices[0].text)
            })
        } catch (e) {
            console.log(e)
        }}
    }, [req]);

    const submitHandler = async (event) => {
        event.preventDefault()
        setReq(event.target.question.value);
        console.log(req)

    }

    return (
        <>
            <PromptContainer>
                <PromptLabel>Ask me something</PromptLabel>
                <form onSubmit={(event) => { submitHandler(event) }}>
                    <input name="question" type="text" />
                    <input type="submit" value="Ask!" />
                </form>

                {req !== "" ?
                    <p>Question: {req}</p>
                    : null
                }

                {resp !== "" ?
                    <p>Answer: {resp}</p>
                    : null
                }
            </PromptContainer>
        </>
    );
}

export default GPTIntegrationPage;
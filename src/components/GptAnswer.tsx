import { useQuery } from "react-query";

const GptAnswer: React.FC<{ req: string }> = (props): JSX.Element => {
    console.log(props.req)

    const API_KEY = "github_doesn't_allow_to_keep_key_in_repo:("

    interface APIBody {
        model: string;
        prompt: string;
        temperature: number;
        max_tokens: number;
        top_p: number;
        frequency_penalty: number;
        presence_penalty: number;
    }

    const API_BODY: APIBody = {
        "model": "text-davinci-003",
        "prompt": props.req,
        "temperature": 0.7,
        "max_tokens": 100,
        "top_p": 1,
        "frequency_penalty": 0.0,
        "presence_penalty": 0.0
    };

    interface APIResponse {
        choices: {text: string}[]
    }

    const { isLoading, error, data } = useQuery<APIResponse>(
        "openAiRequest",
        () => {
            return fetch("https://api.openai.com/v1/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + API_KEY,
                },
                body: JSON.stringify(API_BODY)
            }).then((response) => response.json())
        }
    )

    let answer = '';
    if((data !== undefined)&&(data !== null)) {
        answer = data.choices[0].text;
    } 

    if (isLoading) return (<>"Loading..."</>);

    if (error) return (<>"An error has occurred: " + {error}</>)

    return (
        <>
          <p>Answer: {answer}</p>
        </>
    );
}

export default GptAnswer;
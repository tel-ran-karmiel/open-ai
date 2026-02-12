import "dotenv/config"
import readline from "readline"
import chatRequest from "./chatRequest.js"
import INNER_SYSTEM_CONTENT from "./system_content.js"
import { TOOLS } from "./tools.js"
const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
async function main(){
    const messages = [
        {
            role: "system",
            content: INNER_SYSTEM_CONTENT
        }
    ]
    console.log("simple chat, type 'exit' for quit")
    
    await ask(messages)

}
async function ask(messages) {
        rl.question("You: ", async (userInput) => {
            if (userInput === "exit"){
                rl.close();
                console.log("bye")
            } else {
                messages.push({
                    role: "user",
                    content: userInput
                })
                let reply
               try {
                reply = await chatRequest(messages)
                 messages.push({
                     role: "assistant",
                     content: reply
                 })
               } catch (error) {
                   reply = "no response from assistant because an answer has taken too much time"
                   messages.push({
                     role: "assistant",
                     content: reply
                 })
               }
                const answer = await processReply(reply)
                console.log("\nAgent: ", answer)
                await ask(messages)
            }
        })
}
async function processReply(reply) {
    const toolObject = tryParseJSON(reply)
    let answer = reply
    if (toolObject && toolObject.tool && TOOLS[toolObject.tool]) {
        answer = await TOOLS[toolObject.tool](...toolObject.arguments)
        
    }
    return answer
}
function tryParseJSON(reply){
    const sInd = reply.indexOf("{");
    const eInd = reply.lastIndexOf("}")
    let res = null
    if (sInd >= 0 && eInd > sInd) {
        try {
            res = JSON.parse(reply.slice(sInd, eInd + 1))
        } catch (e){}
    }
    return res;
}
main().catch(e => console.log(e))
import "dotenv/config"
import readline from "readline"
import chatRequest from "./chatRequest.js"
const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
async function main(){
    const messages = [
        {
            role: "system",
            content: "You are a helpful assistence. Answer briefly and clearly"
        }
    ]
    console.log("simple chat, type 'exit' forquit")
    
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
                console.log("\nAgent: ", reply)
                await ask(messages)
            }
        })
}
main().catch(e => console.log(e))
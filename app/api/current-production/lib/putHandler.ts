import { prisma } from "../../configuration";
import { CurrentProductionBody } from "./models/current-production";

export async function putHandler(request:Request) {
    let body: CurrentProductionBody

    try {
        body = await request.json()
    } catch (error) {
        console.error("Error parsing JSON:", error)
        return new Response("Bad Request: Invalid JSON format", { status: 400 })
    }

    const { id, note, status } =  body

    if(!id) {
        return new Response("Bad Request: Missing required fields", { status: 400 })
    }

    try {
        await prisma.currentProduction.update({
            where: {
                id: id,
            },
            data: {
                note: note,
                status: status
            }
        })
    } catch (error) {
        console.log("Error creating current production", error)
        return new Response(
            "Internal Server Error: There was an error updating current production",
            {
                status: 500,
            }
        )
    }

    return new Response("Current production updated successfully", { status: 200 })
}
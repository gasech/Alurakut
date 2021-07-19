import { SiteClient } from 'datocms-client';

export default async function requestReceiver(request, response) {
    if(request.method === 'POST'){
        const FULLACCESSTOKEN = process.env.FULLACCESSTOKEN;
        const client = new SiteClient(FULLACCESSTOKEN);

        const createdRecord = await client.items.create({
            itemType: "972755",
            ...request.body,
        })

        response.json({
            dados: 'Algum dado qualquer',
            createdRecord: createdRecord,
        })

        return;
    }

    response.status(404).json({
        message: 'Ainda não temos nada no GET, mas no POST tem!'
    })
}
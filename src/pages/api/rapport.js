import AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        // Logique pour ajouter un rapport
        const { Thème, Date, Avancement, Tâche, File } = req.body;

        const params = {
            TableName: 'WorkRapport',
            Item: {
                id: 4, // Assurez-vous de générer correctement l'ID
                Theme: Thème,
                Date: Date,
                Avancement: Avancement.toString(),
                Tâche: Tâche,
                File: File,
                personId: "hmizitamim@hotmail.com",
            },
        };

        try {
            await dynamodb.put(params).promise();
            res.status(200).json({ message: 'Rapport added successfully' });
        } catch (error) {
            console.error('Error adding rapport:', error);
            res.status(500).json({ error: 'Failed to add rapport' });
        }
    } else if (req.method === 'GET') {
        // Logique pour récupérer les rapports d'une personne spécifique
        const personId = "hmizitamim@hotmail.com";

        const params = {
            TableName: 'WorkRapport',
            FilterExpression: 'personId = :personId',
            ExpressionAttributeValues: {
                ':personId': personId,
            },
        };

        try {
            const data = await dynamodb.scan(params).promise();
            res.status(200).json(data.Items);
        } catch (error) {
            console.error('Error fetching rapports:', error);
            res.status(500).json({ error: 'Failed to fetch rapports' });
        }
    }  else if (req.method === 'PUT') {
        //Vérification de l'existence d'un rapport avec la même date ou non
        const {Date} = req.body;

        const params = {
            TableName: 'WorkRapport',
            FilterExpression: '#date = :date',
            ExpressionAttributeNames: {
                '#date': 'Date',
            },
            ExpressionAttributeValues: {
                ':date': Date,
            },
        };
        try {
            const data= await dynamodb.scan(params).promise();
            if (data.Items.length > 0) {
                res.status(200).json({ exists: true});
            } else {
                res.status(200).json({ exists: false});
            }
        } catch (error) {
            console.error('Error checking date:', error);
            res.status(500).json({error: 'Failed to check date'});
        }
    }else {
        // Gestion des méthodes non autorisées
        res.setHeader('Allow', ['POST', 'GET', 'PUT']);
        res.status(405).end(`Method ${req.method} not allowed`);
    }
}

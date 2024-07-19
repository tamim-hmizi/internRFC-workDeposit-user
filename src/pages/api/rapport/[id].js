import AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();

export default async function handler(req, res) {
  const { method, query: { id } } = req;

  switch (method) {
    case 'PUT':
      try {
        const { Theme, Avancement, Tâche } = req.body;

        const params = {
          TableName: 'WorkRapport',
          Key: { id: parseInt(id) },
          UpdateExpression: 'set Theme = :t, Avancement = :a, #ta = :ta', // Utilisation de #ta pour Tâche
          ExpressionAttributeValues: {
            ':t': Theme,
            ':a': Avancement,
            ':ta': Tâche,
          },
          ExpressionAttributeNames: {
            '#ta': 'Tâche', // Mapping de #ta à Tâche dans l'ExpressionAttributeNames
          },
          ReturnValues: 'ALL_NEW', // Retourne les nouvelles valeurs après la mise à jour
        };

        const updatedRapport = await dynamodb.update(params).promise();

        res.status(200).json({ success: true, data: updatedRapport.Attributes });
      } catch (error) {
        console.error('Error updating report:', error);
        res.status(400).json({ success: false });
      }
      break; 

      case 'DELETE':
        try {
            const params= {
              TableName: 'WorkRapport',
              Key: {id: parseInt(id)} ,
            } ;
            await dynamodb.delete(params).promise();
            res.status(200).json({message:'Rapport deleted successfully'});
        } catch (error) {
          console.error('Error deleting rapport:', error);
          res.status(500).json({ error: 'Failed to delete rapport'});
        }
      break;

    default:
      res.setHeader('Allow', ['PUT', 'DELETE']);
      res.status(400).json({ success: false });
      break;
  }
}

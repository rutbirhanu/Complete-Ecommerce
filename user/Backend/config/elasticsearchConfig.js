const { Client } = require("@elastic/elasticsearch");

const elasticClient = new Client({
  node: "http://localhost:9200",
//   auth: {
//     username: "elastic",
//     password: "your-password-here" // optional for local dev if disabled
//   }
});

async function checkConnection() {
  try {
    const health = await elasticClient.cluster.health();
    console.log("Elasticsearch cluster health:", health.status);
  } catch (error) {
    console.error("Elasticsearch connection failed:", error);
  }
}

checkConnection();

module.exports = elasticClient;
